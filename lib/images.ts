import type { StaticImageData } from "next/image";

import coachingAtHome from "@/assets/photos/at-home.jpg";
import coachingDetail from "@/assets/photos/coaching-detail.jpg";
import coachingHero from "@/assets/photos/coaching-hero.jpg";
import island from "@/assets/photos/island.jpg";
import massageAtHome from "@/assets/photos/massage-at-home.jpg";
import massageDetail from "@/assets/photos/massage-detail.jpg";
import massageHero from "@/assets/photos/massage-hero.jpg";

/**
 * Photography registry.
 *
 * The files are committed to `assets/photos/` and statically imported rather
 * than hotlinked. Three reasons: the page no longer depends on a third party
 * being up at request time (the first build against remote URLs failed on an
 * upstream timeout), the static import hands Next the intrinsic dimensions and
 * a blur placeholder so nothing shifts as they load, and the bytes get served
 * from the same origin.
 *
 * Provenance is recorded per entry. Every photo was fetched and visually
 * checked before being added - never add one without looking at it, since a
 * guessed Unsplash id either 404s or returns something unrelated.
 *
 * These are stock stand-ins. See README "Photography" for the shot list to
 * commission before this is treated as final.
 */
export type SiteImage = {
  src: StaticImageData;
  /** Describes the photo for screen readers and if the image fails to load. */
  alt: string;
  /** Unsplash photo id this was sourced from. */
  source: string;
};

export const IMAGES = {
  massageHero: {
    src: massageHero,
    alt: "Therapist's hands working along a client's lower back during a massage",
    source: "photo-1519823551278-64ac92734fb1",
  },
  massageDetail: {
    src: massageDetail,
    alt: "Massage oil being poured into a therapist's open palm",
    source: "photo-1544161515-4ab6ce6db874",
  },
  coachingHero: {
    src: coachingHero,
    alt: "Close view of an athlete setting their grip on a loaded barbell",
    source: "photo-1517836357463-d25dfeac3438",
  },
  coachingDetail: {
    src: coachingDetail,
    alt: "Hand lifting a dumbbell from a rack in low light",
    source: "photo-1583454110551-21f2fa2afe61",
  },
  /** Each vertical gets its own "at home" shot - a massage page showing
      someone doing sit-ups was selling the wrong service. */
  massageAtHome: {
    src: massageAtHome,
    alt: "Massage oil being dispensed from a dropper bottle into cupped hands",
    source: "photo-1515377905703-c4788e51af15",
  },
  coachingAtHome: {
    src: coachingAtHome,
    alt: "Person training on a mat beside a bright window at home",
    source: "photo-1571019613454-1cb2f99b2d8b",
  },
  /** Backdrop only. Graded down hard so it reads as texture behind text. */
  island: {
    src: island,
    alt: "Palm-lined water's edge under open sky in Mauritius",
    source: "photo-1596178065887-1198b6148b2b",
  },
} as const satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof IMAGES;
