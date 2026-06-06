const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const nodemailer = require("nodemailer");
const { initializeApp, getApps } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const crypto = require("crypto");

// Initialize Firebase Admin SDK (singleton)
if (!getApps().length) {
  initializeApp();
}

function getDb() {
  return getFirestore();
}

function getIpHash(ip) {
  if (!ip) return "unknown";
  const rawIp = ip.split(',')[0].trim();
  return crypto.createHash("sha256").update(rawIp).digest("hex");
}

// IP anonymization helper (GDPR/KVKK compliant)
function anonymizeIp(ip) {
  if (!ip) return null;
  const rawIp = ip.split(',')[0].trim();
  if (rawIp.includes('.')) {
    const parts = rawIp.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
    }
  }
  if (rawIp.includes(':')) {
    const parts = rawIp.split(':');
    if (parts.length > 2) {
      return `${parts[0]}:${parts[1]}:${parts[2]}::0`;
    }
  }
  return rawIp;
}

// Lazy-loaded Nodemailer SMTP Transport pool
let transporter;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for port 465, false for other ports
      auth: {
        user: process.env.GOOGLE_SMTP_USER,
        pass: process.env.GOOGLE_SMTP_APP_PASS,
      },
      pool: true, // Use pooled connections for better performance
      maxConnections: 5,
      maxMessages: 100,
    });
  }
  return transporter;
}

