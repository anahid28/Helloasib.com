# helloasib.com — Asib Uz Zaman portfolio

Next.js (App Router) · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Lenis

## Run locally
    npm install
    npm run dev        # http://localhost:3000

## Edit content
Everything you'll want to change lives in `lib/content.ts`:
- `site.email`, `site.socials` — placeholders, replace with your real details
- `projects` — placeholder case studies (marked `placeholder: true`); set to false once real
- `expertise`, `leadership`, `playground`

Mood palettes: `lib/themes.ts` + the matching blocks at the top of `app/globals.css`.
Earlier job history: `sections/About.tsx` ("Earlier roles").
Swap a placeholder visual for a real image by replacing `<PlaceholderArt …/>` with `<img>` / `next/image`.

## Deploy to helloasib.com
**Vercel (recommended):** push this folder to GitHub → vercel.com → Import → Deploy.
Then Project → Settings → Domains → add `helloasib.com`, and add the DNS records Vercel shows at your domain registrar.

**Any other host (cPanel, Netlify, etc.):** `npm run build` creates a static site in `out/`.
Upload the contents of `out/` to your host's public folder (e.g. `public_html`).
