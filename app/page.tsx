import type { Metadata } from "next";
import { LogoLockup } from "@/components/Logo";
import { LotusIcon, TrainingIcon, ArrowIcon, WhatsAppIcon, PhoneIcon } from "@/components/icons";
import {
  whatsappLink,
  DEFAULT_WA_MESSAGE,
  PHONE_DISPLAY,
  PHONE_TEL,
  MASSAGE_SERVICES,
  COACHING_SERVICES,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Zen Wellness — Massage & Personal Coaching at Home in Mauritius",
  description:
    "Professional massage therapy and personal coaching, delivered to your own home in Mauritius. Choose your path: restore with massage or transform with coaching. Book on 5814 8138.",
};

const PATHS = [
  {
    href: "/massage",
    icon: LotusIcon,
    title: "Massage",
    subtitle: "Therapy",
    script: "Restore & recover",
    description:
      "Sport, relaxation and deep tissue massage plus recovery sessions — professional hands, at your home.",
    items: MASSAGE_SERVICES.map((s) => s.name),
  },
  {
    href: "/coaching",
    icon: TrainingIcon,
    title: "Personal",
    subtitle: "Coaching",
    script: "Train & transform",
    description:
      "One-on-one training built around your goal — customised workouts, personal guidance, real results.",
    items: COACHING_SERVICES.map((s) => s.name),
  },
];

export default function Gateway() {
  return (
    <main className="hero-glow noise relative flex min-h-svh flex-1 flex-col overflow-hidden">
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-10 lg:px-8">
        {/* header */}
        <div className="flex flex-col items-center text-center">
          <LogoLockup />
          <p className="mt-6 font-display text-sm font-medium uppercase tracking-[0.35em] text-teal">
            Restore<span className="text-mist/60"> . </span>Recover
            <span className="text-mist/60"> . </span>
            <span className="text-foam">Perform</span>
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold uppercase leading-tight text-foam sm:text-5xl lg:text-6xl">
            What does your body <span className="text-teal">need today?</span>
          </h1>
        </div>

        {/* choice cards */}
        <div className="mx-auto mt-12 grid w-full max-w-4xl flex-1 content-center gap-6 md:grid-cols-2">
          {PATHS.map((p) => (
            <a
              key={p.href}
              href={p.href}
              className="card-sheen group relative flex flex-col rounded-3xl border border-foam/[0.08] bg-ink-2/80 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-teal/40 hover:shadow-2xl hover:shadow-teal/15 sm:p-10"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-teal/25 bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-ink">
                <p.icon className="h-8 w-8" />
              </div>
              <h2 className="mt-6 font-display text-3xl font-semibold uppercase leading-none tracking-wide text-foam sm:text-4xl">
                {p.title}
                <br />
                <span className="text-teal">{p.subtitle}</span>
              </h2>
              <p className="mt-2 font-script text-2xl text-teal-bright">{p.script}</p>
              <p className="mt-3 text-sm leading-relaxed text-mist">{p.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-foam/10 px-3 py-1 text-xs text-mist"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <span className="mt-7 inline-flex items-center gap-2 font-display text-sm font-medium uppercase tracking-wider text-teal transition-colors group-hover:text-teal-bright">
                Enter
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
              </span>
            </a>
          ))}
        </div>

        {/* footer strip */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 text-sm text-mist sm:flex-row sm:gap-8">
          <a
            href={whatsappLink(DEFAULT_WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-teal-bright"
          >
            <WhatsAppIcon className="h-4 w-4 text-teal" />
            WhatsApp {PHONE_DISPLAY}
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="flex items-center gap-2 transition-colors hover:text-teal-bright"
          >
            <PhoneIcon className="h-4 w-4 text-teal" />
            Call {PHONE_DISPLAY}
          </a>
          <span className="text-mist/50">Your body. Your journey. Our support.</span>
        </div>
      </div>
    </main>
  );
}
