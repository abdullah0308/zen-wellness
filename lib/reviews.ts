import { neon } from "@neondatabase/serverless";

/**
 * Review storage, backed by Neon Postgres.
 *
 * This used to be SQLite on local disk, which cannot work on Vercel: the
 * filesystem is ephemeral and not shared between instances, so reviews
 * disappeared on the next deploy and were invisible to other instances in the
 * meantime.
 *
 * The driver talks to Neon over HTTP rather than the Postgres wire protocol,
 * so there is no connection pool to exhaust when many serverless invocations
 * start at once. Use the pooled connection string (host contains "-pooler").
 *
 * Schema lives in scripts/db-setup.mjs and is applied out of band, so no
 * request pays for DDL.
 */

export type Category = "massage" | "coaching";

export type Review = {
  id: number;
  category: Category;
  name: string;
  rating: number;
  text: string;
  createdAt: string;
};

type Row = {
  id: number;
  category: string;
  name: string;
  rating: number;
  text: string;
  created_at: Date | string;
};

/**
 * Resolved per call rather than at module scope: reading the env var at import
 * time throws during `next build`, which imports this module to collect page
 * data before any request has a runtime environment.
 */
function db() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local for local development, " +
        "and to the project's environment variables in production."
    );
  }
  return neon(url);
}

function toReview(row: Row): Review {
  return {
    id: row.id,
    category: row.category as Category,
    name: row.name,
    rating: row.rating,
    text: row.text,
    // The client formats this, so hand it a stable ISO string rather than
    // whatever shape the driver decided to return.
    createdAt:
      row.created_at instanceof Date
        ? row.created_at.toISOString()
        : new Date(row.created_at).toISOString(),
  };
}

export async function listReviews(category?: Category): Promise<Review[]> {
  const sql = db();
  const rows = category
    ? await sql`SELECT * FROM reviews WHERE category = ${category} ORDER BY id DESC`
    : await sql`SELECT * FROM reviews ORDER BY id DESC`;
  return (rows as Row[]).map(toReview);
}

export async function addReview(input: {
  category: Category;
  name: string;
  rating: number;
  text: string;
}): Promise<Review> {
  const sql = db();
  const rows = await sql`
    INSERT INTO reviews (category, name, rating, text)
    VALUES (${input.category}, ${input.name}, ${input.rating}, ${input.text})
    RETURNING *
  `;
  return toReview((rows as Row[])[0]);
}

export async function deleteReview(id: number): Promise<boolean> {
  const sql = db();
  const rows = await sql`DELETE FROM reviews WHERE id = ${id} RETURNING id`;
  return (rows as unknown[]).length > 0;
}
