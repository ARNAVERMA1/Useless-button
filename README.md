# THE EXTREMELY IMPORTANT BUTTON™

A completely self-contained web experience by **Extremely Important Technologies**.
There is one gigantic, beautiful button. It is extremely important. You are never told why.

Every press triggers a different (mostly harmless) corporate event: congratulations,
fake progress reports, meaningless statistic increases, tiny celebrations, fictional
employee notifications, ticket numbers, fake processing screens, executive approvals,
polite warnings, total silence, and — very rarely — a **SYSTEM BREAKTHROUGH**.

## Features

- Giant animated button with ripple, glow, haptic feedback, and generated (no audio
  files) Web Audio sound effects
- Light / dark / system theme, with a reduce-motion setting
- Session and lifetime statistics, persisted with `localStorage`
- Fake executive performance dashboard (KPIs + sparklines + canvas charts)
- Scrolling activity log with an audit trail
- Random achievements, including hidden Easter eggs (Konami code, long-press,
  typing "synergy", numerological milestones, and more)
- "Share your performance" card (download as PNG, copy summary, native share)
- A completely unnecessary settings panel, including a "corporate jargon intensity"
  slider and a data export/reset feature

## Tech

Plain HTML / CSS / vanilla JavaScript. No build step, no backend, no login, no
external APIs or CDNs — everything (fonts, audio, charts, confetti) is generated
client-side.

```
index.html
css/styles.css
js/app.js
netlify.toml
```

## Run locally

Just open `index.html` in a browser, or serve the folder statically, e.g.:

```bash
npx serve .
```

## Deploy to Netlify

This repo is ready to deploy as-is:

1. Push to GitHub (already done).
2. In Netlify: **Add new site → Import an existing project**, pick this repo.
3. Build command: *(none)*. Publish directory: `.` (already configured in
   `netlify.toml`).
4. Deploy. There is nothing else to configure — no environment variables, no
   functions, no database.

---

© 2026 Extremely Important Technologies. All decisions are final.
