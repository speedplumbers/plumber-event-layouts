# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A **NodeCG bundle** for broadcast event graphics. NodeCG is a framework for live production overlays (esports, streaming, etc.) that coordinates three distinct layers:

- **Extension** — Node.js server-side logic managing shared state (Replicants)
- **Dashboard** — Operator control panels (browser)
- **Graphics** — Broadcast overlay views (browser)

## Commands

```bash
npm run dev      # Start everything in parallel: tsc watch, Vite dev server, NodeCG runtime
npm run build    # Production build (Vite for browser, Rollup for extension)
npm run clean    # Remove generated dirs: dashboard/, graphics/, extension/, db/
npm run generate-schema-types  # Regenerate TS types from NodeCG schemas
```

No test command is implemented yet.

## Architecture

### Three-tier NodeCG structure

```
Extension (Node.js)  ←→  Replicants (WebSocket sync)  ←→  Browser (Dashboard / Graphics)
```

- **`src/extension/index.ts`** — Exported function NodeCG invokes on startup. Creates/manages Replicants (shared state objects synced to all browser clients in real time).
- **`src/browser/dashboard/views/*.tsx`** — Each `.tsx` file becomes a separate dashboard panel HTML page. Use `useReplicant` from `@nodecg/react-hooks` to read/write Replicants.
- **`src/browser/graphics/views/*.tsx`** — Each `.tsx` file becomes a separate graphics overlay HTML page.
- **`src/browser/render.ts`** — Utility that mounts React components to `#root`.

### Build pipeline

A custom Vite plugin (`vite/vite-plugin-nodecg.mts`) orchestrates the entire build:
- Discovers graphics/dashboard views via globs
- Generates HTML files from `vite/template.html`
- Builds the extension via Rollup (with esbuild + node-externals plugins)
- In dev, injects HMR scripts into the HTML template

Bundle name is `plumber-event-layouts` (defined in `vite.config.mts`).

### Adding new panels or overlays

- Drop a `.tsx` file into `src/browser/dashboard/views/` for a new dashboard panel.
- Drop a `.tsx` file into `src/browser/graphics/views/` for a new graphics overlay.
- The build system auto-discovers them via glob — no registration required.

## Code Style

Prettier is configured with tabs (width 2), single JSX quotes, trailing commas, 80-char width, and auto-organized imports. Run Prettier before committing.
