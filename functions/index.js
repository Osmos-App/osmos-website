const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const nodemailer = require("nodemailer");

// Nodemailer SMTP Transport pool setup targeting smtp.gmail.com on port 465
const transporter = nodemailer.createTransport({
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
        <a href="https://osmos-app.web.app/#spec" class="btn">Review the Architecture Spec</a>
      </div>
      <p>Talk soon,<br>The Osmos Team</p>
      <div class="footer">
        &copy; 2026 Osmos. Set in Newsreader & DM Mono.
      </div>
    </div>
  </div>
</body>
</html>`;

exports.subscribe = onRequest({ cors: true }, async (req, res) => {
  // Only allow POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { email } = req.body;

  // Basic email input validation
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ success: false, message: "A valid email address is required." });
  }

  const subscriberEmail = email.trim().toLowerCase();

  try {
    logger.info(`Processing subscription request for: ${subscriberEmail}`);

    // Verify SMTP credentials exist
    if (!process.env.GOOGLE_SMTP_USER || !process.env.GOOGLE_SMTP_APP_PASS) {
      logger.error("Missing Google SMTP credentials in environment variables.");
      return res.status(500).json({ success: false, message: "Server configuration error." });
    }

    // Send Welcome Email (Email 1) using verified domain alias hello@useosmos.com
    const mailOptions = {
      from: '"Osmos Team" <hello@useosmos.com>',
      to: subscriberEmail,
      subject: "Welcome to Osmos — Your data is officially yours",
      html: welcomeEmailTemplate(subscriberEmail),
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Welcome email sent successfully: ${info.messageId}`);

    return res.status(200).json({ success: true, message: "Successfully subscribed!" });
  } catch (error) {
    logger.error("Error sending subscription email:", error);
    return res.status(500).json({ success: false, message: "Failed to process subscription. Please try again later." });
  }
});
