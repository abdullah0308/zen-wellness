"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoLockup } from "@/components/Logo";
import { Star } from "@/components/icons";

type Review = {
  id: number;
  category: "massage" | "coaching";
  name: string;
  rating: number;
  text: string;
  createdAt: string;
};

const inputCls =
  "w-full rounded-input border border-bone/12 bg-ink px-4 py-3 text-base text-bone placeholder:text-mist/60 outline-none transition-colors duration-150 focus:border-teal/70";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "massage" | "coaching">("all");

  async function unlock() {
    setError("");
    // Verify the password up front with a harmless DELETE on a non-existent id:
    // 401 means wrong password; 400/404 means the password was accepted.
    const check = await fetch("/api/reviews?id=0", {
      method: "DELETE",
      headers: { "x-admin-password": password },
    });
    if (check.status === 401) {
      setError("Wrong password.");
      return;
    }
    const res = await fetch("/api/reviews");
    const data = await res.json();
    setReviews(data.reviews ?? []);
    setUnlocked(true);
  }

  async function remove(id: number) {
    if (!confirm("Delete this review permanently?")) return;
    setBusy(id);
    setError("");
    const res = await fetch(`/api/reviews?id=${id}`, {
      method: "DELETE",
      headers: { "x-admin-password": password },
    });
    setBusy(null);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Delete failed.");
      return;
    }
    setReviews((prev) => prev.filter((r) => r.id !== id));
  }

  const shown = filter === "all" ? reviews : reviews.filter((r) => r.category === filter);

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-12">
      <div className="flex items-center justify-between">
        <Link href="/" aria-label="Zen Wellness, home">
          <LogoLockup compact />
        </Link>
        <span className="text-sm text-mist">Review admin</span>
      </div>

      {!unlocked ? (
        <div className="panel mx-auto mt-24 max-w-sm p-8">
          <h1 className="h-section text-xl text-bone">Owner access</h1>
          <p className="mt-2 text-sm text-mist">
            Enter the admin password to manage reviews.
          </p>
          <label htmlFor="admin-password" className="sr-only">
            Admin password
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && unlock()}
            placeholder="Admin password"
            aria-describedby={error ? "admin-error" : undefined}
            className={`${inputCls} mt-5`}
          />
          {error && (
            <p id="admin-error" role="alert" className="mt-3 text-sm text-red-300">
              {error}
            </p>
          )}
          <button
            type="button"
            onClick={unlock}
            className="mt-4 w-full rounded-full bg-teal px-6 py-3 text-sm font-semibold text-ink transition-colors duration-150 hover:bg-teal-bright active:scale-[0.98]"
          >
            Unlock
          </button>
        </div>
      ) : (
        <div className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="h-section text-2xl text-bone">
              {reviews.length} review{reviews.length === 1 ? "" : "s"}
            </h1>
            <div className="flex gap-2">
              {(["all", "massage", "coaching"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={`rounded-full px-4 py-1.5 text-sm capitalize transition-colors duration-150 ${
                    filter === f
                      ? "bg-teal font-semibold text-ink"
                      : "border border-bone/15 text-mist hover:text-bone"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p role="alert" className="mt-4 text-sm text-red-300">
              {error}
            </p>
          )}

          <div className="mt-6 space-y-4">
            {shown.length === 0 && (
              <p className="rounded-[20px] border border-dashed border-bone/15 p-8 text-center text-sm text-mist">
                No reviews here.
              </p>
            )}
            {shown.map((r) => (
              <article
                key={r.id}
                className="panel flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-teal/12 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-teal">
                      {r.category}
                    </span>
                    <span
                      className="inline-flex gap-0.5"
                      aria-label={`${r.rating} out of 5 stars`}
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          weight={n <= r.rating ? "fill" : "regular"}
                          aria-hidden="true"
                          className={`h-3.5 w-3.5 ${
                            n <= r.rating ? "text-teal" : "text-bone/25"
                          }`}
                        />
                      ))}
                    </span>
                    <span className="text-sm font-semibold text-bone">{r.name}</span>
                    <span className="text-xs text-mist">
                      {new Date(r.createdAt).toLocaleDateString("en-GB")}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{r.text}</p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(r.id)}
                  disabled={busy === r.id}
                  className="shrink-0 whitespace-nowrap rounded-full border border-red-400/40 px-4 py-1.5 text-sm text-red-300 transition-colors duration-150 hover:border-red-400 hover:bg-red-400/10 disabled:opacity-50"
                >
                  {busy === r.id ? "Deleting" : "Delete"}
                </button>
              </article>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
