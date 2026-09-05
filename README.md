# weli.codes — v2

Personal portfolio of Welli Irawan, System Administrator. Single-page Vite + React site, dark ops-editorial design ("Steady State").

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs dist/
npm run preview   # serve the production build
```

## Deploy (replaces the current weli.codes)

The domain is already on Vercel (project "welireact"). Two options:

**Option A — new repo (recommended):**
1. Push this folder to GitHub: `gh repo create weli-codes --public --source . --push`
2. In the Vercel dashboard, point the existing project (or a new one) at the repo; framework preset "Vite". Attach the `weli.codes` domain.

**Option B — CLI deploy:** `npx vercel --prod` from this folder and attach the domain.

## Notes

- `__BUILD_DATE__` (footer "last updated" stamp) is injected at build time in `vite.config.js` — never hardcode it.
- The CV button intentionally doesn't exist yet. To add it: drop `Welli-Irawan-CV.pdf` into `public/`, then follow the "CV rule" comments in `src/App.jsx` (swap the Email primary buttons for Download CV and add the CV contact row).
- Project screenshots live in `public/assets/`. The Automation project is deliberately text-only — never give it a decorative/AI-looking graphic.
- All copy lives in `src/data.js`.
