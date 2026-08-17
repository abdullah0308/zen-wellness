export const PHONE_DISPLAY = "5814 8138";
export const PHONE_TEL = "+23058148138";
export const WHATSAPP_NUMBER = "23058148138";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WA_MESSAGE = "Hi Zen Wellness! I'd like to book a session.";

export type Category = "massage" | "coaching";

export type Service = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon:
    | "sport"
    | "relax"
    | "deep"
    | "recovery"
    | "training"
    | "fatloss"
    | "muscle"
    | "endurance"
    | "rehab";
};

export const MASSAGE_SERVICES: Service[] = [
  {
    id: "sport-massage",
    name: "Sport Massage",
    tagline: "Perform at your peak",
    description:
      "Built for active bodies and heavy training loads. Improves performance, prevents injury and shortens the gap between sessions.",
    icon: "sport",
  },
  {
    id: "relaxation-massage",
    name: "Relaxation Massage",
    tagline: "Unwind, completely",
    description:
      "Slow, full-body work that lowers stress and quiets a busy head. The session you book when everything has been too much for too long.",
    icon: "relax",
  },
  {
    id: "deep-tissue-massage",
    name: "Deep Tissue Massage",
    tagline: "Release what holds you back",
    description:
      "Focused, firm pressure on the knots that have been there for months. For chronic tension in shoulders, neck and lower back.",
    icon: "deep",
  },
  {
    id: "recovery-sessions",
    name: "Recovery Sessions",
    tagline: "Bounce back faster",
    description:
      "Post-training work that clears soreness and gets your body ready for the next effort instead of nursing the last one.",
    icon: "recovery",
  },
];

export const COACHING_SERVICES: Service[] = [
  {
    id: "fat-loss",
    name: "Fat Loss",
    tagline: "Lighter, for good",
    description:
      "Structured training you can actually keep up. No crash plans, no punishment weeks, just steady change that holds.",
    icon: "fatloss",
  },
  {
    id: "muscle-building",
    name: "Muscle Building",
    tagline: "Build real strength",
    description:
      "Progressive strength work that builds lean muscle, straightens up your posture and changes how you carry yourself.",
    icon: "muscle",
  },
  {
    id: "endurance",
    name: "Endurance",
    tagline: "Go further",
    description:
      "Conditioning that builds stamina and heart health, so the stairs, the hike and the second half all get easier.",
    icon: "endurance",
  },
  {
    id: "rehabilitation",
    name: "Rehabilitation",
    tagline: "Come back stronger",
    description:
      "Careful, guided training that rebuilds strength, mobility and confidence after an injury or a long time away.",
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
