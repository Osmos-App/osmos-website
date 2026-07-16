const fs = require('fs');
const indexHtml = fs.readFileSync('index.html', 'utf-8');

const headMatch = indexHtml.match(/([\s\S]*?)<section class="hero">/);
const footerMatch = indexHtml.match(/(<footer>[\s\S]*?<\/html>)/);

const head = headMatch[1];
const footer = footerMatch[1];

const macosContent = `${head}
  <section class="hero" style="padding-top: clamp(60px, 12vh, 140px); padding-bottom: clamp(60px, 10vh, 120px);">
    <div class="wrap" style="text-align: center; margin: 0 auto;">
      <span class="kicker" style="justify-content: center; margin-bottom: 24px;">Built for macOS</span>
      <h1 class="display" style="margin-bottom: 24px;">Designed around macOS. <br>Not merely compatible.</h1>
      <p class="lede">Osmos uses native technologies to deliver an experience that feels perfectly at home on your Mac. Fast, efficient, and private by design.</p>
    </div>
  </section>

  <section class="section" id="native" style="border-top: 1px solid var(--rule); background: var(--paper-2);">
    <div class="wrap">
      <div class="hero-content" style="align-items: center;">
        <div class="hero-left">
          <span class="kicker">Native Integration</span>
          <h2 class="display" style="font-size: clamp(2rem, 5vw, 3.2rem); margin: 16px 0 24px;">Respects your filesystem.</h2>
          <p class="desc" style="font-size: 1.1rem; line-height: 1.6; color: var(--ink-2);">Changes are detected instantly using native macOS technologies. No polling, no battery drain. It just works with the folders you already have.</p>
        </div>
        <div class="hero-right">
          <div class="meta" style="width: 100%;">
            <div class="cap">Filesystem Activity</div>
            <div class="p-4" style="padding: 24px; font-family: var(--mono); font-size: 0.85rem; color: var(--ink-2); line-height: 1.8;">
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--rule); padding-bottom: 8px; margin-bottom: 8px;">
                <span style="color: var(--ink);">~/Design/Logo.psd</span>
                <span style="color: var(--accent);">Modified</span>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--rule); padding-bottom: 8px; margin-bottom: 8px;">
                <span style="color: var(--ink);">~/Design/Assets/bg.png</span>
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

  <section class="section" id="finder" style="border-top: 1px solid var(--rule);">
    <div class="wrap">
      <div class="sec-head">
        <span class="kicker">Finder Experience</span>
        <h2 style="font-size: clamp(2rem, 5vw, 3.2rem); margin: 16px 0 24px;">Works where you work.</h2>
        <p class="desc" style="font-size: 1.1rem; line-height: 1.6; color: var(--ink-2);">Browse your history directly from Finder. Revert changes, view past versions, and restore deleted files without ever opening a terminal.</p>
      </div>
      
      <div class="meta" style="margin-top: 40px; max-width: 100%;">
        <div class="cap" style="display: flex; gap: 8px; align-items: center;">
          <div style="width: 10px; height: 10px; border-radius: 50%; background: #ff5f56;"></div>
          <div style="width: 10px; height: 10px; border-radius: 50%; background: #ffbd2e;"></div>
          <div style="width: 10px; height: 10px; border-radius: 50%; background: #27c93f;"></div>
          <span style="margin-left: 12px;">Finder Extension</span>
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
            <div class="cap">Apple Silicon Architecture</div>
            <div style="padding: 40px 24px; text-align: center;">
              <div style="display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 80px; border-radius: 16px; border: 1px solid var(--rule); background: var(--paper); box-shadow: 0 4px 20px rgba(0,0,0,0.05); margin-bottom: 20px;">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <div style="font-family: var(--mono); font-size: 1.2rem; font-weight: bold;">Universal Binary</div>
              <div style="font-size: 0.85rem; color: var(--ink-3); margin-top: 8px;">Native ARM64 + x86_64</div>
            </div>
          </div>
        </div>
        <div class="hero-right">
          <span class="kicker">Performance</span>
          <h2 class="display" style="font-size: clamp(2rem, 5vw, 3.2rem); margin: 16px 0 24px;">Optimized for M-series.</h2>
          <p class="desc" style="font-size: 1.1rem; line-height: 1.6; color: var(--ink-2);">Blazing fast and incredibly efficient. Osmos is a universal binary built to take full advantage of Apple Silicon architectures, delivering high-throughput syncing without draining your battery.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="privacy" style="border-top: 1px solid var(--rule);">
    <div class="wrap" style="text-align: center; margin: 0 auto;">
      <span class="kicker" style="justify-content: center;">Privacy & Security</span>
      <h2 class="display" style="font-size: clamp(2rem, 5vw, 3.2rem); margin: 16px 0 24px;">Private by design.</h2>
      <p class="desc" style="font-size: 1.1rem; line-height: 1.6; color: var(--ink-2); margin-bottom: 40px;">Your encryption keys are protected using macOS security features. Your devices communicate using native networking capabilities, ensuring your data never touches a third-party server.</p>
      
      <div style="display: flex; gap: 24px; justify-content: center; flex-wrap: wrap;">
        <div style="background: var(--paper-2); border: 1px solid var(--rule); padding: 16px 24px; border-radius: 8px; font-family: var(--mono); font-size: 0.85rem;">
          Secure Enclave Ready
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

fs.writeFileSync('macos/index.html', macosContent);
