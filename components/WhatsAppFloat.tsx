import { WhatsappLogo } from "./icons";
import { whatsappLink, DEFAULT_WA_MESSAGE } from "@/lib/site";

/**
 * The old version pulsed on an infinite loop. It has been dropped: a looping
 * glow on a fixed element is unmotivated motion that competes with the content
 * for attention on every scroll. Hover and press feedback is enough.
 */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(DEFAULT_WA_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-teal text-ink shadow-xl shadow-black/40 transition-transform duration-150 hover:scale-110 active:scale-95"
    >
      <WhatsappLogo className="h-7 w-7" weight="regular" />
    </a>
  );
}
