"use client";

import { useState, type FormEvent } from "react";
import {
  whatsappLink,
  PHONE_DISPLAY,
  PHONE_TEL,
  type Service,
  type Category,
} from "@/lib/site";
import { CalendarBlank, Phone, WhatsappLogo } from "./icons";

/**
 * Labels sit above their field, inputs are 16px so iOS does not zoom on focus,
 * and every label is bone rather than muted grey so it clears AA against the
 * panel it sits on.
 */
const inputCls =
  "w-full rounded-input border border-bone/12 bg-ink px-4 py-3 text-base text-bone placeholder:text-mist/60 outline-none transition-colors duration-150 focus:border-teal/70 [color-scheme:dark]";

const labelCls = "mb-2 block text-sm font-medium text-bone";

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
      `- Name: ${name}`,
      `- ${category === "massage" ? "Service" : "Goal"}: ${service}`,
      date && `- Preferred date: ${date}`,
      time && `- Preferred time: ${time}`,
      area && `- Location: ${area}`,
      notes && `- Notes: ${notes}`,
    ].filter(Boolean);
    const message = `Hi Zen Wellness! I'd like to book a session:\n\n${details.join("\n")}`;
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  }

  return (
    <section
      id="book"
      className="noise relative scroll-mt-24 overflow-hidden bg-ink-2 py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_100%,rgba(62,198,188,0.1),transparent_65%)]"
      />

      <div className="relative mx-auto grid max-w-[1400px] items-start gap-12 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div className="lg:pt-6">
          <h2 className="h-section text-[clamp(2rem,4.5vw,3.25rem)] text-bone">
            Your body will <span className="em-italic">thank you</span>
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-mist">
            Fill in the form and it opens WhatsApp with your booking details ready to
            send. Or reach us directly:
          </p>

          <div className="mt-9 space-y-3">
            <a
              href={whatsappLink("Hi Zen Wellness! I'd like to book a session.")}
              target="_blank"
              rel="noopener noreferrer"
              className="panel flex items-center gap-4 p-4 transition-colors duration-150 hover:border-teal/30"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal/12 text-teal">
                <WhatsappLogo className="h-5 w-5" weight="regular" />
              </span>
              <span>
                <span className="block text-sm text-mist">WhatsApp us</span>
                <span className="font-display text-lg font-semibold text-bone">
                  {PHONE_DISPLAY}
                </span>
              </span>
            </a>

            <a
              href={`tel:${PHONE_TEL}`}
              className="panel flex items-center gap-4 p-4 transition-colors duration-150 hover:border-teal/30"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal/12 text-teal">
                <Phone className="h-5 w-5" weight="regular" />
              </span>
              <span>
                <span className="block text-sm text-mist">Call us directly</span>
                <span className="font-display text-lg font-semibold text-bone">
                  {PHONE_DISPLAY}
                </span>
              </span>
            </a>
          </div>

          <p className="mt-9 text-lg italic text-teal-bright">
            Your body. Your journey. Our support.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="panel-raised p-6 sm:p-9">
          <div className="mb-7 flex items-center gap-3">
            <CalendarBlank className="h-6 w-6 text-teal" weight="regular" />
            <h3 className="h-section text-xl text-bone">Request a booking</h3>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="bk-name" className={labelCls}>
                Your name
              </label>
              <input
                id="bk-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sarah Payet"
                className={inputCls}
              />
            </div>

            <div>
              <label htmlFor="bk-service" className={labelCls}>
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

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="bk-date" className={labelCls}>
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
                <label htmlFor="bk-time" className={labelCls}>
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
              <label htmlFor="bk-area" className={labelCls}>
                Your area or town
              </label>
              <input
                id="bk-area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Quatre Bornes"
                className={inputCls}
              />
            </div>

            <div>
              <label htmlFor="bk-notes" className={labelCls}>
                Anything we should know?
              </label>
              <textarea
                id="bk-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Injuries, focus areas, goals"
                aria-describedby="bk-notes-help"
                className={`${inputCls} resize-none`}
              />
              <p id="bk-notes-help" className="mt-2 text-sm text-mist">
                Optional.
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="mt-7 flex w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-teal px-7 py-3.5 text-base font-semibold text-ink transition-all duration-150 hover:bg-teal-bright active:scale-[0.98]"
          >
            <WhatsappLogo className="h-5 w-5" weight="regular" />
            Send via WhatsApp
          </button>
          <p className="mt-3 text-center text-sm text-mist">
            This opens WhatsApp with your details filled in. Nothing sends until you
            press send.
          </p>
        </form>
      </div>
    </section>
  );
}
