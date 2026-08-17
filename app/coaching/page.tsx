import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Hero, TrustStrip } from "@/components/Hero";
import { Services } from "@/components/Services";
import { HomeVisits } from "@/components/HomeVisits";
import { WhyUs } from "@/components/WhyUs";
import { Testimonials } from "@/components/Testimonials";
import { BookingForm } from "@/components/BookingForm";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { SpineRail } from "@/components/SpineRail";
import { MapPin, SealCheck, Barbell } from "@/components/icons";
import { COACHING_SERVICES } from "@/lib/site";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Personal Coaching at Home - Zen Wellness Mauritius",
  description:
    "One-to-one personal training at your own home in Mauritius. Fat loss, muscle building, endurance and rehabilitation. Customised sessions, real results. Book on 5814 8138.",
};

const WA_MESSAGE = "Hi Zen Wellness! I'd like to book a personal coaching session.";

const SECTIONS = [
  { id: "top", label: "Top" },
  { id: "services", label: "Programmes" },
  { id: "home-visits", label: "How it works" },
  { id: "why-us", label: "Why us" },
  { id: "reviews", label: "Reviews" },
  { id: "book", label: "Book" },
];

export default function CoachingPage() {
  return (
    <main id="main" className="flex-1">
      <Nav switchHref="/massage" switchLabel="Massage" waMessage={WA_MESSAGE} />
      <SpineRail sections={SECTIONS} />

      <Hero
        eyebrow="Train. Transform. Perform."
        titleTop="Your goals."
        titleAccent="Our mission."
        sub="One-to-one personal coaching at your own home, built around the goal you actually have."
        waMessage={WA_MESSAGE}
        image={IMAGES.coachingHero}
      />

      <TrustStrip
        chips={[
          { icon: MapPin, label: "We train you at home" },
          { icon: SealCheck, label: "Experienced and certified" },
          { icon: Barbell, label: "Customised programmes" },
        ]}
      />

      <Services
        category="coaching"
        services={COACHING_SERVICES}
        headingRest="Programmes built around"
        headingAccent="your goal"
        intro="Whether you want to lose fat, build muscle, go further or come back from injury, your programme starts from where you are today."
        bookNoun="programme"
        image={IMAGES.coachingDetail}
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
