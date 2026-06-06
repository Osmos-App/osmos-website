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
document.getElementById('yr').textContent = new Date().getFullYear();

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

// waitlist form submission handler
const waitlistForm = document.getElementById('waitlist-form');
const waitlistEmail = document.getElementById('waitlist-email');
const waitlistSubmit = document.getElementById('waitlist-submit');
const waitlistFeedback = document.getElementById('waitlist-feedback');

if (waitlistForm) {
  waitlistForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const email = waitlistEmail.value.trim();
    if (!email) return;

    // Reset feedback
    waitlistFeedback.className = 'waitlist-feedback';
    waitlistFeedback.textContent = '';
    
    // UI state: loading
    waitlistEmail.disabled = true;
    waitlistSubmit.disabled = true;
    const originalBtnHTML = waitlistSubmit.innerHTML;
    waitlistSubmit.innerHTML = 'Sending...';

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      });

      const data = await response.json();

      if (response.ok) {
        // Save registration status to localStorage
        try {
          localStorage.setItem('osmos_registered', 'true');
          localStorage.setItem('osmos_registered_visits', '1');
        } catch (e) {
          console.warn('LocalStorage is not available:', e);
        }

        // Success: Morph form to show success state using View Transitions
        const updateUI = () => {
          document.getElementById('waitlist-content').style.display = 'none';
          document.getElementById('waitlist-success-view').style.display = 'block';
        };

        if (document.startViewTransition) {
          document.startViewTransition(updateUI);
        } else {
          updateUI();
        }
        
        // Log event to Analytics
        logEvent(analytics, 'waitlist_signup', {
          email_domain: email.split('@')[1],
          timestamp: new Date().toISOString()
        });
      } else {
        // API Error
        waitlistFeedback.textContent = data.message || 'Failed to join. Please try again.';
        waitlistFeedback.classList.add('error');
      }
    } catch (err) {
      // Network/System Error
      waitlistFeedback.textContent = 'An error occurred. Please try again later.';
      waitlistFeedback.classList.add('error');
      console.error('Waitlist submission error:', err);
    } finally {
      // Re-enable inputs
      waitlistEmail.disabled = false;
      waitlistSubmit.disabled = false;
      waitlistSubmit.innerHTML = originalBtnHTML;
    }
  });
}

// Check registration status on load
const checkRegistration = () => {
  try {
    const isRegistered = localStorage.getItem('osmos_registered') === 'true';
    if (isRegistered) {
      let visits = parseInt(localStorage.getItem('osmos_registered_visits') || '1', 10);
      visits += 1;
      localStorage.setItem('osmos_registered_visits', visits.toString());

      const successView = document.getElementById('waitlist-success-view');
      const waitlistContent = document.getElementById('waitlist-content');

      if (successView && waitlistContent) {
        if (visits > 1) {
          successView.innerHTML = `
            <h3>You're on the list!</h3>
            <p>No worries, you will be notified.</p>
          `;
        }
        waitlistContent.style.display = 'none';
        successView.style.display = 'block';
      }
    }
  } catch (e) {
    console.warn('LocalStorage is not available:', e);
  }
};

checkRegistration();

// Theme Toggle with View Transition API Circular Ripple
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', function (e) {
    // Set coordinates as CSS variables for the circular clip path
    const x = e.clientX;
    const y = e.clientY;
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