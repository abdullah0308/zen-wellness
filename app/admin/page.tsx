"use client";

import { useState } from "react";
import { LogoLockup } from "@/components/Logo";
import { StarIcon } from "@/components/icons";

type Review = {
  id: number;
  category: "massage" | "coaching";
  name: string;
  rating: number;
  text: string;
  createdAt: string;
};

const inputCls =
  "w-full rounded-xl border border-foam/10 bg-ink px-4 py-3 text-sm text-foam placeholder:text-mist/50 outline-none transition-colors focus:border-teal/60 focus:ring-2 focus:ring-teal/20";

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
        <a href="/">
          <LogoLockup compact />
        </a>
        <span className="font-display text-sm uppercase tracking-[0.3em] text-mist">
          Review admin
        </span>
      </div>

      {!unlocked ? (
        <div className="mx-auto mt-24 max-w-sm rounded-3xl border border-foam/[0.08] bg-ink-2 p-8">
          <h1 className="font-display text-xl font-semibold uppercase tracking-wide text-foam">
            Owner access
          </h1>
          <p className="mt-2 text-sm text-mist">
            Enter the admin password to manage reviews.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && unlock()}
            placeholder="Admin password"
            className={`${inputCls} mt-5`}
          />
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
          <button
            onClick={unlock}
            className="mt-4 w-full rounded-full bg-teal px-6 py-3 font-display text-sm font-medium uppercase tracking-wider text-ink transition-colors hover:bg-teal-bright"
          >
            Unlock
          </button>
        </div>
      ) : (
        <div className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="font-display text-2xl font-semibold uppercase tracking-wide text-foam">
              {reviews.length} review{reviews.length === 1 ? "" : "s"}
            </h1>
            <div className="flex gap-2">
              {(["all", "massage", "coaching"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-4 py-1.5 text-sm capitalize transition-colors ${
                    filter === f
                      ? "bg-teal text-ink font-semibold"
                      : "border border-foam/15 text-mist hover:text-foam"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

          <div className="mt-6 space-y-4">
            {shown.length === 0 && (
              <p className="rounded-2xl border border-dashed border-foam/15 p-8 text-center text-sm text-mist">
                No reviews here.
              </p>
            )}
            {shown.map((r) => (
              <article
                key={r.id}
                className="flex flex-col gap-3 rounded-2xl border border-foam/[0.07] bg-ink-2 p-5 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-teal/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-teal">
                      {r.category}
                    </span>
                    <span className="inline-flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <StarIcon
                          key={n}
                          className={`h-3.5 w-3.5 ${n <= r.rating ? "text-teal" : "text-foam/15"}`}
                        />
                      ))}
                    </span>
                    <span className="text-sm font-semibold text-foam">{r.name}</span>
                    <span className="text-xs text-mist/60">
                      {new Date(r.createdAt).toLocaleDateString("en-GB")}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{r.text}</p>
                </div>
                <button
                  onClick={() => remove(r.id)}
                  disabled={busy === r.id}
                  className="shrink-0 rounded-full border border-red-400/40 px-4 py-1.5 text-sm text-red-400 transition-colors hover:border-red-400 hover:bg-red-400/10 disabled:opacity-50"
                >
                  {busy === r.id ? "Deleting…" : "Delete"}
                </button>
              </article>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
