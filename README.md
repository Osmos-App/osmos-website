<p align="center">
  <img src="./assets/readme/hero.svg" width="100%" alt="Osmos Website: the product site for local-first version control">
</p>

# Osmos Website

The product website and waitlist for [Osmos](https://useosmos.com): a local-first version-control system positioned for designers, writers, and teams who want to keep their work private and close to their devices.

The site is a responsive, multi-page Vite build with an editorial paper-and-teal visual system, theme support, and Firebase-backed waitlist infrastructure.

> 🇹🇷 Türkçe sürüm: [README.tr.md](README.tr.md)

## What visitors can explore

- The Osmos product story and local-first approach
- Platform pages for macOS, Windows, Linux, and Android
- Features, security, pricing, open-source, documentation, blog, and download pages
- The waitlist experience

## Stack

| Layer | Tooling |
| --- | --- |
| Build | Vite |
| Interface | Vanilla CSS with Tailwind CSS v4 utilities and custom design tokens |
| Hosting & data | Firebase Hosting and Firestore |
| Browser checks | Python + Playwright (`test_osmos.py`) |

## Run locally

```bash
npm install
npm run dev
```

Vite serves the site locally (normally at `http://localhost:5173`). Create a production build with:

```bash
npm run build
```

## Project map

```text
src/globals.css   shared typography, color tokens, and responsive visual system
src/main.js       client-side interactions and waitlist behavior
public/           static files, robots.txt, and sitemap.xml
*/index.html      product, platform, and information pages
firebase.json     hosting, headers, and emulator configuration
firestore.rules   waitlist data access rules
```

## Firebase emulators

To test Firebase services locally:

```bash
npx firebase-tools emulators:start
```

The Emulator Suite is available at `http://localhost:4000`.

## License

MIT — see [LICENSE](LICENSE).
