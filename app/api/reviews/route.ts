import { NextRequest, NextResponse } from "next/server";
import { addReview, deleteReview, listReviews } from "@/lib/reviews";

export const runtime = "nodejs";

const CATEGORIES = ["massage", "coaching"] as const;
type Category = (typeof CATEGORIES)[number];

function isCategory(v: unknown): v is Category {
  return typeof v === "string" && (CATEGORIES as readonly string[]).includes(v);
}

function adminPassword() {
  // Set ADMIN_PASSWORD in production (.env.local / host env vars).
  return process.env.ADMIN_PASSWORD ?? "zen-admin";
}

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category") ?? undefined;
  if (category !== undefined && !isCategory(category)) {
    return NextResponse.json({ error: "Unknown category" }, { status: 400 });
  }
  return NextResponse.json({ reviews: listReviews(category) });
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Pretend success for bots.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const text = typeof body.text === "string" ? body.text.trim() : "";
  const rating = Number(body.rating);

  if (!isCategory(body.category)) {
    return NextResponse.json({ error: "Unknown category" }, { status: 400 });
  }
  if (name.length < 2 || name.length > 60) {
    return NextResponse.json(
      { error: "Please enter your name (2–60 characters)." },
      { status: 400 }
    );
  }
  if (text.length < 10 || text.length > 600) {
    return NextResponse.json(
      { error: "Please write a review of 10–600 characters." },
      { status: 400 }
    );
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating must be 1–5." }, { status: 400 });
  }

  const review = addReview({ category: body.category, name, rating, text });
  return NextResponse.json({ ok: true, review }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const provided = request.headers.get("x-admin-password") ?? "";
  if (provided !== adminPassword()) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }
  const id = Number(request.nextUrl.searchParams.get("id"));
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const removed = deleteReview(id);
  if (!removed) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
