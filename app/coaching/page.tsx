import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { HomeVisits } from "@/components/HomeVisits";
import { WhyUs } from "@/components/WhyUs";
import { Testimonials } from "@/components/Testimonials";
import { BookingForm } from "@/components/BookingForm";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { PinIcon, CertifiedIcon, TrainingIcon } from "@/components/icons";
import { COACHING_SERVICES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Personal Coaching at Home — Zen Wellness Mauritius",
  description:
    "One-on-one personal training at your own home in Mauritius — fat loss, muscle building, endurance and rehabilitation. Customised workouts, real results. Book on 5814 8138.",
};

const WA_MESSAGE = "Hi Zen Wellness! I'd like to book a personal coaching session.";

export default function CoachingPage() {
  return (
    <main className="flex-1">
      <Nav switchHref="/massage" switchLabel="Massage →" waMessage={WA_MESSAGE} />
      <Hero
        eyebrow={["Train", "Transform", "Perform"]}
        titleTop="Your goals."
        titleAccent="Our mission."
        sub="One-on-one personal coaching at your own home — fat loss, muscle, endurance or rehabilitation."
        bold="Customised workouts. Real results."
        waMessage={WA_MESSAGE}
        chips={[
          { icon: PinIcon, label: "We train you at home" },
          { icon: CertifiedIcon, label: "Experienced & certified" },
          { icon: TrainingIcon, label: "Customised programmes" },
        ]}
      />
      <Services
        category="coaching"
        services={COACHING_SERVICES}
        headingRest="Programmes built around"
        headingAccent="your goal"
        intro="Whether you want to lose fat, build muscle, go further or come back from injury — your programme starts where you are today."
        bookNoun="programme"
      />
      <HomeVisits category="coaching" />
      <WhyUs category="coaching" />
      <Testimonials category="coaching" />
      <BookingForm category="coaching" services={COACHING_SERVICES} />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
