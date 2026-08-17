import Image from "next/image";
import { Reveal } from "./Reveal";
import { whatsappLink, type Service, type Category } from "@/lib/site";
import type { SiteImage } from "@/lib/images";
import { ArrowRight, SERVICE_ICONS, WhatsappLogo } from "./icons";

/**
 * Asymmetric bento, five cells for five things: four services plus the "not
 * sure yet" route. Cell count matches content exactly, so there is no blank
 * tile padding out the grid.
 *
 * The first service takes the large photographic cell. The rest are text
 * panels, and the ask-us cell is tinted, so the grid has real background
 * variation rather than five identical cards.
 */
export function Services({
  category,
  services,
  headingRest,
  headingAccent,
  intro,
  bookNoun,
  image,
}: {
  category: Category;
  services: Service[];
  headingRest: string;
  headingAccent: string;
  intro: string;
  /** "session" for massage, "programme" for coaching. */
  bookNoun: string;
  image: SiteImage;
}) {
  const [featured, ...rest] = services;
  const FeaturedIcon = SERVICE_ICONS[featured.icon];

  return (
    <section
      id="services"
      className="relative mx-auto max-w-[1400px] scroll-mt-24 px-5 py-24 lg:px-8 lg:py-32"
    >
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-teal">
          What we offer
        </p>
        <h2 className="h-section mt-5 max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)] text-bone">
          {headingRest} <span className="em-italic">{headingAccent}</span>
        </h2>
        <p className="mt-5 max-w-lg leading-relaxed text-mist">{intro}</p>
      </Reveal>

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {/* ---- featured cell: photographic, double height ---- */}
        <Reveal className="md:col-span-2 lg:col-span-3 lg:row-span-2">
          <article className="img-frame img-frame--deep group relative flex h-full min-h-[380px] flex-col justify-end p-7 lg:p-9">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="relative z-10">
              <FeaturedIcon className="h-8 w-8 text-teal" weight="regular" />
              <h3 className="h-section mt-5 text-3xl text-bone">{featured.name}</h3>
              <p className="mt-1.5 text-lg italic text-teal-bright">{featured.tagline}</p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-bone/80">
                {featured.description}
              </p>
              <a
                href={whatsappLink(
                  `Hi Zen Wellness! I'd like to book a ${featured.name} ${bookNoun}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal transition-colors duration-150 hover:text-teal-bright"
              >
                Book this {bookNoun}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  weight="bold"
                />
              </a>
            </div>
          </article>
        </Reveal>

        {/* ---- three text cells ---- */}
        {/* Cols 4-6 of rows 1-2 sit beside the featured cell; the third drops to
            row 3 and the ask-us cell fills the rest of it. No blank tiles. */}
        {rest.map((service, i) => {
          const Icon = SERVICE_ICONS[service.icon];
          return (
            <Reveal key={service.id} delay={(i + 1) * 80} className="lg:col-span-3">
              <article className="panel group h-full p-7 transition-colors duration-300 hover:border-teal/30">
                <div className="flex items-start gap-4">
                  <Icon className="mt-0.5 h-6 w-6 shrink-0 text-teal" weight="regular" />
                  <div>
                    <h3 className="h-section text-xl text-bone">{service.name}</h3>
                    <p className="mt-1 text-base italic text-teal-bright">
                      {service.tagline}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-mist">
                  {service.description}
                </p>
                <a
                  href={whatsappLink(
                    `Hi Zen Wellness! I'd like to book a ${service.name} ${bookNoun}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal transition-colors duration-150 hover:text-teal-bright"
                >
                  Book this {bookNoun}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    weight="bold"
                  />
                </a>
              </article>
            </Reveal>
          );
        })}

        {/* ---- fifth cell: the undecided route ---- */}
        <Reveal delay={240} className="md:col-span-2 lg:col-span-3">
          <article className="flex h-full flex-col justify-center rounded-[20px] border border-teal/25 bg-teal/[0.06] p-7">
            <h3 className="h-section text-xl text-bone">Not sure what you need?</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist">
              {category === "massage"
                ? "Tell us how your body feels and we will point you to the right session. No obligation."
                : "Tell us your goal and we will point you to the right programme. No obligation."}
            </p>
            <a
              href={whatsappLink(
                category === "massage"
                  ? "Hi Zen Wellness! I'm not sure which massage is right for me. Can you help?"
                  : "Hi Zen Wellness! I'm not sure which coaching programme is right for me. Can you help?"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full bg-teal px-6 py-3 text-sm font-semibold text-ink transition-all duration-150 hover:bg-teal-bright active:scale-[0.98]"
            >
              <WhatsappLogo className="h-4 w-4" weight="regular" />
              Ask us
            </a>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
