import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";

/**
 * Two families, both variable.
 *
 * Bricolage Grotesque carries the personality: a humanist grotesque with
 * enough irregularity to feel drawn rather than defaulted.
 * Instrument Sans does the work: highly legible down to 12px, and it ships a
 * real italic - which is what replaced the old handwriting face. Emphasis is
 * always the same family in italic, never a third font.
 */
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zen Wellness - Mobile Massage & Personal Coaching in Mauritius",
  description:
    "Professional sport, relaxation and deep tissue massage, recovery sessions and personal coaching, brought to your home anywhere in Mauritius. Book your slot on 5814 8138.",
  keywords: [
    "massage Mauritius",
    "home massage",
    "sport massage",
    "deep tissue massage",
    "personal training Mauritius",
    "mobile massage",
  ],
  openGraph: {
    title: "Zen Wellness - Your Wellness. Our Priority.",
    description:
      "Professional massage and personal coaching at your own home in Mauritius. We come to you. You relax. We take care.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-teal focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
