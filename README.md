# Osmos — Local-First Version Control

> **osmos** — *the gradual movement of a system toward a shared equilibrium.*

Osmos is a local-first version control system built for designers, writers, and teams. No cloud required, no complex CLI commands. Just your files, versioned and synced across your devices — privately, locally, and fast.

This repository contains the static web dashboard and landing page for the Osmos project, built with **Vite** and **Tailwind CSS**.

---

## 🚀 Key Features

*   **Snapshot-Based Versioning**: Every save is a full snapshot, not a complex diff. Revert a single file or an entire commit instantly with two-level rollback.
*   **Local & Offline Sync**: Uses mDNS to discover devices on your local network. Once reachable, changes sync automatically to the central hub without external servers.
*   **End-to-End Encrypted**: Files are encrypted with PBKDF2-derived keys. Data is secured via AES-GCM, and transport is protected using the Noise Protocol.
*   **Cross-Platform Native**: SwiftUI for macOS/iOS, Material Design 3 for Android, and native UIs for Windows/Linux.

---

## 🛠️ Tech Stack & System Architecture

| Component | Technology |
| :--- | :--- |
| **Frontend/UI** | HTML5, CSS3, ES6 Javascript |
| **Build System** | Vite, PostCSS, Tailwind CSS |
| **Analytics** | Firebase Analytics |
| **Core Engine** | Rust (with optional Gitoxide backend) |
| **P2P Discovery** | mDNS (`_osmos._tcp.local`) |

---

## 💻 Local Development

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### Dev Server
Run the local development server:
```bash
npm run dev
```

### Build
Generate the production-ready static files in the `dist/` directory:
```bash
npm run build
```

---

## ☁️ Firebase Hosting Deployment

This project uses **Classic Firebase Hosting** to serve static assets directly from the `dist/` directory.

### Local Emulation
To test the production build locally with headers and rewrites:
```bash
npx firebase-tools emulators:start --only hosting
```

### Manual Deployment
To deploy the app directly to the live production channel:
```bash
npx firebase-tools deploy --only hosting
```

### CI/CD Deployment (GitHub Actions)
Deployments are automated via GitHub Actions on every pull request and merge to the `main` branch:
*   PRs deploy to a temporary **Preview Channel**.
*   Merges to `main` deploy directly to **Live Production**.
