// Creates the reviews table in Neon. Safe to re-run.
//
//   node --env-file=.env.local scripts/db-setup.mjs
//
// Run once per database (local dev and production point at the same Neon
// project by default, so once is usually enough). The app itself never issues
// DDL - doing that on every cold start costs a round trip per invocation.

import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Pass --env-file=.env.local");
  process.exit(1);
}

const sql = neon(url);

await sql`
  CREATE TABLE IF NOT EXISTS reviews (
    id         SERIAL PRIMARY KEY,
    category   TEXT        NOT NULL CHECK (category IN ('massage', 'coaching')),
    name       TEXT        NOT NULL,
    rating     SMALLINT    NOT NULL CHECK (rating BETWEEN 1 AND 5),
    text       TEXT        NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

// The public list is always filtered by category and ordered newest first.
await sql`
  CREATE INDEX IF NOT EXISTS reviews_category_id_idx
    ON reviews (category, id DESC)
`;

const [{ count }] = await sql`SELECT count(*)::int AS count FROM reviews`;
console.log(`reviews table ready (${count} row${count === 1 ? "" : "s"})`);
