# Zen Wellness — Website

Website for Zen Wellness: mobile massage & personal coaching in Mauritius.
Next.js (App Router) + Tailwind CSS v4, dark teal brand theme, pure-SVG
branding, WhatsApp-first booking, and a self-hosted review system.

## Pages

| Route | What it is |
|---|---|
| `/` | Gateway — visitor picks Massage or Personal Coaching |
| `/massage` | Massage landing page (Sport, Relaxation, Deep Tissue, Recovery) |
| `/coaching` | Coaching landing page (Fat Loss, Muscle Building, Endurance, Rehabilitation) |
| `/admin` | Owner-only review moderation (password protected, not indexed) |
| `/api/reviews` | Reviews API — GET list, POST create, DELETE (admin) |

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

## Reviews

- Clients submit reviews from the **Testimonials** section on either landing
  page — no login. Reviews are stored in SQLite at `data/reviews.db`
  (auto-created, git-ignored) and appear immediately.
- Spam protection: server-side validation + a hidden honeypot field that
  silently discards bot submissions.
- **Moderation:** open `/admin`, enter the admin password, delete anything.
- **Password:** set `ADMIN_PASSWORD` in `.env.local` (or your host's env
  vars). ⚠️ If unset it falls back to `zen-admin` — change this before
  going live:

  ```
  # .env.local
  ADMIN_PASSWORD=choose-something-strong
  ```

## Editing common things

| What | Where |
|---|---|
| Phone / WhatsApp number | [lib/site.ts](lib/site.ts) (`PHONE_DISPLAY`, `WHATSAPP_NUMBER`) |
| Services & descriptions (both verticals) | [lib/site.ts](lib/site.ts) (`MASSAGE_SERVICES`, `COACHING_SERVICES`) |
| Brand colours | [app/globals.css](app/globals.css) (`:root` variables) |
| Page copy (hero, chips, headings) | [app/massage/page.tsx](app/massage/page.tsx), [app/coaching/page.tsx](app/coaching/page.tsx) |
| Gateway cards | [app/page.tsx](app/page.tsx) |
| Section components | `components/` — shared by both verticals via props |

## How booking works

No booking backend. Every CTA opens WhatsApp (`wa.me/23058148138`) with a
pre-filled message; the booking form composes the message from its fields.
Nothing is sent until the visitor presses send in WhatsApp.

## Verification scripts

With the site running on port 3100 (`npm run start -- -p 3100`):

- `node scripts/screenshot.mjs` — captures every page/section (desktop +
  mobile) using the installed Chrome via puppeteer-core.
- `node scripts/review-test.mjs` — full end-to-end review flow through the
  real UI: submit on /coaching → verify it renders → unlock /admin →
  delete → verify gone.
- `node scripts/form-test.mjs` — fills the booking form headlessly and
  prints the WhatsApp URL it would open.

## Deploy

Needs a Node host with a **persistent disk** for `data/reviews.db`
(Railway, Render with a disk, a VPS, etc.). Serverless platforms like
Vercel won't persist the SQLite file between deploys/instances — if you
want Vercel, swap `lib/reviews.ts` for a hosted DB (e.g. Turso/Supabase);
the rest of the code doesn't change.
