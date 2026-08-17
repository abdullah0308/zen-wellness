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
import { MapPin, SealCheck, HandHeart } from "@/components/icons";
import { MASSAGE_SERVICES } from "@/lib/site";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Massage at Home - Zen Wellness Mauritius",
  description:
    "Professional sport, relaxation and deep tissue massage and recovery sessions, brought to your home in Mauritius. Restore. Recover. Perform. Book on 5814 8138.",
};

const WA_MESSAGE = "Hi Zen Wellness! I'd like to book a massage session.";

const SECTIONS = [
  { id: "top", label: "Top" },
  { id: "services", label: "Treatments" },
  { id: "home-visits", label: "How it works" },
  { id: "why-us", label: "Why us" },
  { id: "reviews", label: "Reviews" },
  { id: "book", label: "Book" },
];

export default function MassagePage() {
  return (
    <main id="main" className="flex-1">
      <Nav switchHref="/coaching" switchLabel="Coaching" waMessage={WA_MESSAGE} />
      <SpineRail sections={SECTIONS} />

      <Hero
        eyebrow="Restore. Recover. Perform."
        titleTop="Your wellness."
        titleAccent="Our priority."
        sub="Professional massage therapy, brought to your own home anywhere in Mauritius."
        waMessage={WA_MESSAGE}
        image={IMAGES.massageHero}
      />

      <TrustStrip
        chips={[
          { icon: MapPin, label: "We come to your home" },
          { icon: SealCheck, label: "Experienced and certified" },
          { icon: HandHeart, label: "Personalised care" },
        ]}
      />

      <Services
        category="massage"
        services={MASSAGE_SERVICES}
        headingRest="Treatments built around"
        headingAccent="your body"
        intro="Whether you train hard, sit at a desk all week or simply need to switch off, there is a session for where your body is today."
        bookNoun="session"
        image={IMAGES.massageDetail}
      />

      <HomeVisits category="massage" />
      <WhyUs category="massage" />
      <Testimonials category="massage" />
      <BookingForm category="massage" services={MASSAGE_SERVICES} />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
