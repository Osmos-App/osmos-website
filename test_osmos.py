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
        
        # Test 2: Waitlist Form Morphing Success State
        print("✉️ Running Test 2: Waitlist form morphing validation...")
        
        email_input = page.locator('#waitlist-email')
        submit_btn = page.locator('#waitlist-submit')
        
        # Ensure form is visible
        assert email_input.is_visible(), "Email input is not visible!"
        
        # Fill in a mock email address
        email_input.fill('test_e2e_playwright@useosmos.com')
        
        # Check the consent checkbox
        page.locator('#waitlist-consent').check()
        
        # Intercept subscribe API call to return a mock success response so we don't spam email delivery systems
        page.route('**/api/subscribe', lambda route: route.fulfill(
            status=200,
            content_type='application/json',
            body='{"success": true, "message": "Subscribed successfully"}'
        ))
        
        # Click the submit button
        submit_btn.click()
        
        # Wait for the success morph animation and view to become visible
        success_view = page.locator('#waitlist-success-view')
        success_view.wait_for(state='visible', timeout=5000)
        
        # Verify inputs are hidden
        content_view = page.locator('#waitlist-content')
        assert not content_view.is_visible(), "Waitlist content is still visible!"
        assert success_view.is_visible(), "Waitlist success view is not visible!"
        
        print("✅ Test 2 Passed: Waitlist form successfully morphed into success view.")
        
        browser.close()

if __name__ == '__main__':
    run_tests()
