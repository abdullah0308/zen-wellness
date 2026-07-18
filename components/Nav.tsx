"use client";

import { useEffect, useState } from "react";
import { LogoLockup } from "./Logo";
import { WhatsAppIcon } from "./icons";
import { whatsappLink } from "@/lib/site";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#home-visits", label: "Home Visits" },
  { href: "#reviews", label: "Reviews" },
  { href: "#book", label: "Contact" },
];

export function Nav({
  switchHref,
  switchLabel,
  waMessage,
}: {
  switchHref: string;
  switchLabel: string;
  waMessage: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-ink/90 backdrop-blur-md border-b border-teal/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 lg:px-8">
        <a href="/" aria-label="Zen Wellness — home">
          <LogoLockup compact />
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-mist transition-colors hover:text-teal-bright"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={switchHref}
              className="rounded-full border border-teal/30 px-4 py-1.5 text-sm font-medium text-teal transition-colors hover:border-teal hover:text-teal-bright"
            >
              {switchLabel}
            </a>
          </li>
        </ul>

        <div className="hidden md:block">
          <a
            href={whatsappLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-teal px-5 py-2.5 font-display text-sm font-medium uppercase tracking-wider text-ink transition-all hover:bg-teal-bright hover:shadow-lg hover:shadow-teal/25"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Book Now
          </a>
        </div>

        {/* mobile toggle */}
        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span
            className={`h-0.5 w-6 bg-foam transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span className={`h-0.5 w-6 bg-foam transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-foam transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          open ? "max-h-[28rem] border-t border-teal/10" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 font-medium text-mist transition-colors hover:bg-ink-3 hover:text-teal-bright"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={switchHref}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 font-medium text-teal transition-colors hover:bg-ink-3 hover:text-teal-bright"
            >
              {switchLabel}
            </a>
          </li>
          <li className="mt-2">
            <a
              href={whatsappLink(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-teal px-5 py-3 font-display text-sm font-medium uppercase tracking-wider text-ink"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Book Now
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
