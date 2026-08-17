import Image from "next/image";
import { Reveal } from "./Reveal";
import { Clock, House, Lock } from "./icons";
import type { Category } from "@/lib/site";
import { IMAGES } from "@/lib/images";

const PILLARS = {
  massage: [
    {
      icon: House,
      title: "Comfort",
      text: "No traffic, no waiting room. The session happens where you are already at ease.",
    },
    {
      icon: Lock,
      title: "Privacy",
      text: "One-to-one professional care in your own home. Discreet, and entirely yours.",
    },
    {
      icon: Clock,
      title: "Flexibility",
      text: "Early mornings, evenings or weekends. We work around your week.",
    },
  ],
  coaching: [
    {
      icon: House,
      title: "Comfort",
      text: "No gym intimidation, no commute. Train in your home, garden or a space nearby.",
    },
    {
      icon: Lock,
      title: "Privacy",
      text: "One-to-one attention with no crowd. Just you, your coach and the work.",
    },
    {
      icon: Clock,
      title: "Flexibility",
      text: "Early mornings, evenings or weekends. We work around your week.",
    },
  ],
};

const STEPS = {
  massage: [
    {
      title: "Book your slot",
      text: "Message us on WhatsApp or use the form. Pick a service, a date and a time.",
    },
    {
      title: "We come to you",
      text: "Your therapist arrives at your door with everything the session needs.",
    },
    {
      title: "Restore and perform",
      text: "You relax, recover and get back to your best without leaving home.",
    },
  ],
  coaching: [
    {
      title: "Book your slot",
      text: "Message us on WhatsApp or use the form. Tell us your goal and your availability.",
    },
    {
      title: "We come to you",
      text: "Your coach arrives with a plan and the equipment your workout needs.",
    },
    {
      title: "Train and transform",
      text: "Customised sessions, personal guidance and results you can measure.",
    },
  ],
};

/**
 * Split section: photograph and supporting pillars on the left, the booking
 * sequence as a vertical timeline on the right.
 *
 * The steps are numbered because they are genuinely ordered - you cannot be
 * treated before you have booked. The connecting rule and its nodes reuse the
 * vertebrae motif from the logo and the page spine.
 */
export function HomeVisits({ category }: { category: Category }) {
  const isMassage = category === "massage";
  const steps = STEPS[category];
  const image = isMassage ? IMAGES.massageAtHome : IMAGES.coachingAtHome;

  return (
    <section
      id="home-visits"
      className="noise relative scroll-mt-24 overflow-hidden bg-ink-2 py-24 lg:py-32"
    >
      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
        {/* ---- left: image + pillars ---- */}
        <div>
          <Reveal>
            <h2 className="h-section max-w-xl text-[clamp(2rem,4.2vw,3rem)] text-bone">
              {isMassage ? "The spa" : "Your coach"}{" "}
              <span className="em-italic">comes to you</span>
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-mist">
              {isMassage
                ? "We come to you. You relax. We take care of the rest."
                : "We come to you. You show up. We take care of the rest."}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="img-frame mt-9 aspect-[4/3] w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                placeholder="blur"
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={160}>
            <ul className="mt-9 grid gap-6 sm:grid-cols-3 sm:gap-5">
              {PILLARS[category].map((pillar) => (
                <li key={pillar.title}>
                  <pillar.icon className="h-5 w-5 text-teal" weight="regular" />
                  <h3 className="mt-3 text-sm font-semibold tracking-wide text-bone">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist">{pillar.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ---- right: the sequence ---- */}
        <div className="lg:pt-4">
          <ol className="relative">
            {/* the connecting spine */}
            <span
              aria-hidden="true"
              className="absolute left-[13px] top-3 bottom-3 w-px bg-gradient-to-b from-teal/50 via-teal/25 to-transparent"
            />

            {steps.map((step, i) => (
              <Reveal
                key={step.title}
                as="li"
                delay={i * 110}
                className="relative flex gap-6 pb-12 last:pb-0"
              >
                <span
                  aria-hidden="true"
                  className="relative z-10 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-teal/40 bg-ink-2 text-[11px] font-semibold text-teal"
                >
                  {i + 1}
                </span>
                <div className="pt-0.5">
                  <h3 className="h-section text-2xl text-bone">{step.title}</h3>
                  <p className="mt-2 max-w-sm leading-relaxed text-mist">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
