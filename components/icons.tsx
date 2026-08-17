/**
 * Icon layer.
 *
 * All glyphs come from Phosphor - nothing here is hand-drawn. Imports point at
 * the `/dist/ssr` build so these stay server components (the package root is
 * marked "use client" and would drag every consuming section into the client
 * bundle).
 *
 * One family, one weight. `regular` everywhere, `fill` only where a filled and
 * an empty state have to be told apart at a glance (star ratings).
 *
 * The one exception to "no hand-rolled SVG" is the Zen mark in Logo.tsx, which
 * is the brand's own asset rather than an icon.
 */
import {
  ArrowDown,
  ArrowRight,
  ArrowsClockwise,
  Barbell,
  CalendarBlank,
  CheckCircle,
  Clock,
  Fire,
  FirstAid,
  FlowerLotus,
  HandHeart,
  HandPalm,
  Heartbeat,
  House,
  Leaf,
  List,
  Lock,
  MapPin,
  PersonSimpleRun,
  Phone,
  Quotes,
  SealCheck,
  Star,
  Waves,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react/dist/ssr";

export {
  ArrowDown,
  ArrowRight,
  ArrowsClockwise,
  Barbell,
  CalendarBlank,
  CheckCircle,
  Clock,
  Fire,
  FirstAid,
  FlowerLotus,
  HandHeart,
  HandPalm,
  Heartbeat,
  House,
  Leaf,
  List,
  Lock,
  MapPin,
  PersonSimpleRun,
  Phone,
  Quotes,
  SealCheck,
  Star,
  Waves,
  WhatsappLogo,
  X,
};

/** Maps a service's `icon` key to its glyph. */
export const SERVICE_ICONS = {
  sport: PersonSimpleRun,
  relax: Waves,
  deep: HandPalm,
  recovery: ArrowsClockwise,
  training: Barbell,
  fatloss: Fire,
  muscle: Barbell,
  endurance: Heartbeat,
  rehab: FirstAid,
} as const;
