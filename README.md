# Zukhruf Khattak — Portfolio

Modern, high-performance portfolio website for **Zukhruf Khattak**, Agentic AI Engineer specializing in multi-agent systems, RAG pipelines, and voice agents.

## Features
- **100% Offline & Portable**: Self-contained static website with no external CDN or framework dependencies.
- **Agent Constellation Canvas**: Interactive particle and physics-based network canvas visualization.
- **Custom Design System**: Dark/light theme toggle, custom cursor, smooth page-wipe transitions, project modals, tilt interactions, and marquees.
- **Self-Hosted Typography**: Fully bundled WOFF2 fonts for *Fraunces* and *Space Grotesk*.

## Project Structure
```
portfolio/
├── index.html              # Clean semantic HTML structure
├── portfolio-single.html   # Standalone portable single-file edition
├── css/
│   └── style.css           # Styling, design tokens, and @font-face rules
├── js/
│   └── main.js             # Interactions, animations, and canvas physics
├── fonts/
│   ├── Fraunces-400-italic.woff2
│   ├── Fraunces-600-normal.woff2
│   ├── Fraunces-900-normal.woff2
│   ├── SpaceGrotesk-400-normal.woff2
│   ├── SpaceGrotesk-500-normal.woff2
│   └── SpaceGrotesk-700-normal.woff2
└── README.md
```

## How to Run Locally

### Option 1: Direct File
Simply double-click or open `index.html` directly in any modern browser.

### Option 2: Local HTTP Server
Run any lightweight static server:

```bash
# Using Node.js (npx http-server)
npx http-server -p 8080

# Or using Python 3
python -m http.server 8080
```
Then navigate to `http://localhost:8080` in your web browser.

## Deployment
Deploy to any static hosting provider (GitHub Pages, Cloudflare Pages, Vercel, Netlify, AWS S3) by pushing the repository or uploading the project directory directly. No build step or bundling required.
