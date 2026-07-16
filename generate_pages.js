const fs = require('fs');
const indexHtml = fs.readFileSync('index.html', 'utf-8');

const headMatch = indexHtml.match(/([\s\S]*?)<section class="hero">/);
const footerMatch = indexHtml.match(/(<footer>[\s\S]*?<\/html>)/);

const head = headMatch[1];
const footer = footerMatch[1];

function generatePlaceholder(title, description) {
    return `${head}
    <section class="section" style="min-height: 60vh; display: flex; align-items: center;">
        <div class="wrap">
            <h1 class="display" style="margin-bottom: 24px; font-size: clamp(2.5rem, 6vw, 4rem);">${title}</h1>
            <p class="lede" style="max-width: 600px;">${description}</p>
        </div>
    </section>
${footer}`;
}

function generatePlatformPlaceholder(osName, description) {
    return `${head}
    <section class="hero" style="padding-top: clamp(60px, 12vh, 140px); padding-bottom: clamp(60px, 10vh, 120px);">
      <div class="wrap" style="text-align: center; margin: 0 auto;">
        <span class="kicker" style="justify-content: center; margin-bottom: 24px; display: inline-flex; align-items: center; gap: 8px;">Built for ${osName} <span style="background: var(--ink-3); color: var(--paper); font-size: 0.65rem; padding: 2px 6px; border-radius: 10px; font-weight: bold; line-height: 1; letter-spacing: 0.05em;">PLANNED</span></span>
        <h1 class="display" style="margin-bottom: 24px;">Designed around ${osName}. <br>Not merely compatible.</h1>
        <p class="lede" style="margin: 0 auto;">${description}</p>
      </div>
    </section>
${footer}`;
}

const pages = {
    'features/index.html': ['Features', 'Our feature set is currently under active development. Check back soon for a comprehensive overview of everything Osmos can do.'],
    'security/index.html': ['Security', 'Security is foundational to Osmos. We use AES-256-GCM and the Noise Protocol Framework to ensure your data never leaves your devices in plaintext. Full security whitepaper coming soon.'],
    'open-source/index.html': ['Open Source', 'Osmos will be open-sourced soon. We believe in building in public and allowing the community to audit our security protocols.'],
    'pricing/index.html': ['Pricing', 'Osmos is free during the alpha period. We will introduce a sustainable pricing model before v1.0.'],
    'docs/index.html': ['Documentation', 'Comprehensive documentation and guides for Osmos are currently being written.'],
    'blog/index.html': ['Blog', 'Updates, engineering deep dives, and thoughts on the future of version control.'],
    'download/index.html': ['Download Osmos', 'Osmos is currently in closed alpha. Join the waitlist on the home page to get early access.']
};

for (const [path, [title, desc]] of Object.entries(pages)) {
    fs.writeFileSync(path, generatePlaceholder(title, desc));
}
