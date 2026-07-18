"use client";

import { useState, type FormEvent } from "react";
import {
  whatsappLink,
  PHONE_DISPLAY,
  PHONE_TEL,
  type Service,
  type Category,
} from "@/lib/site";
import { WhatsAppIcon, PhoneIcon, CalendarIcon } from "./icons";

const inputCls =
  "w-full rounded-xl border border-foam/10 bg-ink px-4 py-3 text-sm text-foam placeholder:text-mist/50 outline-none transition-colors focus:border-teal/60 focus:ring-2 focus:ring-teal/20 [color-scheme:dark]";

export function BookingForm({
  category,
  services,
}: {
  category: Category;
  services: Service[];
}) {
  const [name, setName] = useState("");
  const [service, setService] = useState(services[0].name);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [area, setArea] = useState("");
  const [notes, setNotes] = useState("");

  const today = new Date().toISOString().split("T")[0];

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const details = [
      `• Name: ${name}`,
      `• ${category === "massage" ? "Service" : "Goal"}: ${service}`,
      date && `• Preferred date: ${date}`,
      time && `• Preferred time: ${time}`,
      area && `• Location: ${area}`,
      notes && `• Notes: ${notes}`,
    ].filter(Boolean);
    const message = `Hi Zen Wellness! I'd like to book a session:\n\n${details.join("\n")}`;
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="book" className="noise relative scroll-mt-24 overflow-hidden bg-ink-2 py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_100%,rgba(62,198,188,0.1),transparent_65%)]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="font-display text-sm font-medium uppercase tracking-[0.35em] text-teal">
            Book your slot today
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold uppercase leading-tight text-foam sm:text-5xl">
            Your body will <span className="text-teal">thank you</span>
          </h2>
          <p className="mt-4 max-w-md text-mist">
            Fill in the form and it opens WhatsApp with your booking details
            ready to send — or reach us directly:
          </p>

          <div className="mt-8 space-y-4">
            <a
              href={whatsappLink("Hi Zen Wellness! I'd like to book a session.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-foam/[0.07] bg-ink/60 p-4 transition-colors hover:border-teal/30"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                <WhatsAppIcon className="h-5.5 w-5.5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-mist">
                  WhatsApp us
                </span>
                <span className="font-display text-lg font-semibold text-foam">
                  {PHONE_DISPLAY}
                </span>
              </span>
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex items-center gap-4 rounded-2xl border border-foam/[0.07] bg-ink/60 p-4 transition-colors hover:border-teal/30"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                <PhoneIcon className="h-5.5 w-5.5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-mist">
                  Call us directly
                </span>
                <span className="font-display text-lg font-semibold text-foam">
                  {PHONE_DISPLAY}
                </span>
              </span>
            </a>
          </div>

          <p className="mt-8 font-script text-2xl text-teal-bright">
            Your body. Your journey. Our support.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-foam/[0.08] bg-ink/80 p-7 shadow-2xl shadow-black/30 sm:p-9"
        >
          <div className="mb-6 flex items-center gap-3">
            <CalendarIcon className="h-6 w-6 text-teal" />
            <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-foam">
              Request a booking
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="bk-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mist">
                Your name
              </label>
              <input
                id="bk-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah Payet"
                className={inputCls}
              />
            </div>

            <div>
              <label htmlFor="bk-service" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mist">
                {category === "massage" ? "Service" : "Your goal"}
              </label>
              <select
                id="bk-service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className={inputCls}
              >
                {services.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="bk-date" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mist">
                  Preferred date
                </label>
                <input
                  id="bk-date"
                  type="date"
                  min={today}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="bk-time" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mist">
                  Preferred time
                </label>
                <input
                  id="bk-time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <label htmlFor="bk-area" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mist">
                Your area / town
              </label>
              <input
                id="bk-area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g. Quatre Bornes"
                className={inputCls}
              />
            </div>

            <div>
              <label htmlFor="bk-notes" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mist">
                Anything we should know? <span className="normal-case text-mist/50">(optional)</span>
              </label>
              <textarea
                id="bk-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Injuries, focus areas, goals…"
                className={`${inputCls} resize-none`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-full bg-teal px-7 py-3.5 font-display text-base font-medium uppercase tracking-wider text-ink transition-all hover:bg-teal-bright hover:shadow-xl hover:shadow-teal/25"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Send via WhatsApp
          </button>
          <p className="mt-3 text-center text-xs text-mist/60">
            Opens WhatsApp with your details pre-filled — nothing is sent until
            you press send.
          </p>
        </form>
      </div>
    </section>
  );
}
