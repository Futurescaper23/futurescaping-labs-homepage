# FutureScaping Labs

Polished front-end showcase for FutureScaping Labs, prepared for GEO Business 2026 at ExCeL London.

## Preview

The page can be previewed without installing dependencies:

```bash
node tools/static-server.mjs
```

Open `http://127.0.0.1:4173`.

The front page includes a lightweight interactive Labs room. Drag to rotate, use the
mouse wheel to zoom, or use the on-screen wall controls. The three demo walls open
generic detail pages:

- `monitoring.html`
- `siteview.html`
- `change-viewer.html`

For the React/Vite workflow, install dependencies and run:

```bash
npm install
npm run dev
```

## Editing Demo Content

The React demo data lives in `src/labsConfig.js`. The static fallback in `index.html` mirrors that content so the page remains reliable for trade show previewing without dependencies.
