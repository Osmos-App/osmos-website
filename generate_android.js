const fs = require('fs');
const indexHtml = fs.readFileSync('index.html', 'utf-8');

const headMatch = indexHtml.match(/([\s\S]*?)<section class="hero">/);
const footerMatch = indexHtml.match(/(<footer>[\s\S]*?<\/html>)/);

const head = headMatch[1];
const footer = footerMatch[1];

const androidContent = `${head}
  <section class="hero" style="padding-top: clamp(60px, 12vh, 140px); padding-bottom: clamp(60px, 10vh, 120px);">
    <div class="wrap" style="text-align: center; margin: 0 auto;">
      <span class="kicker" style="justify-content: center; margin-bottom: 24px; display: inline-flex; align-items: center; gap: 8px;">Built for Android <span style="background: var(--ink-3); color: var(--paper); font-size: 0.65rem; padding: 2px 6px; border-radius: 10px; font-weight: bold; line-height: 1; letter-spacing: 0.05em;">PLANNED</span></span>
      <h1 class="display" style="margin-bottom: 24px;">Designed around Android. <br>Not merely compatible.</h1>
      <p class="lede">Osmos uses standard Android frameworks to deliver an experience that feels perfectly at home on your phone. Fast, efficient, and private by design.</p>
    </div>
  </section>

  <section class="section" id="native" style="border-top: 1px solid var(--rule); background: var(--paper-2);">
    <div class="wrap">
      <div class="hero-content" style="align-items: center;">
        <div class="hero-left">
          <span class="kicker">Native Integration</span>
          <h2 class="display" style="font-size: clamp(2rem, 5vw, 3.2rem); margin: 16px 0 24px;">Works with your storage.</h2>
          <p class="desc" style="font-size: 1.1rem; line-height: 1.6; color: var(--ink-2);">Changes are synced seamlessly using modern Scoped Storage APIs. No intrusive permissions, no constantly running background services draining your battery.</p>
        </div>
        <div class="hero-right">
          <div class="meta" style="width: 100%;">
            <div class="cap">Storage Activity</div>
            <div class="p-4" style="padding: 24px; font-family: var(--mono); font-size: 0.85rem; color: var(--ink-2); line-height: 1.8;">
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--rule); padding-bottom: 8px; margin-bottom: 8px;">
                <span style="color: var(--ink);">/Documents/Notes.md</span>
                <span style="color: var(--accent);">Synced</span>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--rule); padding-bottom: 8px; margin-bottom: 8px;">
                <span style="color: var(--ink);">/Pictures/Export.png</span>
                <span style="color: var(--accent);">Synced</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--ink-3);">Waiting for network...</span>
                <span style="color: var(--ink-3);">Optimized</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="app" style="border-top: 1px solid var(--rule);">
    <div class="wrap">
      <div class="sec-head">
        <span class="kicker" style="display: inline-flex; align-items: center; gap: 8px;">Mobile Experience</span>
        <h2 style="font-size: clamp(2rem, 5vw, 3.2rem); margin: 16px 0 24px;">History in your pocket.</h2>
        <p class="desc" style="font-size: 1.1rem; line-height: 1.6; color: var(--ink-2);">Access your version history anywhere on your local network. Revert changes or review past iterations from a beautiful, Material You inspired interface.</p>
      </div>
      
      <div class="meta" style="margin-top: 40px; max-width: 100%;">
        <div class="cap" style="display: flex; gap: 8px; align-items: center;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--ink-2);"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
          <span style="margin-left: 8px; display: inline-flex; align-items: center; gap: 8px;">Osmos Android App</span>
        </div>
        <div style="padding: 24px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
          <div style="background: var(--paper); padding: 16px; border-radius: 6px; border: 1px solid var(--rule);">
            <div style="font-weight: 600; margin-bottom: 4px;">Notes.md</div>
            <div style="font-size: 0.85rem; color: var(--ink-3);">Today at 14:32</div>
          </div>
          <div style="background: var(--paper); padding: 16px; border-radius: 6px; border: 1px solid var(--accent); position: relative;">
            <div style="position: absolute; top: -8px; right: -8px; background: var(--accent); color: var(--paper); font-size: 0.65rem; padding: 2px 6px; border-radius: 10px; font-weight: bold;">RESTORED</div>
            <div style="font-weight: 600; margin-bottom: 4px;">Notes.md (v12)</div>
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
            <div class="cap">Battery Profile</div>
            <div style="padding: 40px 24px; text-align: center;">
              <div style="display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 80px; border-radius: 16px; border: 1px solid var(--rule); background: var(--paper); box-shadow: 0 4px 20px rgba(0,0,0,0.05); margin-bottom: 20px;">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect><line x1="22" y1="11" x2="22" y2="13"></line></svg>
              </div>
              <div style="font-family: var(--mono); font-size: 1.2rem; font-weight: bold;">Battery Friendly</div>
              <div style="font-size: 0.85rem; color: var(--ink-3); margin-top: 8px;">Uses WorkManager</div>
            </div>
          </div>
        </div>
        <div class="hero-right">
          <span class="kicker">Performance</span>
          <h2 class="display" style="font-size: clamp(2rem, 5vw, 3.2rem); margin: 16px 0 24px;">Efficient syncing.</h2>
          <p class="desc" style="font-size: 1.1rem; line-height: 1.6; color: var(--ink-2);">Designed to preserve your phone's battery life. Osmos intelligently schedules sync operations to occur only when you are connected to power and a stable local network.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="privacy" style="border-top: 1px solid var(--rule);">
    <div class="wrap" style="text-align: center; margin: 0 auto;">
      <span class="kicker" style="justify-content: center;">Privacy & Security</span>
      <h2 class="display" style="font-size: clamp(2rem, 5vw, 3.2rem); margin: 16px 0 24px;">Private by design.</h2>
      <p class="desc" style="font-size: 1.1rem; line-height: 1.6; color: var(--ink-2); margin-bottom: 40px;">Your encryption keys are securely protected inside the hardware-backed Android Keystore. Your devices communicate over your local Wi-Fi, ensuring your data never touches a third-party server.</p>
      
      <div style="display: flex; gap: 24px; justify-content: center; flex-wrap: wrap;">
        <div style="background: var(--paper-2); border: 1px solid var(--rule); padding: 16px 24px; border-radius: 8px; font-family: var(--mono); font-size: 0.85rem;">
          Android Keystore
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

fs.writeFileSync('android/index.html', androidContent);
