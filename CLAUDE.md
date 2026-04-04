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
- **`src/browser/render.ts`** — Utility that mounts React components to `#root`. Every view entry point calls `render(<App />)`.
- **`src/browser/hooks.ts`** — Custom hooks that wrap `useReplicant` for cross-bundle Replicants (primarily nodecg-speedcontrol). Use these instead of calling `useReplicant` directly for speedcontrol data.
- **`src/browser/graphics/BaseLayout.tsx`** — 1920×1080 absolute-positioned container for graphics overlays.
- **`src/types/speedcontrol/`** — Hand-maintained TypeScript types for nodecg-speedcontrol Replicants (`RunDataArray`, `RunDataActiveRun`, `Timer`). Update these if speedcontrol types change.

### Dependent bundles

`bundles/` contains sibling NodeCG bundles as git submodules:

- **`bundles/nodecg-speedcontrol`** — Run schedule management; exposes `runDataArray`, `runDataActiveRun`, `timer` Replicants consumed via `src/browser/hooks.ts`.
- **`bundles/nodecg-obs-browser`** — OBS integration bundle.

NodeCG loads all bundles in `bundles/` automatically at startup.

### Build pipeline

A custom Vite plugin (`vite/vite-plugin-nodecg.mts`) orchestrates the entire build:

- Discovers graphics/dashboard views via globs
- Generates HTML files from `vite/template.html`
- Builds the extension via Rollup (with esbuild + node-externals plugins)
- In dev, injects HMR scripts into the HTML template

Bundle name is `plumber-event-layouts` (defined in `vite.config.mts`). The Vite dev server runs on port 8080 alongside the NodeCG runtime.

### Adding new panels or overlays

- Drop a `.tsx` file into `src/browser/dashboard/views/` for a new dashboard panel.
- Drop a `.tsx` file into `src/browser/graphics/views/` for a new graphics overlay.
- The build system auto-discovers them via glob — no registration required.

### Schema types

When adding a new Replicant to the extension, define its schema in `schemas/` (JSON Schema), then run `npm run generate-schema-types` to regenerate the TypeScript types.

## Code Style

Prettier is configured with tabs (width 2), single JSX quotes, trailing commas, 80-char width, and auto-organized imports. Run Prettier before committing.
