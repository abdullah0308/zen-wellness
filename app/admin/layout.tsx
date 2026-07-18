import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Review Admin — Zen Wellness",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
