import time
from playwright.sync_api import sync_playwright

def run_tests():
    with sync_playwright() as p:
        # Launch headless chromium
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        # Navigate to the local server
        print("🔗 Navigating to http://localhost:5173...")
        page.goto('http://localhost:5173')
        page.wait_for_load_state('networkidle')
        
        # Test 1: Dark Mode toggle
        print("🌓 Running Test 1: Dark Mode theme attribute change...")
        initial_theme = page.evaluate("document.documentElement.getAttribute('data-theme')") or "light"
        print(f"   Initial theme: {initial_theme}")
        
        # Click the theme toggle button
        theme_btn = page.locator('#theme-toggle')
        theme_btn.click()
        
        # Wait for the transition to complete
        time.sleep(1.2)
        
        new_theme = page.evaluate("document.documentElement.getAttribute('data-theme')")
        print(f"   New theme: {new_theme}")
        
        assert initial_theme != new_theme, "Theme attribute did not change!"
        print("✅ Test 1 Passed: Theme toggled successfully.")
        
        # Test 2: Hero development status block
        print("🛠️ Running Test 2: Hero development status validation...")

        status_line = page.locator('.dev-status .status-line')
        assert status_line.is_visible(), "Development status line is not visible!"
        assert 'in active development' in status_line.inner_text().lower(), "Status text mismatch!"

        # Waitlist form must be fully removed
        assert page.locator('#waitlist-form').count() == 0, "Waitlist form is still present!"

        # Status note links to GitHub
        github_link = page.locator('.dev-status a[href*="github.com"]')
        assert github_link.count() == 1, "GitHub link missing from status note!"

        print("✅ Test 2 Passed: Development status visible, waitlist fully removed.")

        browser.close()

if __name__ == '__main__':
    run_tests()
