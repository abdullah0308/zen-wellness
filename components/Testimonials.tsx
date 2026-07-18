"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Category } from "@/lib/site";
import { StarIcon } from "./icons";

type Review = {
  id: number;
  category: Category;
  name: string;
  rating: number;
  text: string;
  createdAt: string;
};

const inputCls =
  "w-full rounded-xl border border-foam/10 bg-ink px-4 py-3 text-sm text-foam placeholder:text-mist/50 outline-none transition-colors focus:border-teal/60 focus:ring-2 focus:ring-teal/20";

function Stars({ value, className = "h-4 w-4" }: { value: number; className?: string }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon
          key={n}
          className={`${className} ${n <= value ? "text-teal" : "text-foam/15"}`}
        />
      ))}
    </span>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

const VISIBLE_COUNT = 6;

export function Testimonials({ category }: { category: Category }) {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [showAll, setShowAll] = useState(false);

  // form state
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetch(`/api/reviews?category=${category}`)
      .then((r) => r.json())
      .then((d) => setReviews(d.reviews ?? []))
      .catch(() => setReviews([]));
  }, [category]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, name, rating, text, website }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong — please try again.");
        return;
      }
      if (data.review) setReviews((prev) => [data.review, ...(prev ?? [])]);
      setStatus("done");
      setName("");
      setText("");
      setRating(5);
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong — please try again.");
    }
  }

  const average =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : null;
  const visible = reviews ? (showAll ? reviews : reviews.slice(0, VISIBLE_COUNT)) : [];

  return (
    <section id="reviews" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-display text-sm font-medium uppercase tracking-[0.35em] text-teal">
            Testimonials
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold uppercase leading-tight text-foam sm:text-5xl">
            What clients <span className="text-teal">say</span>
          </h2>
          {average !== null && (
            <p className="mt-4 flex items-center gap-3 text-mist">
              <Stars value={Math.round(average)} className="h-5 w-5" />
              <span>
                <span className="font-semibold text-foam">{average.toFixed(1)}</span> / 5 ·{" "}
                {reviews!.length} review{reviews!.length === 1 ? "" : "s"}
              </span>
            </p>
          )}
        </div>
        <button
          onClick={() => {
            setFormOpen((v) => !v);
            setStatus("idle");
          }}
          className="rounded-full border border-teal/40 px-6 py-3 font-display text-sm font-medium uppercase tracking-wider text-teal transition-all hover:border-teal hover:text-teal-bright"
        >
          {formOpen ? "Close" : "Leave a review"}
        </button>
      </div>

      {/* submit form */}
      {formOpen && (
        <form
          onSubmit={submit}
          className="mt-8 rounded-3xl border border-foam/[0.08] bg-ink-2 p-7 sm:p-8"
        >
          {status === "done" ? (
            <div className="py-6 text-center">
              <p className="font-script text-3xl text-teal-bright">Thank you!</p>
              <p className="mt-2 text-sm text-mist">
                Your review is now live — we really appreciate it.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="rv-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mist">
                    Your name
                  </label>
                  <input
                    id="rv-name"
                    required
                    minLength={2}
                    maxLength={60}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah P."
                    className={inputCls}
                  />
                </div>
                <div>
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mist">
                    Your rating
                  </span>
                  <div className="flex items-center gap-1 py-2" onMouseLeave={() => setHoverRating(0)}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setRating(n)}
                        onMouseEnter={() => setHoverRating(n)}
                        aria-label={`${n} star${n === 1 ? "" : "s"}`}
                        className="transition-transform hover:scale-110"
                      >
                        <StarIcon
                          className={`h-7 w-7 ${
                            n <= (hoverRating || rating) ? "text-teal" : "text-foam/15"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* honeypot — hidden from real users */}
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              <div className="mt-4">
                <label htmlFor="rv-text" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mist">
                  Your experience
                </label>
                <textarea
                  id="rv-text"
                  required
                  minLength={10}
                  maxLength={600}
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="How was your session? What changed for you?"
                  className={`${inputCls} resize-none`}
                />
              </div>

              {status === "error" && (
                <p className="mt-3 text-sm text-red-400">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-5 rounded-full bg-teal px-7 py-3 font-display text-sm font-medium uppercase tracking-wider text-ink transition-all hover:bg-teal-bright disabled:opacity-60"
              >
                {status === "sending" ? "Publishing…" : "Publish review"}
              </button>
            </>
          )}
        </form>
      )}

      {/* reviews grid */}
      <div className="mt-12">
        {reviews === null ? (
          <p className="text-sm text-mist/60">Loading reviews…</p>
        ) : reviews.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-teal/25 bg-teal/[0.03] p-10 text-center">
            <p className="font-script text-3xl text-teal-bright">Be the first!</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-mist">
              No reviews yet — if you&apos;ve had a session with us, we&apos;d
              love to hear how it went.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((r) => (
                <article
                  key={r.id}
                  className="flex h-full flex-col rounded-2xl border border-foam/[0.07] bg-ink-2 p-6"
                >
                  <Stars value={r.rating} />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-foam/90">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <footer className="mt-5 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal/15 font-display text-sm font-semibold uppercase text-teal">
                      {r.name.trim().charAt(0)}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-foam">{r.name}</span>
                      <span className="block text-xs text-mist/70">
                        {formatDate(r.createdAt)}
                      </span>
                    </span>
                  </footer>
                </article>
              ))}
            </div>
            {reviews.length > VISIBLE_COUNT && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowAll((v) => !v)}
                  className="text-sm font-semibold text-teal transition-colors hover:text-teal-bright"
                >
                  {showAll ? "Show fewer" : `Show all ${reviews.length} reviews`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
