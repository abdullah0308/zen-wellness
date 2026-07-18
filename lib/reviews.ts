import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";

export type Review = {
  id: number;
  category: "massage" | "coaching";
  name: string;
  rating: number;
  text: string;
  createdAt: string;
};

// One connection per process; module scope is cached across requests.
const dataDir = path.join(process.cwd(), "data");
mkdirSync(dataDir, { recursive: true });
const db = new DatabaseSync(path.join(dataDir, "reviews.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL CHECK (category IN ('massage','coaching')),
    name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    text TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  )
`);

type Row = {
  id: number;
  category: string;
  name: string;
  rating: number;
  text: string;
  created_at: string;
};

function toReview(r: Row): Review {
  return {
    id: r.id,
    category: r.category as Review["category"],
    name: r.name,
    rating: r.rating,
    text: r.text,
    createdAt: r.created_at,
  };
}

export function listReviews(category?: "massage" | "coaching"): Review[] {
  const rows = category
    ? db
        .prepare("SELECT * FROM reviews WHERE category = ? ORDER BY id DESC")
        .all(category)
    : db.prepare("SELECT * FROM reviews ORDER BY id DESC").all();
  return (rows as Row[]).map(toReview);
}

export function addReview(input: {
  category: "massage" | "coaching";
  name: string;
  rating: number;
  text: string;
}): Review {
  const result = db
    .prepare("INSERT INTO reviews (category, name, rating, text) VALUES (?, ?, ?, ?)")
    .run(input.category, input.name, input.rating, input.text);
  const row = db
    .prepare("SELECT * FROM reviews WHERE id = ?")
    .get(Number(result.lastInsertRowid)) as Row;
  return toReview(row);
}

export function deleteReview(id: number): boolean {
  const result = db.prepare("DELETE FROM reviews WHERE id = ?").run(id);
  return result.changes > 0;
}
