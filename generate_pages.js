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

const pages = {
    'features/index.html': ['Features', 'Our feature set is currently under active development. Check back soon for a comprehensive overview of everything Osmos can do.'],
    'security/index.html': ['Security', 'Security is foundational to Osmos. We use AES-256-GCM and the Noise Protocol Framework to ensure your data never leaves your devices in plaintext. Full security whitepaper coming soon.'],
    'open-source/index.html': ['Open Source', 'Osmos will be open-sourced soon. We believe in building in public and allowing the community to audit our security protocols.'],
    'pricing/index.html': ['Pricing', 'Osmos is free during the alpha period. We will introduce a sustainable pricing model before v1.0.'],
    'windows/index.html': ['Windows', 'Native Windows support is on the roadmap. Osmos will use native Windows APIs to integrate deeply with File Explorer.'],
    'linux/index.html': ['Linux', 'Linux support is coming soon. Osmos will support headless mode for servers and native integration for desktop environments.'],
    'android/index.html': ['Android', 'Access your files anywhere on your local network with our upcoming Android client.'],
    'docs/index.html': ['Documentation', 'Comprehensive documentation and guides for Osmos are currently being written.'],
    'blog/index.html': ['Blog', 'Updates, engineering deep dives, and thoughts on the future of version control.'],
    'download/index.html': ['Download Osmos', 'Osmos is currently in closed alpha. Join the waitlist on the home page to get early access.']
};

for (const [path, [title, desc]] of Object.entries(pages)) {
    fs.writeFileSync(path, generatePlaceholder(title, desc));
}

// Generate macOS template
const macosContent = `${head}
    <section class="hero">
        <div class="wrap">
            <div class="hero-content" style="grid-template-columns: 1fr; gap: 40px; text-align: center;">
                <div>
                    <h1 class="display">Designed around macOS.</h1>
                    <p class="lede" style="margin: 0 auto;">Not merely compatible with it. Osmos uses native technologies to deliver an experience that feels perfectly at home on your Mac.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="section" id="native" style="border-top: 1px solid var(--rule);">
        <div class="wrap">
            <div class="sec-head">
                <span class="kicker">Native Integration</span>
                <h2>Respects your filesystem.</h2>
                <p class="desc">Changes are detected instantly using native macOS technologies. No polling, no battery drain. It just works with the folders you already have.</p>
            </div>
        </div>
    </section>

    <section class="section" id="finder" style="border-top: 1px solid var(--rule); background: var(--paper-2);">
        <div class="wrap">
            <div class="sec-head">
                <span class="kicker">Finder Experience</span>
                <h2>Works where you work.</h2>
                <p class="desc">Browse your history directly from Finder. Revert changes, view past versions, and restore deleted files without ever opening a terminal.</p>
            </div>
        </div>
    </section>

    <section class="section" id="performance" style="border-top: 1px solid var(--rule);">
        <div class="wrap">
            <div class="sec-head">
                <span class="kicker">Apple Silicon</span>
                <h2>Optimized for M-series.</h2>
                <p class="desc">Blazing fast and incredibly efficient. Osmos is a universal binary built to take full advantage of Apple Silicon architectures.</p>
            </div>
        </div>
    </section>

    <section class="section" id="privacy" style="border-top: 1px solid var(--rule); background: var(--paper-2);">
        <div class="wrap">
            <div class="sec-head">
                <span class="kicker">Privacy & Security</span>
                <h2>Private by design.</h2>
                <p class="desc">Your encryption keys are protected using macOS security features. Your devices communicate using native networking capabilities, ensuring your data never touches a third-party server.</p>
            </div>
        </div>
    </section>
${footer}`;

fs.writeFileSync('macos/index.html', macosContent);
