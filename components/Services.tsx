import { Reveal } from "./Reveal";
import { whatsappLink, type Service, type Category } from "@/lib/site";
import {
  SportIcon,
  RelaxIcon,
  DeepTissueIcon,
  RecoveryIcon,
  TrainingIcon,
  FatLossIcon,
  MuscleIcon,
  EnduranceIcon,
  RehabIcon,
  WhatsAppIcon,
  ArrowIcon,
} from "./icons";

const ICONS = {
  sport: SportIcon,
  relax: RelaxIcon,
  deep: DeepTissueIcon,
  recovery: RecoveryIcon,
  training: TrainingIcon,
  fatloss: FatLossIcon,
  muscle: MuscleIcon,
  endurance: EnduranceIcon,
  rehab: RehabIcon,
};

export function Services({
  category,
  services,
  headingAccent,
  headingRest,
  intro,
  bookNoun,
}: {
  category: Category;
  services: Service[];
  headingRest: string;
  headingAccent: string;
  intro: string;
  bookNoun: string; // "session" for massage, "programme" for coaching
}) {
  return (
    <section id="services" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-24 lg:px-8">
      <Reveal>
        <p className="font-display text-sm font-medium uppercase tracking-[0.35em] text-teal">
          What we offer
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold uppercase leading-tight text-foam sm:text-5xl">
          {headingRest} <span className="text-teal">{headingAccent}</span>
        </h2>
        <p className="mt-4 max-w-xl text-mist">{intro}</p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon = ICONS[s.icon];
          return (
            <Reveal key={s.id} delay={(i % 3) * 90}>
              <article className="card-sheen group relative h-full rounded-2xl border border-foam/[0.07] bg-ink-2 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-teal/30 hover:shadow-xl hover:shadow-teal/10">
                <div className="flex h-13 w-13 items-center justify-center rounded-full border border-teal/25 bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-ink">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold uppercase tracking-wide text-foam">
                  {s.name}
                </h3>
                <p className="mt-1 font-script text-lg text-teal-bright">{s.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-mist">{s.description}</p>
                <a
                  href={whatsappLink(
                    `Hi Zen Wellness! I'd like to book a ${s.name} ${bookNoun}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal transition-colors hover:text-teal-bright"
                >
                  Book this {bookNoun}
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </article>
            </Reveal>
          );
        })}

        {/* filler CTA card */}
        <Reveal delay={180}>
          <article className="flex h-full flex-col items-start justify-center rounded-2xl border border-dashed border-teal/30 bg-teal/[0.04] p-7">
            <p className="font-script text-2xl text-teal-bright">Not sure what you need?</p>
            <p className="mt-2 text-sm leading-relaxed text-mist">
              {category === "massage"
                ? "Tell us how your body feels and we'll recommend the right session for you — no obligation."
                : "Tell us your goal and we'll recommend the right programme for you — no obligation."}
            </p>
            <a
              href={whatsappLink(
                category === "massage"
                  ? "Hi Zen Wellness! I'm not sure which massage is right for me — can you help?"
                  : "Hi Zen Wellness! I'm not sure which coaching programme is right for me — can you help?"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-teal px-5 py-2.5 font-display text-sm font-medium uppercase tracking-wider text-ink transition-all hover:bg-teal-bright"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Ask us
            </a>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
