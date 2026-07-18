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
import { PinIcon, CertifiedIcon, CareIcon } from "@/components/icons";
import { MASSAGE_SERVICES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Massage at Home — Zen Wellness Mauritius",
  description:
    "Professional sport, relaxation & deep tissue massage and recovery sessions, delivered to your own home in Mauritius. Restore. Recover. Perform. Book on 5814 8138.",
};

const WA_MESSAGE = "Hi Zen Wellness! I'd like to book a massage session.";

export default function MassagePage() {
  return (
    <main className="flex-1">
      <Nav switchHref="/coaching" switchLabel="Coaching →" waMessage={WA_MESSAGE} />
      <Hero
        eyebrow={["Restore", "Recover", "Perform"]}
        titleTop="Your wellness."
        titleAccent="Our priority."
        sub="Professional massage therapy, delivered to your own home — anywhere in Mauritius."
        bold="Professional care. Real results."
        waMessage={WA_MESSAGE}
        chips={[
          { icon: PinIcon, label: "We come to your home" },
          { icon: CertifiedIcon, label: "Experienced & certified" },
          { icon: CareIcon, label: "Personalised care" },
        ]}
      />
      <Services
        category="massage"
        services={MASSAGE_SERVICES}
        headingRest="Treatments built around"
        headingAccent="your body"
        intro="Whether you train hard, sit long hours or simply need to switch off — there's a session for where your body is today."
        bookNoun="session"
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
