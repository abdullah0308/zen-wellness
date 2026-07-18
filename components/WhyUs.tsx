import { Reveal } from "./Reveal";
import { TherapistIcon, CertifiedIcon, CareIcon, LotusIcon } from "./icons";
import type { Category } from "@/lib/site";

export function WhyUs({ category }: { category: Category }) {
  const isMassage = category === "massage";
  const points = [
    {
      icon: TherapistIcon,
      title: isMassage ? "Professional Therapists" : "Professional Coaches",
      text: isMassage
        ? "Trained practitioners who treat every session with skill and respect."
        : "Trained coaches who plan every workout with purpose and care.",
    },
    {
      icon: CertifiedIcon,
      title: "Experienced & Certified",
      text: "Qualified hands you can trust, with real experience across sport and therapy.",
    },
    {
      icon: CareIcon,
      title: "Personalised Care",
      text: isMassage
        ? "Every session is adapted to your body, your goals and how you feel that day."
        : "Every programme is adapted to your level, your goals and how you feel that day.",
    },
    {
      icon: LotusIcon,
      title: "Focused On Your Wellness",
      text: "Your body. Your journey. Our support — from first session to lasting results.",
    },
  ];

  return (
    <section id="why-us" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 lg:px-8">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <p className="font-display text-sm font-medium uppercase tracking-[0.35em] text-teal">
            Why Zen Wellness
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold uppercase leading-tight text-foam sm:text-5xl">
            Care you can <span className="text-teal">feel</span>
          </h2>
          <p className="mt-4 text-mist">
            Professional care, real results — that&apos;s not a slogan, it&apos;s
            how every session is run.
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <div className="group h-full rounded-2xl border border-foam/[0.07] bg-ink-2 p-6 transition-all duration-300 hover:border-teal/30">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-teal/25 bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-ink">
                  <p.icon className="h-5.5 w-5.5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold uppercase tracking-wider text-foam">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-mist">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
