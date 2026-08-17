# Zen Wellness - Website

Website for Zen Wellness: mobile massage & personal coaching in Mauritius.
Next.js (App Router) + Tailwind CSS v4, dark teal brand theme, WhatsApp-first
booking, and a self-hosted review system.

## Pages

| Route | What it is |
|---|---|
| `/` | Gateway - visitor picks Massage or Personal Coaching |
| `/massage` | Massage landing page (Sport, Relaxation, Deep Tissue, Recovery) |
| `/coaching` | Coaching landing page (Fat Loss, Muscle Building, Endurance, Rehabilitation) |
| `/admin` | Owner-only review moderation (password protected, not indexed) |
| `/api/reviews` | Reviews API — GET list, POST create, DELETE (admin) |

## Design system

Typography, colour and shape are defined once in
[app/globals.css](app/globals.css) and used everywhere.

| Token group | Where | Notes |
|---|---|---|
| Colour | `:root` in `app/globals.css` | One accent (`--teal`, the original brand colour) against a warm-dark ground. `--bone` is the warm off-white for text. |
| Type | `app/layout.tsx` | Bricolage Grotesque (display) + Instrument Sans (body/UI), both variable, both self-hosted via `next/font`. Emphasis is same-family italic (`.em-italic`), never a third face. |
| Shape | `--r-card` / `--r-input` | Buttons are full-pill, cards and media frames 20px, inputs 12px. One system, no exceptions. |
| Photo grading | `.img-frame` and modifiers | Pushes every photo toward the brand teal so unrelated stock reads as one set. |

Two rules worth knowing before editing the CSS:

- **Custom classes must stay inside `@layer base` or `@layer components`.**
  Unlayered CSS outranks every Tailwind layer, so an unlayered
  `.img-frame { position: relative }` will silently beat `lg:absolute` in your
  markup.
- **The hero photo fades out with a `mask-image`, not a dark gradient on top.**
  Painting the page colour over the image leaves a visible seam, because the
  background behind it is a gradient rather than a flat fill.

The left-edge progress rail (`components/SpineRail.tsx`) is the page's
signature element: the logo's six dots are vertebrae, and the rail applies that
idea at page scale. It only appears above 1600px, where there is a real gutter
for it to sit in.

## Photography

Photos live in `assets/photos/` and are statically imported through
[lib/images.ts](lib/images.ts), which also records the Unsplash id each one came
from. They are committed rather than hotlinked so the site does not depend on a
third party at request time.

**These are stock stand-ins.** Replace them with real photographs of the actual
therapist and real sessions before treating the site as final. The shot list:

| Slot | What to shoot |
|---|---|
| `massage-hero` | Therapist's hands mid-treatment on a client's back. Vertical, soft natural light. |
| `massage-detail` | Oil being poured or warmed in the hands, close crop. |
| `massage-at-home` | The table set up in a client's living space, or hands with oil in low light. |
| `coaching-hero` | Client mid-effort, cropped tight on the working body rather than the face. |
| `coaching-detail` | Equipment being handled, low light. |
| `at-home` | A session in progress in a real home or garden. |
| `island` | Wide Mauritius landscape, used only as a dark background texture. |

When adding an image, **look at it before committing it**. A guessed Unsplash id
either 404s or returns something unrelated to what you expected.

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
  page — no login. Reviews are stored in **Neon Postgres** and appear
  immediately.
- Spam protection: server-side validation + a hidden honeypot field that
  silently discards bot submissions.
- **Moderation:** open `/admin`, enter the admin password, delete anything.

### Database

Storage lives behind three functions in [lib/reviews.ts](lib/reviews.ts)
(`listReviews`, `addReview`, `deleteReview`). Nothing else in the app touches
the database, so swapping providers means rewriting that one file.

The driver talks to Neon over HTTP rather than the Postgres wire protocol, so
there is no connection pool to exhaust when a burst of serverless invocations
starts at once. **Use the pooled connection string** — the host contains
`-pooler`.

Set up (or reset) the schema with:

```bash
node --env-file=.env.local scripts/db-setup.mjs
```

That script is the only place DDL lives; the app never issues it, so no request
pays for a `CREATE TABLE` round trip on a cold start.

### Environment variables

```
# .env.local — gitignored, never commit it
DATABASE_URL='postgresql://…-pooler…neon.tech/neondb?sslmode=require'
ADMIN_PASSWORD=choose-something-strong
```

⚠️ `ADMIN_PASSWORD` falls back to `zen-admin` when unset. Change it before
going live.

In production both variables must be set in the host's environment. On Vercel
they are configured for Production, Preview and Development. Note that Preview
values can be scoped per Git branch — if a new branch's preview returns errors
on `/api/reviews`, it is probably missing `DATABASE_URL`.

## Editing common things

| What | Where |
|---|---|
| Phone / WhatsApp number | [lib/site.ts](lib/site.ts) (`PHONE_DISPLAY`, `WHATSAPP_NUMBER`) |
| Services & descriptions (both verticals) | [lib/site.ts](lib/site.ts) (`MASSAGE_SERVICES`, `COACHING_SERVICES`) |
| Brand colours | [app/globals.css](app/globals.css) (`:root` variables) |
| Review storage | [lib/reviews.ts](lib/reviews.ts) + `scripts/db-setup.mjs` |
| Page copy (hero, chips, headings) | [app/massage/page.tsx](app/massage/page.tsx), [app/coaching/page.tsx](app/coaching/page.tsx) |
| Gateway cards | [app/page.tsx](app/page.tsx) |
| Section components | `components/` — shared by both verticals via props |
| Photographs | `assets/photos/` + [lib/images.ts](lib/images.ts) |
| Typefaces | [app/layout.tsx](app/layout.tsx) (`next/font/google`) |
| Icons | [components/icons.tsx](components/icons.tsx) — re-exports Phosphor; add new glyphs there |

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

Deployed on **Vercel**, connected to this GitHub repo: pushes to `main` go to
production, other branches get a preview deployment.

Reviews live in Neon rather than on disk, so the ephemeral serverless
filesystem is no longer a problem. Any Node host works — just set
`DATABASE_URL` and `ADMIN_PASSWORD` in its environment.
