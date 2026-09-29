# Ayush Yadav — Portfolio

Personal portfolio built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion · Lenis**, with a serverless contact API (**Zod** validation + **Resend** email).

Design direction — "engineer's signature": near-black with a blueprint dot grid, condensed Bricolage Grotesque headlines over Geist / Geist Mono, lime `#C8FF3E` with violet `#A58BFF`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts: `npm run build` (production build), `npm start` (serve the build), `npm run lint`.

## What's inside

| Where | What |
| --- | --- |
| `src/data/profile.ts` | **All copy, links, numbers and screenshot paths.** Edit this file to update the site. |
| `src/components/Boot.tsx` | One-second `npm run dev` boot intro (once per session, skipped for reduced motion) |
| `src/components/Hero.tsx` + `StackScene.tsx` | Headline + the 3D **exploded stack** (agents / interface / API / data planes that split apart on load and scroll, tilt toward the cursor, and pass a request packet down through the layers) |
| `src/components/Work.tsx` | **Pinned horizontal reel** of projects on desktop (vertical list on mobile) with real screenshots in browser frames |
| `src/components/Sections.tsx` | Experience as a **git log**, Toolbox as a `stack.json` file + marquee, Receipts (awards) and education |
| `src/components/Contact.tsx` | **Terminal-style** contact form + footer |
| `src/components/Cursor.tsx` | Trailing cursor ring that turns into a labelled disc over screenshots |
| `src/app/api/contact/route.ts` | `POST /api/contact` — Zod validation, honeypot, per-IP rate limit, sends via Resend |
| `src/app/opengraph-image.tsx` | Auto-generated link-preview image for LinkedIn/Slack/X |
| `public/work/` | Screenshots taken from each project's GitHub repo (WebP) |
| `public/Ayush_Yadav_Resume.pdf` | The résumé linked from the nav and buttons — replace to update |

Motion respects `prefers-reduced-motion` (boot intro, smooth scroll, 3D tilt, reel pinning, grain and reveals switch off).

## Contact form email (optional)

Without a key the form logs messages in dev and, in production, asks visitors to email you directly. To receive messages:

1. Create a free API key at [resend.com](https://resend.com).
2. Copy `.env.example` to `.env.local` and fill in `RESEND_API_KEY` (and optionally `CONTACT_TO_EMAIL`).
3. On Vercel, add the same variables under **Project → Settings → Environment Variables**.

Until you verify your own domain in Resend, keep the default sender (`onboarding@resend.dev`); it can only deliver to the email address on your Resend account.

## Deploy (Vercel)

1. Push this folder to a new GitHub repo.
2. Import it at [vercel.com/new](https://vercel.com/new) — no config needed.
3. Set `NEXT_PUBLIC_SITE_URL` to your final URL (used for SEO, sitemap and the preview image), plus the Resend variables if you want the form live.
