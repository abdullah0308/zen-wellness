import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LogoLockup } from "@/components/Logo";
import { ArrowRight, Barbell, FlowerLotus, Phone, WhatsappLogo } from "@/components/icons";
import {
  whatsappLink,
  DEFAULT_WA_MESSAGE,
  PHONE_DISPLAY,
  PHONE_TEL,
  MASSAGE_SERVICES,
  COACHING_SERVICES,
} from "@/lib/site";
import { IMAGES, type SiteImage } from "@/lib/images";

export const metadata: Metadata = {
  title: "Zen Wellness - Massage & Personal Coaching at Home in Mauritius",
  description:
    "Professional massage therapy and personal coaching, brought to your own home in Mauritius. Restore with massage or transform with coaching. Book on 5814 8138.",
};

type Path = {
  href: string;
  icon: typeof FlowerLotus;
  title: string;
  subtitle: string;
  description: string;
  items: string[];
  image: SiteImage;
};

const PATHS: Path[] = [
  {
    href: "/massage",
    icon: FlowerLotus,
    title: "Massage",
    subtitle: "Restore and recover",
    description:
      "Sport, relaxation and deep tissue massage plus recovery sessions. Professional hands, at your home.",
    items: MASSAGE_SERVICES.map((s) => s.name),
    image: IMAGES.massageHero,
  },
  {
    href: "/coaching",
    icon: Barbell,
    title: "Coaching",
    subtitle: "Train and transform",
    description:
      "One-to-one training built around your goal. Customised sessions, personal guidance, real results.",
    items: COACHING_SERVICES.map((s) => s.name),
    image: IMAGES.coachingHero,
  },
];

/**
 * Gateway: a two-panel split where the photograph, not a text label, tells the
 * visitor which door they are choosing. Each panel is a single large target,
 * which is also what makes it work on a phone.
 */
export default function Gateway() {
  return (
    <main
      id="main"
      className="amb-glow noise relative flex min-h-[100dvh] flex-1 flex-col overflow-hidden"
    >
      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-5 py-10 lg:px-8">
        <header className="flex flex-col items-center text-center">
          <LogoLockup />
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.3em] text-teal">
            Restore. Recover. Perform.
          </p>
          <h1 className="h-display mt-5 max-w-2xl text-[clamp(2.25rem,5.5vw,4rem)] text-bone">
            What does your body <span className="em-italic">need today?</span>
          </h1>
        </header>

        <div className="mx-auto mt-12 grid w-full max-w-5xl flex-1 content-center gap-5 md:grid-cols-2">
          {PATHS.map((path) => (
            <Link
              key={path.href}
              href={path.href}
              className="img-frame img-frame--deep group relative flex min-h-[340px] flex-col justify-end p-7 transition-transform duration-300 ease-out hover:-translate-y-1.5 sm:min-h-[420px] sm:p-9"
            >
              <Image
                src={path.image.src}
                alt={path.image.alt}
                fill
                priority
                placeholder="blur"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />

              <div className="relative z-10">
                <path.icon className="h-8 w-8 text-teal" weight="regular" />
                <h2 className="h-section mt-5 text-4xl text-bone sm:text-5xl">
                  {path.title}
                </h2>
                <p className="mt-2 text-lg italic text-teal-bright">{path.subtitle}</p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-bone/80">
                  {path.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {path.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-bone/20 bg-ink/40 px-3 py-1 text-xs text-bone/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-teal transition-colors duration-150 group-hover:text-teal-bright">
                  Enter
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                    weight="bold"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 text-sm text-mist sm:flex-row sm:gap-8">
          <a
            href={whatsappLink(DEFAULT_WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors duration-150 hover:text-teal-bright"
          >
            <WhatsappLogo className="h-4 w-4 text-teal" weight="regular" />
            WhatsApp {PHONE_DISPLAY}
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="flex items-center gap-2 transition-colors duration-150 hover:text-teal-bright"
          >
            <Phone className="h-4 w-4 text-teal" weight="regular" />
            Call {PHONE_DISPLAY}
          </a>
          <span className="text-mist/60">Your body. Your journey. Our support.</span>
        </div>
      </div>
    </main>
  );
}
