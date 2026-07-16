const fs = require('fs');
const indexHtml = fs.readFileSync('index.html', 'utf-8');

const headMatch = indexHtml.match(/([\s\S]*?)<section class="hero">/);
const footerMatch = indexHtml.match(/(<footer>[\s\S]*?<\/html>)/);

const head = headMatch[1];
const footer = footerMatch[1];

const linuxContent = `${head}
  <section class="hero" style="padding-top: clamp(60px, 12vh, 140px); padding-bottom: clamp(60px, 10vh, 120px);">
    <div class="wrap" style="text-align: center; margin: 0 auto;">
      <span class="kicker" style="justify-content: center; margin-bottom: 24px; display: inline-flex; align-items: center; gap: 8px;">Built for Linux <span style="background: var(--ink-3); color: var(--paper); font-size: 0.65rem; padding: 2px 6px; border-radius: 10px; font-weight: bold; line-height: 1; letter-spacing: 0.05em;">PLANNED</span></span>
      <h1 class="display" style="margin-bottom: 24px;">Designed around Linux. <br>Not merely compatible.</h1>
      <p class="lede">Osmos uses standard Linux APIs to deliver an experience that respects your system. Fast, efficient, and private by design.</p>
    </div>
  </section>

  <section class="section" id="native" style="border-top: 1px solid var(--rule); background: var(--paper-2);">
    <div class="wrap">
      <div class="hero-content" style="align-items: center;">
        <div class="hero-left">
          <span class="kicker">Native Integration</span>
          <h2 class="display" style="font-size: clamp(2rem, 5vw, 3.2rem); margin: 16px 0 24px;">Respects your filesystem.</h2>
          <p class="desc" style="font-size: 1.1rem; line-height: 1.6; color: var(--ink-2);">Changes are detected instantly using inotify. No constant polling, no wasted CPU cycles. It works entirely within the Unix philosophy.</p>
        </div>
        <div class="hero-right">
          <div class="meta" style="width: 100%;">
            <div class="cap">Filesystem Activity</div>
            <div class="p-4" style="padding: 24px; font-family: var(--mono); font-size: 0.85rem; color: var(--ink-2); line-height: 1.8;">
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--rule); padding-bottom: 8px; margin-bottom: 8px;">
                <span style="color: var(--ink);">~/projects/logo.svg</span>
                <span style="color: var(--accent);">Modified</span>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--rule); padding-bottom: 8px; margin-bottom: 8px;">
                <span style="color: var(--ink);">~/projects/assets/bg.png</span>
                <span style="color: var(--accent);">Added</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--ink-3);">Listening for inotify events...</span>
                <span style="color: var(--ink-3);">0.01% CPU</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="cli" style="border-top: 1px solid var(--rule);">
    <div class="wrap">
      <div class="sec-head">
        <span class="kicker" style="display: inline-flex; align-items: center; gap: 8px;">CLI & GUI Experience</span>
        <h2 style="font-size: clamp(2rem, 5vw, 3.2rem); margin: 16px 0 24px;">Works how you want.</h2>
        <p class="desc" style="font-size: 1.1rem; line-height: 1.6; color: var(--ink-2);">Whether you prefer the terminal, GNOME, or KDE, Osmos integrates smoothly. Run it as a headless daemon on your server or use the desktop app.</p>
      </div>
      
      <div class="meta" style="margin-top: 40px; max-width: 100%;">
        <div class="cap" style="display: flex; gap: 8px; align-items: center;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--ink-2);"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
          <span style="margin-left: 8px; display: inline-flex; align-items: center; gap: 8px;">Terminal</span>
        </div>
        <div style="padding: 24px; background: var(--paper); border-radius: 0 0 6px 6px; font-family: var(--mono); font-size: 0.85rem; line-height: 1.6;">
          <div style="color: var(--ink-2); margin-bottom: 8px;">$ osmos history logo.svg</div>
          <div style="color: var(--ink);">
            <div style="display: flex; gap: 16px; margin-bottom: 4px;">
              <span style="color: var(--accent);">v12</span>
              <span>Today 14:32</span>
              <span style="color: var(--ink-2);">Updated curves</span>
            </div>
            <div style="display: flex; gap: 16px; margin-bottom: 8px;">
              <span style="color: var(--ink-3);">v11</span>
              <span style="color: var(--ink-3);">Yesterday 09:15</span>
              <span style="color: var(--ink-3);">Initial draft</span>
            </div>
          </div>
          <div style="color: var(--ink-2); margin-bottom: 8px; margin-top: 16px;">$ osmos restore logo.svg --version v11</div>
          <div style="color: #27c93f;">✓ Restored logo.svg to version v11</div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="performance" style="border-top: 1px solid var(--rule); background: var(--paper-2);">
    <div class="wrap">
      <div class="hero-content" style="align-items: center;">
        <div class="hero-left">
          <div class="meta" style="width: 100%;">
            <div class="cap">System Resources</div>
            <div style="padding: 40px 24px; text-align: center;">
              <div style="display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 80px; border-radius: 16px; border: 1px solid var(--rule); background: var(--paper); box-shadow: 0 4px 20px rgba(0,0,0,0.05); margin-bottom: 20px;">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              </div>
              <div style="font-family: var(--mono); font-size: 1.2rem; font-weight: bold;">Minimal Footprint</div>
              <div style="font-size: 0.85rem; color: var(--ink-3); margin-top: 8px;">Written in Rust</div>
            </div>
          </div>
        </div>
        <div class="hero-right">
          <span class="kicker">Performance</span>
          <h2 class="display" style="font-size: clamp(2rem, 5vw, 3.2rem); margin: 16px 0 24px;">Lightweight by nature.</h2>
          <p class="desc" style="font-size: 1.1rem; line-height: 1.6; color: var(--ink-2);">No heavy interpreters or massive runtimes. Osmos runs quietly in the background taking up barely any memory, ensuring your machine's resources are kept for your actual work.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="privacy" style="border-top: 1px solid var(--rule);">
    <div class="wrap" style="text-align: center; margin: 0 auto;">
      <span class="kicker" style="justify-content: center;">Privacy & Security</span>
      <h2 class="display" style="font-size: clamp(2rem, 5vw, 3.2rem); margin: 16px 0 24px;">Your system, your rules.</h2>
      <p class="desc" style="font-size: 1.1rem; line-height: 1.6; color: var(--ink-2); margin-bottom: 40px;">Osmos integrates with your Linux keyring to store encryption keys safely. Files never leave your local network, giving you absolute ownership over your data.</p>
      
      <div style="display: flex; gap: 24px; justify-content: center; flex-wrap: wrap;">
        <div style="background: var(--paper-2); border: 1px solid var(--rule); padding: 16px 24px; border-radius: 8px; font-family: var(--mono); font-size: 0.85rem;">
          Secret Service API
        </div>
        <div style="background: var(--paper-2); border: 1px solid var(--rule); padding: 16px 24px; border-radius: 8px; font-family: var(--mono); font-size: 0.85rem;">
          End-to-end Encrypted
        </div>
        <div style="background: var(--paper-2); border: 1px solid var(--rule); padding: 16px 24px; border-radius: 8px; font-family: var(--mono); font-size: 0.85rem;">
          Local Network Only
        </div>
      </div>
    </div>
  </section>
${footer}`;

fs.writeFileSync('linux/index.html', linuxContent);
