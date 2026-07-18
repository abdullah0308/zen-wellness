import type { Metadata } from "next";
import { Oswald, Manrope, Caveat } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "Zen Wellness — Mobile Massage & Personal Training in Mauritius",
  description:
    "Professional sport, relaxation & deep tissue massage, recovery sessions and personal training — delivered to your own home in Mauritius. Restore. Recover. Perform. Book your slot on 5814 8138.",
  keywords: [
    "massage Mauritius",
    "home massage",
    "sport massage",
    "deep tissue massage",
    "personal training Mauritius",
    "mobile massage",
  ],
  openGraph: {
    title: "Zen Wellness — Your Wellness. Our Priority.",
    description:
      "Professional massage & personal training at your own home in Mauritius. We come to you. You relax. We take care.",
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
      className={`${oswald.variable} ${manrope.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
