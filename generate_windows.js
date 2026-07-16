const fs = require('fs');
const indexHtml = fs.readFileSync('index.html', 'utf-8');

const headMatch = indexHtml.match(/([\s\S]*?)<section class="hero">/);
const footerMatch = indexHtml.match(/(<footer>[\s\S]*?<\/html>)/);

const head = headMatch[1];
const footer = footerMatch[1];

const windowsContent = `${head}
  <section class="hero" style="padding-top: clamp(60px, 12vh, 140px); padding-bottom: clamp(60px, 10vh, 120px);">
    <div class="wrap" style="text-align: center; margin: 0 auto;">
      <span class="kicker" style="justify-content: center; margin-bottom: 24px; display: inline-flex; align-items: center; gap: 8px;">Built for Windows <span style="background: var(--ink-3); color: var(--paper); font-size: 0.65rem; padding: 2px 6px; border-radius: 10px; font-weight: bold; line-height: 1; letter-spacing: 0.05em;">PLANNED</span></span>
      <h1 class="display" style="margin-bottom: 24px;">Designed around Windows. <br>Not merely compatible.</h1>
      <p class="lede">Osmos uses native APIs to deliver an experience that feels perfectly at home on your PC. Fast, efficient, and private by design.</p>
    </div>
  </section>

  <section class="section" id="native" style="border-top: 1px solid var(--rule); background: var(--paper-2);">
    <div class="wrap">
      <div class="hero-content" style="align-items: center;">
        <div class="hero-left">
          <span class="kicker">Native Integration</span>
          <h2 class="display" style="font-size: clamp(2rem, 5vw, 3.2rem); margin: 16px 0 24px;">Respects your filesystem.</h2>
          <p class="desc" style="font-size: 1.1rem; line-height: 1.6; color: var(--ink-2);">Changes are detected instantly without slowing down your PC. It hooks directly into Windows APIs to monitor changes seamlessly without heavy background services.</p>
        </div>
        <div class="hero-right">
          <div class="meta" style="width: 100%;">
            <div class="cap">Filesystem Activity</div>
            <div class="p-4" style="padding: 24px; font-family: var(--mono); font-size: 0.85rem; color: var(--ink-2); line-height: 1.8;">
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--rule); padding-bottom: 8px; margin-bottom: 8px;">
                <span style="color: var(--ink);">C:\\Projects\\Logo.psd</span>
                <span style="color: var(--accent);">Modified</span>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--rule); padding-bottom: 8px; margin-bottom: 8px;">
                <span style="color: var(--ink);">C:\\Projects\\Assets\\bg.png</span>
                <span style="color: var(--accent);">Added</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--ink-3);">Listening for events...</span>
                <span style="color: var(--ink-3);">0.01% CPU</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="explorer" style="border-top: 1px solid var(--rule);">
    <div class="wrap">
      <div class="sec-head">
        <span class="kicker" style="display: inline-flex; align-items: center; gap: 8px;">File Explorer Experience</span>
        <h2 style="font-size: clamp(2rem, 5vw, 3.2rem); margin: 16px 0 24px;">Works where you work.</h2>
        <p class="desc" style="font-size: 1.1rem; line-height: 1.6; color: var(--ink-2);">Browse your history directly from Windows File Explorer. Revert changes, view past versions, and restore deleted files natively through context menus.</p>
      </div>
      
      <div class="meta" style="margin-top: 40px; max-width: 100%;">
        <div class="cap" style="display: flex; gap: 8px; align-items: center;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--ink-2);"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
          <span style="margin-left: 8px; display: inline-flex; align-items: center; gap: 8px;">Windows Explorer</span>
        </div>
        <div style="padding: 24px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
          <div style="background: var(--paper); padding: 16px; border-radius: 6px; border: 1px solid var(--rule);">
            <div style="font-weight: 600; margin-bottom: 4px;">Logo.psd</div>
            <div style="font-size: 0.85rem; color: var(--ink-3);">Today at 14:32</div>
          </div>
          <div style="background: var(--paper); padding: 16px; border-radius: 6px; border: 1px solid var(--accent); position: relative;">
            <div style="position: absolute; top: -8px; right: -8px; background: var(--accent); color: var(--paper); font-size: 0.65rem; padding: 2px 6px; border-radius: 10px; font-weight: bold;">RESTORED</div>
            <div style="font-weight: 600; margin-bottom: 4px;">Logo.psd (v12)</div>
            <div style="font-size: 0.85rem; color: var(--ink-3);">Yesterday at 09:15</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="performance" style="border-top: 1px solid var(--rule); background: var(--paper-2);">
    <div class="wrap">
      <div class="hero-content" style="align-items: center;">
        <div class="hero-left">
          <div class="meta" style="width: 100%;">
            <div class="cap">Architecture Support</div>
            <div style="padding: 40px 24px; text-align: center;">
              <div style="display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 80px; border-radius: 16px; border: 1px solid var(--rule); background: var(--paper); box-shadow: 0 4px 20px rgba(0,0,0,0.05); margin-bottom: 20px;">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
              </div>
              <div style="font-family: var(--mono); font-size: 1.2rem; font-weight: bold;">Compiled Native</div>
              <div style="font-size: 0.85rem; color: var(--ink-3); margin-top: 8px;">x64 & ARM64 Support</div>
            </div>
          </div>
        </div>
        <div class="hero-right">
          <span class="kicker">Performance</span>
          <h2 class="display" style="font-size: clamp(2rem, 5vw, 3.2rem); margin: 16px 0 24px;">No Electron overhead.</h2>
          <p class="desc" style="font-size: 1.1rem; line-height: 1.6; color: var(--ink-2);">Blazing fast and incredibly efficient. Osmos is built with Rust and Tauri, meaning it uses almost no RAM and doesn't drain your laptop's battery while running in the background.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="privacy" style="border-top: 1px solid var(--rule);">
    <div class="wrap" style="text-align: center; margin: 0 auto;">
      <span class="kicker" style="justify-content: center;">Privacy & Security</span>
      <h2 class="display" style="font-size: clamp(2rem, 5vw, 3.2rem); margin: 16px 0 24px;">Private by design.</h2>
      <p class="desc" style="font-size: 1.1rem; line-height: 1.6; color: var(--ink-2); margin-bottom: 40px;">Your encryption keys are securely protected by the Windows Data Protection API (DPAPI). Your devices communicate over your local network, ensuring your data never touches a third-party server.</p>
      
      <div style="display: flex; gap: 24px; justify-content: center; flex-wrap: wrap;">
        <div style="background: var(--paper-2); border: 1px solid var(--rule); padding: 16px 24px; border-radius: 8px; font-family: var(--mono); font-size: 0.85rem;">
          Windows DPAPI
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

fs.writeFileSync('windows/index.html', windowsContent);
