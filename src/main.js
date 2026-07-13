import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import './globals.css';

const firebaseConfig = {
  apiKey: "AIzaSyCc1HM8yxDdTllxKCInNS3r1K5lHVvBrc4",
  authDomain: "osmos-app.firebaseapp.com",
  projectId: "osmos-app",
  storageBucket: "osmos-app.firebasestorage.app",
  messagingSenderId: "415568816803",
  appId: "1:415568816803:web:ecd6771d54a25ebd3c6d16",
  measurementId: "G-D5J7HYSETC"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

logEvent(analytics, 'app_initialized', {
  version: '0.1.0-alpha',
  platform: 'web',
  timestamp: new Date().toISOString()
});

console.log("Osmos: Core system initialized successfully.");

// current year
const yrElement = document.getElementById('yr');
if (yrElement) {
  yrElement.textContent = new Date().getFullYear();
}

// copy-to-clipboard chips
document.querySelectorAll('.chip[data-copy]').forEach(function (chip) {
  chip.addEventListener('click', function () {
    var text = chip.getAttribute('data-copy');
    var label = chip.querySelector('.copy');
    var done = function () {
      chip.classList.add('copied');
      if (label) label.textContent = 'copied';
      setTimeout(function () { chip.classList.remove('copied'); if (label) label.textContent = 'copy'; }, 1600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(done);
    } else { done(); }
  });
});

// scroll reveal
var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var items = document.querySelectorAll('.reveal');
if (reduce || !('IntersectionObserver' in window)) {
  items.forEach(function (el) { el.classList.add('in'); });
} else {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
  items.forEach(function (el) { io.observe(el); });
}

// Theme Toggle with View Transition API Circular Ripple
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', function () {
    // Set coordinates to the center of the theme toggle button for a perfect circular expansion
    const rect = themeToggleBtn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    document.documentElement.style.setProperty('--click-x', x + 'px');
    document.documentElement.style.setProperty('--click-y', y + 'px');

    const toggleTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
    };

    if (document.startViewTransition) {
      document.documentElement.classList.add('theme-transition');
      const transition = document.startViewTransition(toggleTheme);
      transition.finished.finally(() => {
        document.documentElement.classList.remove('theme-transition');
      });
    } else {
      toggleTheme();
    }
  });
}

// Cookie Consent Popup with View Transition dismissal
const initCookieConsent = () => {
  try {
    const isAccepted = localStorage.getItem('osmos_cookies_accepted') === 'true';
    if (isAccepted) return;

    // Create popup HTML structure
    const popup = document.createElement('div');
    popup.id = 'cookie-popup';
    popup.className = 'cookie-popup';
    popup.innerHTML = `
      <div class="cookie-popup-content">
        <p>We use essential cookies to save your preferences. Read our <a href="/privacy" class="textlink">Privacy Notice</a>.</p>
        <button id="cookie-accept" class="btn cookie-btn">Accept</button>
      </div>
    `;
    document.body.appendChild(popup);

    // Setup accept handler
    const acceptBtn = document.getElementById('cookie-accept');
    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        try {
          localStorage.setItem('osmos_cookies_accepted', 'true');
        } catch (e) {
          console.warn('LocalStorage is not available:', e);
        }

        const dismissPopup = () => {
          popup.remove();
        };

        if (document.startViewTransition) {
          document.startViewTransition(dismissPopup);
        } else {
          dismissPopup();
        }
      });
    }
  } catch (e) {
    console.warn('LocalStorage is not available:', e);
  }
};

// Start cookie consent on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCookieConsent);
} else {
  initCookieConsent();
}