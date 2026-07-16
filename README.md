# Osmos Website

This repository contains the marketing website and waitlist portal for **[Osmos](https://useosmos.com)**, a local-first version control system designed around your operating system.

The site is built as a highly optimized, multi-page product website utilizing a robust CSS design system, fluid typography, dark mode integration, and a Firebase-backed waitlist architecture.

---

## 🏗 Architecture & Stack

- **Frontend Build Tool:** Vite
- **Styling:** Vanilla CSS (TailwindCSS v4 for utility foundation) with a custom design token system (`globals.css`).
- **Page Generation:** Custom Node.js scripts (`generate_*.js`) that dynamically compile the multi-page structure (macOS, Windows, Linux, Android, Features, Blog, etc.) using `index.html` as a template layout.
- **Backend & Hosting:** Firebase Hosting, Cloud Functions (for the waitlist API), and Firestore.
- **E2E Testing:** Python Playwright (`test_osmos.py`).

---

## 📂 Directory Layout

```text
├── src/
│   ├── globals.css         # Core styling system, design tokens, and CSS variables
│   └── main.js             # Client interactivity (Dark mode, waitlist form, animation logic)
├── functions/
│   ├── index.js            # Node.js Firebase Cloud Function (subscription, mail SMTP)
│   └── package.json        # Backend dependencies
├── public/                 # Static media and vector assets
├── index.html              # Core HTML structure / Template for generated pages
├── generate_pages.js       # Script to generate generic pages (Features, Security, Blog, etc.)
├── generate_macos.js       # Script to generate the macOS platform page
├── generate_windows.js     # Script to generate the Windows platform page
├── generate_linux.js       # Script to generate the Linux platform page
├── generate_android.js     # Script to generate the Android platform page
├── vite.config.js          # Vite compilation config
├── firebase.json           # Firebase Hosting, Rewrites, Headers, and Emulator mapping
├── firestore.rules         # Security rules protecting Firestore collections
├── test_osmos.py           # Playwright E2E Python test suite
└── package.json            # Frontend dependency definitions and scripts
```

---

## 🛠 Local Development

### Prerequisites

- Node.js (v22+)
- Firebase CLI (for emulator testing and manual deployment)
- Python (with `playwright` installed for E2E tests)

### Running the Website

1. Install dependencies:
   ```bash
   npm install
   ```

2. Generate the multi-page structure:
   Whenever you make structural changes to platform pages or standard pages, you must run the generators:
   ```bash
   node generate_macos.js
   node generate_windows.js
   node generate_linux.js
   node generate_android.js
   node generate_pages.js
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The site will be running at `http://localhost:5173`.

### Building for Production

To compile and minify the site for production:
```bash
npm run build
```
This generates the optimized bundle in the `dist/` directory.

---

## 🧪 Firebase Emulators (Backend Testing)

To test Firestore writes, Cloud Functions execution, and custom headers locally:

1. Initialize the Firebase Emulator:
   ```bash
   npx firebase-tools emulators:start
   ```

2. Access the Emulator Suite at `http://localhost:4000` and the mock frontend endpoint at `http://localhost:5002`.

---

## ⚙️ Waitlist API Reference

### POST `/api/subscribe`

Registers a new user to the Osmos waitlist and queues the welcome email sequence.

#### Request Payload
```json
{
  "email": "developer@useosmos.com",
  "consent": true
}
```

#### Response (Success - 200 OK)
```json
{
  "success": true,
  "message": "Subscribed successfully"
}
```

---

## 🚀 CI/CD & Deployment

Deployments are fully automated via GitHub Actions:

| GitHub Event | Action Triggered | Target |
| --- | --- | --- |
| Pull Request | `firebase-hosting-pull-request.yml` | Deploys a temporary preview channel for review |
| Push/Merge to `main` | `firebase-hosting-merge.yml` | Deploys to live production at `useosmos.com` |

To deploy hosting manually:
```bash
npx firebase-tools deploy --only hosting
```

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
