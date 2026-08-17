import Link from "next/link";
import { LogoLockup } from "./Logo";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { PHONE_DISPLAY, PHONE_TEL, whatsappLink, DEFAULT_WA_MESSAGE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-bone/8 bg-ink">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <LogoLockup />
          <p className="mt-4 max-w-xs leading-relaxed text-mist">
            Restore. Recover. Perform. Mobile massage and personal coaching across
            Mauritius.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold text-bone">Pages</h2>
          <ul className="mt-4 space-y-2.5 text-mist">
            {[
              { href: "/", label: "Home" },
              { href: "/massage", label: "Massage" },
              { href: "/coaching", label: "Coaching" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors duration-150 hover:text-teal-bright"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-bone">Book your slot</h2>
          <a
            href={`tel:${PHONE_TEL}`}
            className="font-display mt-4 block text-3xl font-semibold tracking-tight text-bone transition-colors duration-150 hover:text-teal-bright"
          >
            {PHONE_DISPLAY}
          </a>
          <a
            href={whatsappLink(DEFAULT_WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-teal transition-colors duration-150 hover:text-teal-bright"
          >
            Chat on WhatsApp
            <ArrowUpRight className="h-4 w-4" weight="bold" />
          </a>
        </div>
      </div>

      {/* The floating WhatsApp button sits over the bottom-right of the
          viewport, which is exactly where this row lands when you scroll to the
          end. The extra right padding (and bottom padding on mobile, where the
          row is centred) keeps the credit link clear of it and clickable. */}
      <div className="border-t border-bone/8 py-6">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-2 px-5 pb-14 text-center text-sm text-mist/70 sm:flex-row sm:justify-between sm:pb-0 sm:pr-24 sm:text-left lg:px-8 lg:pr-28">
          {/* The tagline takes its own line on mobile, where the two together
              wrap into a ragged three-line block. Inline again from sm up. */}
          <p>
            © {new Date().getFullYear()} Zen Wellness.{" "}
            <span className="block sm:inline">
              Your body. Your journey. Our support.
            </span>
          </p>
          <p>
            Developed by{" "}
            <a
              href="https://m-abdullah.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mist transition-colors duration-150 hover:text-teal-bright"
            >
              AM
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
