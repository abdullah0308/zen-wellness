export const PHONE_DISPLAY = "5814 8138";
export const PHONE_TEL = "+23058148138";
export const WHATSAPP_NUMBER = "23058148138";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WA_MESSAGE =
  "Hi Zen Wellness! I'd like to book a session.";

export type Category = "massage" | "coaching";

export type Service = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: "sport" | "relax" | "deep" | "recovery" | "training" | "fatloss" | "muscle" | "endurance" | "rehab";
};

export const MASSAGE_SERVICES: Service[] = [
  {
    id: "sport-massage",
    name: "Sport Massage",
    tagline: "Perform at your peak",
    description:
      "Enhance performance, prevent injuries and speed up recovery — built for active bodies and training loads.",
    icon: "sport",
  },
  {
    id: "relaxation-massage",
    name: "Relaxation Massage",
    tagline: "Unwind, completely",
    description:
      "Reduce stress, promote deep relaxation and improve your overall well-being from head to toe.",
    icon: "relax",
  },
  {
    id: "deep-tissue-massage",
    name: "Deep Tissue Massage",
    tagline: "Release what holds you back",
    description:
      "Target chronic tension and release deep muscle knots with focused, firm-pressure work.",
    icon: "deep",
  },
  {
    id: "recovery-sessions",
    name: "Recovery Sessions",
    tagline: "Bounce back faster",
    description:
      "Aid muscle recovery, reduce soreness and get your body back to peak condition between sessions.",
    icon: "recovery",
  },
];

export const COACHING_SERVICES: Service[] = [
  {
    id: "fat-loss",
    name: "Fat Loss",
    tagline: "Lighter, for good",
    description:
      "Structured, sustainable training to burn fat and keep it off — no crash plans, just consistent, visible results.",
    icon: "fatloss",
  },
  {
    id: "muscle-building",
    name: "Muscle Building",
    tagline: "Build real strength",
    description:
      "Progressive strength training to build lean muscle, improve posture and shape your physique.",
    icon: "muscle",
  },
  {
    id: "endurance",
    name: "Endurance",
    tagline: "Go further",
    description:
      "Conditioning programmes that build stamina, heart health and all-day energy — step by step.",
    icon: "endurance",
  },
  {
    id: "rehabilitation",
    name: "Rehabilitation",
    tagline: "Come back stronger",
    description:
      "Careful, guided training to rebuild strength, mobility and confidence after injury or a long break.",
    icon: "rehab",
  },
];

export function servicesFor(category: Category) {
  return category === "massage" ? MASSAGE_SERVICES : COACHING_SERVICES;
}

export const CATEGORY_LABEL: Record<Category, string> = {
  massage: "Massage Therapy",
  coaching: "Personal Coaching",
};
