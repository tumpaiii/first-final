# FORGE — First-Time Founders Conference

Next.js 14 App Router, TypeScript, Tailwind CSS, shadcn-compatible button/badge/card, Framer Motion, Lucide React, clsx and tailwind-merge.

## Run in VS Code

Open this folder (the one containing package.json). Use Node.js 20 or later.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Production: `npm run build`, then `npm start`.

## Files

- `app/`: page, layout and global styling.
- `components/all-components/`: individual website sections, in the approved page order.
- `components/ui/`: button, badge, card and Framer Motion scroll reveal.
- `lib/utils.ts`: cn() helper.
- `lib/conference-effects.js`: gallery, counters, pinned scenes, tabs, pricing, FAQ and registration review, with cleanup.
- `src/assets/images/`, `src/assets/videos/`, `src/assets/icons/`: all source media. Photos/videos are imported as modules; Next emits deployment files automatically.
- `MEDIA-SOURCES.md`: free stock media sources and licenses.

IBM Plex Sans and the approved blue palette are retained. Reduced-motion preferences are respected. Registration reviews entered details locally; it does not process payments or create bookings. Proposed speaker profiles use illustrative portraits. Connect a registration/payment service before accepting bookings.

Upload this folder's contents to GitHub, including package.json, package-lock.json, app, components, lib, types and src. Exclude node_modules, .next, and out. Preserve Next.js App Router when importing into AI Studio. Do not convert to Vite or copy a previous .next directory.
