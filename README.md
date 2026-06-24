# osmos — website

Marketing site and landing page for [Osmos](https://useosmos.com), a local-first version control system for designers, writers, and teams.

Built with Vite and deployed to Firebase Hosting via GitHub Actions.

## About Osmos

Osmos is a snapshot-based version control system that works entirely on your local network — no cloud required, no CLI commands. Files are end-to-end encrypted using AES-GCM with PBKDF2-derived keys, and devices discover each other via mDNS.

- **macOS / iOS** — native SwiftUI app
- **Android** — Material Design 3
- **Core engine** — Rust, with optional Gitoxide backend

For the macOS client, see [osmos-macos](https://github.com/Osmos-App/osmos-macos).

## Development

```bash
npm install
npm run dev       # dev server at localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

## Deployment

Deployments are fully automated via GitHub Actions:

| Event | Target |
| --- | --- |
| Pull request opened | Temporary preview channel |
| Merge to `main` | Live production (`useosmos.com`) |

To deploy manually:

```bash
npx firebase-tools deploy --only hosting
```

To run the Firebase emulator locally (tests headers, rewrites, and Cloud Functions):

```bash
npx firebase-tools emulators:start
```

## Stack

| Layer | Technology |
| --- | --- |
| Build | Vite, PostCSS, Tailwind CSS |
| Hosting | Firebase Hosting |
| Functions | Firebase Cloud Functions (Node.js) — email subscriptions |
| Analytics | Firebase Analytics |

## Contributing

See [CONTRIBUTING.md](https://github.com/Osmos-App/.github/blob/main/CONTRIBUTING.md) for guidelines.

## License

MIT — see [LICENSE](LICENSE).
