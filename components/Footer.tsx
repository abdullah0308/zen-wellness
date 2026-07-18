import { LogoLockup } from "./Logo";
import { PHONE_DISPLAY, PHONE_TEL, whatsappLink, DEFAULT_WA_MESSAGE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-foam/[0.06] bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 py-14 text-center md:flex-row md:justify-between md:text-left lg:px-8">
        <div>
          <LogoLockup />
          <p className="mt-3 max-w-xs text-sm text-mist">
            Restore. Recover. Perform. Mobile massage &amp; personal training
            across Mauritius.
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-mist">
          <a href="/" className="transition-colors hover:text-teal-bright">
            Home
          </a>
          <a href="/massage" className="transition-colors hover:text-teal-bright">
            Massage
          </a>
          <a href="/coaching" className="transition-colors hover:text-teal-bright">
            Coaching
          </a>
          <a href="#book" className="transition-colors hover:text-teal-bright">
            Book
          </a>
        </nav>

        <div className="text-sm text-mist">
          <p className="text-xs uppercase tracking-wider text-mist/60">Book your slot</p>
          <a
            href={`tel:${PHONE_TEL}`}
            className="font-display text-2xl font-semibold text-foam transition-colors hover:text-teal-bright"
          >
            {PHONE_DISPLAY}
          </a>
          <p className="mt-1">
            <a
              href={whatsappLink(DEFAULT_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal transition-colors hover:text-teal-bright"
            >
              Chat on WhatsApp →
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-foam/[0.06] py-5 text-center text-xs text-mist/50">
        © {new Date().getFullYear()} Zen Wellness · Your body. Your journey. Our support.
      </div>
    </footer>
  );
}
