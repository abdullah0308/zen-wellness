import Image from "next/image";
import type { ComponentType } from "react";
import type { IconProps } from "@phosphor-icons/react";
import { ArrowDown, WhatsappLogo } from "./icons";
import { whatsappLink } from "@/lib/site";
import type { SiteImage } from "@/lib/images";

export type HeroChip = {
  icon: ComponentType<IconProps>;
  label: string;
};

/**
 * Asymmetric split hero: type on the left, a full-height photograph bleeding
 * off the right edge.
 *
 * Text elements are capped at four (eyebrow, headline, subtext, CTAs). The
 * trust chips that used to sit here now live in TrustStrip below the fold, so
 * the hero stays one message instead of a feature list.
 */
export function Hero({
  eyebrow,
  titleTop,
  titleAccent,
  sub,
  waMessage,
  image,
}: {
  eyebrow: string;
  titleTop: string;
  titleAccent: string;
  sub: string;
  waMessage: string;
  image: SiteImage;
}) {
  return (
    <section
      id="top"
      className="amb-glow noise relative flex min-h-[100dvh] flex-col overflow-hidden lg:block"
    >
      {/* ---- photograph ----
          A direct child of the section, so from lg up it can be positioned
          against the viewport edge rather than being trapped inside the
          max-width column. On mobile it is just the second item in the stack. */}
      <div className="img-frame img-frame--hero relative order-2 mx-5 mb-10 h-[42vh] min-h-[280px] rounded-[20px] lg:absolute lg:inset-y-0 lg:right-0 lg:order-none lg:m-0 lg:h-full lg:w-[52%] lg:rounded-none">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          placeholder="blur"
          sizes="(max-width: 1024px) 100vw, 52vw"
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 items-center px-5 pb-4 pt-28 lg:min-h-[100dvh] lg:px-8 lg:py-24">
        {/* ---- message ---- */}
        <div className="relative z-10 max-w-xl lg:max-w-[46%]">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-teal">
            {eyebrow}
          </p>

          <h1 className="h-display mt-6 text-[clamp(2.75rem,7vw,5rem)] text-bone">
            {titleTop}
            <br />
            <span className="em-italic inline-block">{titleAccent}</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-mist">{sub}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={whatsappLink(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-teal px-7 py-3.5 text-base font-semibold text-ink transition-all duration-150 hover:bg-teal-bright active:scale-[0.98]"
            >
              <WhatsappLogo className="h-5 w-5" weight="regular" />
              Book your slot
            </a>
            <a
              href="#services"
              className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-bone/20 px-7 py-3.5 text-base font-medium text-bone transition-all duration-150 hover:border-teal hover:text-teal-bright active:scale-[0.98]"
            >
              See treatments
              <ArrowDown
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                weight="bold"
              />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

/**
 * The proof chips, lifted out of the hero into their own band.
 * Deliberately a different layout family from every other section: one thin
 * horizontal rule of evenly-spaced items, no cards.
 */
export function TrustStrip({ chips }: { chips: HeroChip[] }) {
  return (
    <section className="border-y border-bone/8 bg-ink-2/40">
      <ul className="mx-auto flex max-w-[1400px] flex-col divide-y divide-bone/8 px-5 sm:flex-row sm:divide-x sm:divide-y-0 lg:px-8">
        {chips.map((chip) => (
          <li
            key={chip.label}
            className="flex flex-1 items-center gap-3 py-5 sm:justify-center sm:px-6"
          >
            <chip.icon className="h-5 w-5 shrink-0 text-teal" weight="regular" />
            <span className="text-sm text-bone/85">{chip.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
