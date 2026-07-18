import type { ComponentType, SVGProps } from "react";
import { ZenMark } from "./Logo";
import { WhatsAppIcon, ArrowIcon } from "./icons";
import { whatsappLink } from "@/lib/site";

export type HeroChip = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
};

export function Hero({
  eyebrow,
  titleTop,
  titleAccent,
  sub,
  bold,
  waMessage,
  chips,
}: {
  eyebrow: [string, string, string];
  titleTop: string;
  titleAccent: string;
  sub: string;
  bold: string;
  waMessage: string;
  chips: HeroChip[];
}) {
  return (
    <section id="top" className="hero-glow noise relative overflow-hidden">
      {/* decorative oversized mark */}
      <div className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 lg:block xl:right-0">
        <ZenMark
          animated
          className="animate-float-slow h-[34rem] w-[34rem] text-foam/[0.07]"
        />
      </div>

      <div className="relative mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-5 pb-20 pt-32 lg:px-8">
        <p className="mb-5 font-display text-sm font-medium uppercase tracking-[0.35em] text-teal">
          {eyebrow[0]}
          <span className="text-mist/60"> . </span>
          {eyebrow[1]}
          <span className="text-mist/60"> . </span>
          <span className="text-foam">{eyebrow[2]}</span>
        </p>

        <h1 className="max-w-3xl font-display text-6xl font-bold uppercase leading-[0.95] tracking-tight text-foam sm:text-7xl lg:text-8xl">
          {titleTop}
          <br />
          <span className="text-teal">{titleAccent}</span>
        </h1>

        <p className="mt-7 max-w-xl text-lg leading-relaxed text-mist">
          {sub} <span className="text-foam">{bold}</span>
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={whatsappLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-teal px-7 py-3.5 font-display text-base font-medium uppercase tracking-wider text-ink transition-all hover:bg-teal-bright hover:shadow-xl hover:shadow-teal/25"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Book your slot
          </a>
          <a
            href="#services"
            className="group inline-flex items-center gap-2.5 rounded-full border border-foam/20 px-7 py-3.5 font-display text-base font-medium uppercase tracking-wider text-foam transition-all hover:border-teal hover:text-teal-bright"
          >
            Explore services
            <ArrowIcon className="h-4 w-4 rotate-90 transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>

        <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3">
          {chips.map((c) => (
            <li key={c.label} className="flex items-center gap-2.5 text-sm text-mist">
              <c.icon className="h-4.5 w-4.5 text-teal" />
              {c.label}
            </li>
          ))}
        </ul>
      </div>

      {/* bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-ink" />
    </section>
  );
}
