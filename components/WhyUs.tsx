import Image from "next/image";
import { Reveal } from "./Reveal";
import { FlowerLotus, HandHeart, Leaf, SealCheck } from "./icons";
import type { Category } from "@/lib/site";
import { IMAGES } from "@/lib/images";

/**
 * Full-bleed photographic band with the reasons set directly on the image.
 *
 * No cards here on purpose. Every other section on the page groups content in
 * panels; this one groups it with a rule and whitespace, which is what keeps
 * the page from reading as one long card grid.
 */
export function WhyUs({ category }: { category: Category }) {
  const isMassage = category === "massage";

  const points = [
    {
      icon: HandHeart,
      title: isMassage ? "Professional therapists" : "Professional coaches",
      text: isMassage
        ? "Trained practitioners who treat every session with skill and respect."
        : "Trained coaches who plan every session with purpose and care.",
    },
    {
      icon: SealCheck,
      title: "Experienced and certified",
      text: "Qualified hands you can trust, with real experience across sport and therapy.",
    },
    {
      icon: Leaf,
      title: "Personalised care",
      text: isMassage
        ? "Every session adapts to your body, your goals and how you feel that day."
        : "Every programme adapts to your level, your goals and how you feel that day.",
    },
    {
      icon: FlowerLotus,
      title: "Focused on your wellness",
      text: "Your body, your journey, our support, from the first session onward.",
    },
  ];

  return (
    <section id="why-us" className="relative scroll-mt-24 overflow-hidden">
      {/* backdrop */}
      <div className="img-frame img-frame--backdrop absolute inset-0 rounded-none">
        <Image
          src={IMAGES.island.src}
          alt=""
          aria-hidden="true"
          fill
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[center_65%]"
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 py-24 lg:px-8 lg:py-36">
        <Reveal>
          <h2 className="h-section max-w-lg text-[clamp(2rem,4.5vw,3.25rem)] text-bone">
            Care you can <span className="em-italic">feel</span>
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-mist">
            Professional care and real results is not a slogan here. It is how every
            session is run.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:max-w-4xl">
          {points.map((point, i) => (
            <Reveal key={point.title} as="li" delay={i * 90}>
              <span aria-hidden="true" className="block h-px w-10 bg-teal/60" />
              <point.icon className="mt-5 h-6 w-6 text-teal" weight="regular" />
              <h3 className="h-section mt-4 text-xl text-bone">{point.title}</h3>
              <p className="mt-2 max-w-sm leading-relaxed text-mist">{point.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
