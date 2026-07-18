import { Reveal } from "./Reveal";
import { ComfortIcon, PrivacyIcon, FlexibilityIcon } from "./icons";
import type { Category } from "@/lib/site";

const PILLARS = {
  massage: [
    {
      icon: ComfortIcon,
      title: "Comfort",
      text: "No traffic, no waiting rooms. Your session happens in the space where you're most at ease.",
    },
    {
      icon: PrivacyIcon,
      title: "Privacy",
      text: "One-on-one professional care in your own home — discreet, respectful and fully yours.",
    },
    {
      icon: FlexibilityIcon,
      title: "Flexibility",
      text: "Sessions that fit around your schedule — early mornings, evenings or weekends.",
    },
  ],
  coaching: [
    {
      icon: ComfortIcon,
      title: "Comfort",
      text: "No gym intimidation, no commute. Train where you feel at ease — your home, garden or nearby space.",
    },
    {
      icon: PrivacyIcon,
      title: "Privacy",
      text: "One-on-one attention with zero crowds — just you, your coach and your goals.",
    },
    {
      icon: FlexibilityIcon,
      title: "Flexibility",
      text: "Workouts that fit around your life — early mornings, evenings or weekends.",
    },
  ],
};

const STEPS = {
  massage: [
    {
      n: "01",
      title: "Book your slot",
      text: "Message us on WhatsApp or use the booking form — pick a service, date and time.",
    },
    {
      n: "02",
      title: "We come to you",
      text: "Your therapist arrives at your door with everything needed for the session.",
    },
    {
      n: "03",
      title: "Restore & perform",
      text: "You relax, recover and get back to your best — without ever leaving home.",
    },
  ],
  coaching: [
    {
      n: "01",
      title: "Book your slot",
      text: "Message us on WhatsApp or use the booking form — tell us your goal and availability.",
    },
    {
      n: "02",
      title: "We come to you",
      text: "Your coach arrives with a plan and the equipment needed for your workout.",
    },
    {
      n: "03",
      title: "Train & transform",
      text: "Customised workouts, personal guidance and real, measurable results.",
    },
  ],
};

export function HomeVisits({ category }: { category: Category }) {
  const isMassage = category === "massage";
  return (
    <section
      id="home-visits"
      className="noise relative scroll-mt-24 overflow-hidden bg-ink-2 py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,rgba(62,198,188,0.08),transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="text-center">
          <p className="font-display text-sm font-medium uppercase tracking-[0.35em] text-teal">
            At your own home &amp; comfort
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-4xl font-semibold uppercase leading-tight text-foam sm:text-5xl">
            {isMassage ? (
              <>
                The spa comes <span className="text-teal">to you</span>
              </>
            ) : (
              <>
                Your coach comes <span className="text-teal">to you</span>
              </>
            )}
          </h2>
          <p className="mx-auto mt-5 font-script text-3xl text-teal-bright">
            {isMassage
              ? "We come to you. You relax. We take care."
              : "We come to you. You show up. We do the rest."}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {PILLARS[category].map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="h-full rounded-2xl border border-foam/[0.07] bg-ink/60 p-7 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-teal/25 bg-teal/10 text-teal">
                  <p.icon className="h-6.5 w-6.5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold uppercase tracking-wider text-foam">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {STEPS[category].map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div className="relative pl-2">
                <span className="font-display text-6xl font-bold text-teal/15">{s.n}</span>
                <h3 className="-mt-5 font-display text-xl font-semibold uppercase tracking-wide text-foam">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-mist">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
