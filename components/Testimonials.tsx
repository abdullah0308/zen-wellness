"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Category } from "@/lib/site";
import { Quotes, Star } from "./icons";

type Review = {
  id: number;
  category: Category;
  name: string;
  rating: number;
  text: string;
  createdAt: string;
};

const inputCls =
  "w-full rounded-input border border-bone/12 bg-ink px-4 py-3 text-base text-bone placeholder:text-mist/60 outline-none transition-colors duration-150 focus:border-teal/70";

function Stars({ value, className = "h-4 w-4" }: { value: number; className?: string }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          weight={n <= value ? "fill" : "regular"}
          className={`${className} ${n <= value ? "text-teal" : "text-bone/25"}`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

const VISIBLE_COUNT = 5;

export function Testimonials({ category }: { category: Category }) {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [showAll, setShowAll] = useState(false);

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
        setErrorMsg(data.error ?? "That did not save. Please try again.");
        return;
      }
      if (data.review) setReviews((prev) => [data.review, ...(prev ?? [])]);
      setStatus("done");
      setName("");
      setText("");
      setRating(5);
    } catch {
      setStatus("error");
      setErrorMsg("That did not save. Check your connection and try again.");
    }
  }

  const average =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : null;
  const visible = reviews ? (showAll ? reviews : reviews.slice(0, VISIBLE_COUNT)) : [];

  return (
    <section
      id="reviews"
      className="mx-auto max-w-[1400px] scroll-mt-24 px-5 py-24 lg:px-8 lg:py-32"
    >
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* ---- left: heading, score, action ---- */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="h-section text-[clamp(2rem,4.5vw,3.25rem)] text-bone">
            What clients <span className="em-italic">say</span>
          </h2>

          {average !== null && (
            <div className="mt-6 flex items-center gap-3">
              <Stars value={Math.round(average)} className="h-5 w-5" />
              <p className="text-sm text-mist">
                <span className="text-base font-semibold text-bone">
                  {average.toFixed(1)}
                </span>{" "}
                out of 5 from {reviews!.length} review
                {reviews!.length === 1 ? "" : "s"}
              </p>
            </div>
          )}

          <p className="mt-5 max-w-sm leading-relaxed text-mist">
            Every review here was left by a real client, unedited.
          </p>

          <button
            type="button"
            onClick={() => {
              setFormOpen((v) => !v);
              setStatus("idle");
            }}
            aria-expanded={formOpen}
            aria-controls="review-form"
            className="mt-7 whitespace-nowrap rounded-full border border-teal/40 px-6 py-3 text-sm font-semibold text-teal transition-all duration-150 hover:border-teal hover:text-teal-bright active:scale-[0.98]"
          >
            {formOpen ? "Close" : "Leave a review"}
          </button>
        </div>

        {/* ---- right: the reviews ---- */}
        <div>
          {formOpen && (
            <form
              id="review-form"
              onSubmit={submit}
              className="panel mb-10 p-6 sm:p-8"
            >
              {status === "done" ? (
                <div className="py-6 text-center">
                  <p className="h-section text-2xl text-bone">Thank you</p>
                  <p className="mt-2 text-sm text-mist">
                    Your review is live. We appreciate you taking the time.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="rv-name"
                        className="mb-2 block text-sm font-medium text-bone"
                      >
                        Your name
                      </label>
                      <input
                        id="rv-name"
                        required
                        minLength={2}
                        maxLength={60}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Sarah P."
                        className={inputCls}
                      />
                    </div>

                    <fieldset>
                      <legend className="mb-2 block text-sm font-medium text-bone">
                        Your rating
                      </legend>
                      <div
                        className="flex items-center gap-1"
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setRating(n)}
                            onMouseEnter={() => setHoverRating(n)}
                            aria-label={`${n} star${n === 1 ? "" : "s"}`}
                            aria-pressed={n === rating}
                            className="flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-150 hover:scale-110"
                          >
                            <Star
                              weight={n <= (hoverRating || rating) ? "fill" : "regular"}
                              className={`h-7 w-7 ${
                                n <= (hoverRating || rating)
                                  ? "text-teal"
                                  : "text-bone/25"
                              }`}
                              aria-hidden="true"
                            />
                          </button>
                        ))}
                      </div>
                    </fieldset>
                  </div>

                  {/* honeypot, hidden from real users */}
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

                  <div className="mt-5">
                    <label
                      htmlFor="rv-text"
                      className="mb-2 block text-sm font-medium text-bone"
                    >
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
                      aria-describedby={status === "error" ? "rv-error" : undefined}
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  {status === "error" && (
                    <p id="rv-error" role="alert" className="mt-3 text-sm text-red-300">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-6 whitespace-nowrap rounded-full bg-teal px-7 py-3 text-sm font-semibold text-ink transition-all duration-150 hover:bg-teal-bright active:scale-[0.98] disabled:opacity-60"
                  >
                    {status === "sending" ? "Publishing" : "Publish review"}
                  </button>
                </>
              )}
            </form>
          )}

          {reviews === null ? (
            /* Skeleton matches the shape of a real review row, so nothing
               shifts when the data lands. */
            <ul className="divide-y divide-bone/8" aria-busy="true">
              {[0, 1, 2].map((i) => (
                <li key={i} className="py-7 first:pt-0">
                  <div className="h-4 w-24 rounded bg-bone/8" />
                  <div className="mt-4 h-3 w-full rounded bg-bone/8" />
                  <div className="mt-2 h-3 w-4/5 rounded bg-bone/8" />
                  <div className="mt-4 h-3 w-32 rounded bg-bone/8" />
                </li>
              ))}
            </ul>
          ) : reviews.length === 0 ? (
            <div className="rounded-[20px] border border-dashed border-teal/25 bg-teal/[0.04] p-10 text-center">
              <Quotes className="mx-auto h-8 w-8 text-teal" weight="regular" />
              <p className="h-section mt-4 text-2xl text-bone">Be the first</p>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-mist">
                No reviews yet. If you have had a session with us, we would love to
                hear how it went.
              </p>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-bone/8">
                {visible.map((review) => (
                  <li key={review.id} className="py-7 first:pt-0">
                    <Stars value={review.rating} />
                    <blockquote className="mt-4 text-lg leading-relaxed text-bone/90">
                      {review.text}
                    </blockquote>
                    <footer className="mt-4 flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-teal/15 text-sm font-semibold uppercase text-teal"
                      >
                        {review.name.trim().charAt(0)}
                      </span>
                      <p className="text-sm text-mist">
                        <span className="font-semibold text-bone">{review.name}</span>
                        <span className="mx-2 text-mist/40">/</span>
                        {formatDate(review.createdAt)}
                      </p>
                    </footer>
                  </li>
                ))}
              </ul>

              {reviews.length > VISIBLE_COUNT && (
                <button
                  type="button"
                  onClick={() => setShowAll((v) => !v)}
                  className="mt-8 text-sm font-semibold text-teal transition-colors duration-150 hover:text-teal-bright"
                >
                  {showAll ? "Show fewer" : `Show all ${reviews.length} reviews`}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
