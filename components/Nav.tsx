"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoLockup } from "./Logo";
import { List, WhatsappLogo, X } from "./icons";
import { whatsappLink } from "@/lib/site";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#home-visits", label: "Home visits" },
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

  // A sentinel 24px down the document tells us when the page has scrolled,
  // rather than a scroll listener that fires on every frame. The header is
  // fixed, so the sentinel is placed on the body instead of inside it.
  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText =
      "position:absolute;top:24px;left:0;width:1px;height:1px;pointer-events:none;";
    document.body.prepend(sentinel);

    const observer = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting)
    );
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  // Close on Escape, the behaviour a keyboard user expects from any overlay.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-teal/10 bg-ink/90 shadow-lg shadow-black/20 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-3 lg:px-8">
        <Link href="/" aria-label="Zen Wellness, home">
          <LogoLockup compact />
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="whitespace-nowrap text-sm text-mist transition-colors duration-150 hover:text-teal-bright"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              href={switchHref}
              className="whitespace-nowrap rounded-full border border-teal/30 px-4 py-1.5 text-sm text-teal transition-colors duration-150 hover:border-teal hover:text-teal-bright"
            >
              {switchLabel}
            </Link>
          </li>
        </ul>

        <a
          href={whatsappLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-150 hover:bg-teal-bright active:scale-[0.98] md:inline-flex"
        >
          <WhatsappLogo className="h-4 w-4" weight="regular" />
          Book your slot
        </a>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full text-bone transition-colors duration-150 hover:text-teal-bright md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? (
            <X className="h-6 w-6" weight="bold" />
          ) : (
            <List className="h-6 w-6" weight="bold" />
          )}
        </button>
      </nav>

      {/* Mobile menu.
          `invisible` when closed is doing real work: it removes the links from
          the tab order. Height alone would animate them away visually while
          leaving them focusable behind the page. */}
      <div
        id="mobile-menu"
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          open
            ? "max-h-[30rem] border-t border-teal/10"
            : "invisible max-h-0 border-t-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-input px-3 py-3 text-mist transition-colors duration-150 hover:bg-ink-3 hover:text-teal-bright"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              href={switchHref}
              onClick={() => setOpen(false)}
              className="block rounded-input px-3 py-3 text-teal transition-colors duration-150 hover:bg-ink-3 hover:text-teal-bright"
            >
              {switchLabel}
            </Link>
          </li>
          <li className="mt-2">
            <a
              href={whatsappLink(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-teal px-5 py-3.5 text-sm font-semibold text-ink"
            >
              <WhatsappLogo className="h-4 w-4" weight="regular" />
              Book your slot
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