// HTML structure for Email 1: Welcome & Setup Expectations
const welcomeEmailTemplate = (email) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Osmos</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #f5f5f7;
      color: #1c1c1e;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #f5f5f7;
      padding: 40px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e5e5ea;
      border-radius: 4px;
      padding: 40px;
    }
    .header {
      border-bottom: 1px solid #e5e5ea;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .logo {
      font-size: 20px;
      font-weight: 600;
      letter-spacing: -0.02em;
    }
    .logo span {
      font-weight: 300;
      color: #8e8e93;
    }
    h1 {
      font-size: 24px;
      font-weight: 500;
      line-height: 1.3;
      margin-top: 0;
      margin-bottom: 20px;
      letter-spacing: -0.01em;
    }
    p {
      font-size: 16px;
      line-height: 1.6;
      color: #3a3a3c;
      margin-top: 0;
      margin-bottom: 20px;
    }
    .btn-container {
      margin: 30px 0;
    }
    .btn {
      display: inline-block;
      background-color: #1c1c1e;
      color: #ffffff !important;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 4px;
      font-size: 15px;
      font-weight: 500;
    }
    .footer {
      border-top: 1px solid #e5e5ea;
      padding-top: 20px;
      margin-top: 30px;
      font-size: 13px;
      color: #8e8e93;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="logo">Osmos <span>— local-first version control</span></div>
      </div>
      <h1>Welcome to Osmos — Your data is officially yours.</h1>
      <p>Hi there,</p>
      <p>Thanks for joining the Osmos waitlist.</p>
      <p>Osmos was built on a simple premise: your thoughts, files, and designs belong in your hands, not on someone else's server.</p>
      <p>Over the next few weeks, we will be rolling out the first invite-only alpha builds. You'll be among the first to get access to the Rust core engine and the native macOS, iOS, and Android applications.</p>
      <p>In the meantime, we'll send you a few quick emails explaining how peer-to-peer sync actually works without a central server, and how we keep your data encrypted.</p>
      <div class="btn-container">
        <a href="https://useosmos.com/#spec" class="btn">Review the Architecture Spec</a>
      </div>
      <p>Talk soon,<br>The Osmos Team</p>
      <div class="footer">
        &copy; 2026 Osmos. Set in Newsreader & DM Mono.
      </div>
    </div>
  </div>
</body>
</html>`;

exports.subscribe = onRequest(
  {
    cors: true,
    secrets: ["GOOGLE_SMTP_USER", "GOOGLE_SMTP_APP_PASS"],
  },
  async (req, res) => {
    // Only allow POST requests
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }

    const db = getDb();
    const clientIp = req.ip || req.headers["x-forwarded-for"] || "";
    const ipHash = getIpHash(clientIp);
    const limitRef = db.collection("rate_limits").doc(ipHash);
    const now = Date.now();

    // Rate limiting check: Max 5 submissions per minute per IP hash (GDPR-compliant hash)
    try {
      const limitDoc = await limitRef.get();
      if (limitDoc.exists) {
        const data = limitDoc.data();
        const timeWindow = 60 * 1000; // 1 minute window
        if (now - data.resetTime < timeWindow) {
          if (data.count >= 5) { // Max 5 requests per minute
            logger.warn(`Rate limit exceeded for IP hash: ${ipHash}`);
            return res.status(429).json({ success: false, message: "Too many requests. Please try again in a minute." });
          }
          await limitRef.update({
            count: FieldValue.increment(1)
          });
        } else {
          await limitRef.set({
            count: 1,
            resetTime: now
          });
        }
      } else {
        await limitRef.set({
          count: 1,
          resetTime: now
        });
      }
    } catch (rateErr) {
      logger.error("Rate limit check failed:", rateErr);
    }

    const { email, consent, honeypot } = req.body;

    // Bot prevention: Honeypot check
    if (honeypot) {
      logger.warn("Bot detected via honeypot field submission.");
      return res.status(400).json({ success: false, message: "Spam request rejected." });
    }

    // Bot prevention: Consent check
    if (consent !== true) {
      return res.status(400).json({ success: false, message: "Consent is required to subscribe." });
    }

    // Strict email input validation (RFC 5322 compliant regex) to prevent injection/XSS inputs
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!email || typeof email !== "string" || email.length > 254 || !emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "A valid email address is required." });
    }

    const subscriberEmail = email.trim().toLowerCase();

    try {
      logger.info(`Processing subscription request for: ${subscriberEmail}`);

      // --- Firestore: write subscriber record with detailed metadata ---
      const docRef = db.collection("subscribers").doc(subscriberEmail);
      const existing = await docRef.get();

      const requestMeta = {
        ip: anonymizeIp(clientIp),
        userAgent: req.headers["user-agent"] || null,
        referrer: req.headers["referer"] || req.headers["referrer"] || null,
        origin: req.headers["origin"] || null,
        acceptLanguage: req.headers["accept-language"] || null,
      };

      if (!existing.exists) {
        // New subscriber — create full record
        await docRef.set({
          email: subscriberEmail,
          source: "waitlist",
          status: "pending_email",
          subscribedAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
          emailDelivery: { status: "pending", messageId: null, sentAt: null },
          request: requestMeta,
          resubscribeCount: 0,
        });
        logger.info(`New subscriber saved to Firestore: ${subscriberEmail}`);
      } else {
        // Already subscribed — update metadata & increment counter
        await docRef.set({
          updatedAt: FieldValue.serverTimestamp(),
          resubscribeCount: FieldValue.increment(1),
          request: requestMeta,
        }, { merge: true });
        logger.info(`Returning subscriber updated in Firestore: ${subscriberEmail}`);
      }
      // ----------------------------------------------------------------

      // Verify SMTP credentials exist in the request context (bound secrets)
      if (!process.env.GOOGLE_SMTP_USER || !process.env.GOOGLE_SMTP_APP_PASS) {
        logger.error("Missing Google SMTP credentials in environment variables.");
        // Mark status as config_error in Firestore
        await docRef.set({ status: "config_error", updatedAt: FieldValue.serverTimestamp() }, { merge: true });
        return res.status(500).json({ success: false, message: "Server configuration error." });
      }

      // Send Welcome Email (Email 1) using verified domain alias hello@useosmos.com
      const mailOptions = {
        from: '"Osmos Team" <hello@useosmos.com>',
        to: subscriberEmail,
        subject: "Welcome to Osmos — Your data is officially yours",
        html: welcomeEmailTemplate(subscriberEmail),
      };

      const info = await getTransporter().sendMail(mailOptions);
      logger.info(`Welcome email sent successfully: ${info.messageId}`);

      // Update Firestore with successful email delivery info
      await docRef.set({
        status: "subscribed",
        updatedAt: FieldValue.serverTimestamp(),
        emailDelivery: {
          status: "sent",
          messageId: info.messageId || null,
          sentAt: FieldValue.serverTimestamp(),
        },
      }, { merge: true });

      return res.status(200).json({ success: true, message: "Successfully subscribed!" });
    } catch (error) {
      logger.error("Error sending subscription email:", error);
      // Best-effort: mark email delivery as failed in Firestore
      try {
        await db.collection("subscribers").doc(subscriberEmail).set({
          status: "email_failed",
          updatedAt: FieldValue.serverTimestamp(),
          emailDelivery: { status: "failed", error: error.message || "unknown" },
        }, { merge: true });
      } catch (fsErr) {
        logger.error("Firestore update failed after email error:", fsErr);
      }
      return res.status(500).json({ success: false, message: "Failed to process subscription. Please try again later." });
    }
  });
