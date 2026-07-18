import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function SportIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="17" cy="4.5" r="1.9" />
      <path d="M14.8 8.2 11 10.5l2.6 2.8-1.8 5.2" />
      <path d="m11 10.5-3.4-.6L4.8 12" />
      <path d="m13.6 13.3 3.6 1.4 2 4" />
      <path d="M14.8 8.2 18.6 9l2.2-1.4" />
    </svg>
  );
}

export function RelaxIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="9.5" r="4.5" />
      <path d="M9 21c.6-2.2 1.6-3.4 3-3.4s2.4 1.2 3 3.4" />
      <path d="M10.4 9.2c.3.5 1 .8 1.6.8s1.3-.3 1.6-.8" />
      <path d="M3.5 12.5c1-.3 1.8-1 2.2-2M20.5 12.5c-1-.3-1.8-1-2.2-2" />
    </svg>
  );
}

export function DeepTissueIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 4.5c-2 1.6-3 3.9-3 6.5 0 4.5 3.2 8.5 8 8.5s8-4 8-8.5c0-2.6-1-4.9-3-6.5" />
      <path d="M12 4v6.5" />
      <path d="M8.5 7.5 12 10.5l3.5-3" />
      <circle cx="12" cy="14.5" r="1.4" />
    </svg>
  );
}

export function RecoveryIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 13a8 8 0 1 1 2.3 5.7" />
      <path d="M4 13v-3.5M4 13H7.5" />
      <path d="M12 8.5V13l3 1.8" />
    </svg>
  );
}

export function TrainingIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 8.5v7M17.5 8.5v7" />
      <path d="M4 10v4M20 10v4" />
      <path d="M6.5 12h11" />
    </svg>
  );
}

export function ComfortIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 11V8.5A2.5 2.5 0 0 1 7.5 6h9A2.5 2.5 0 0 1 19 8.5V11" />
      <path d="M4.5 18v-3.5A2.5 2.5 0 0 1 7 12h10a2.5 2.5 0 0 1 2.5 2.5V18" />
      <path d="M4.5 18h15" />
      <path d="M6.5 18v1.5M17.5 18v1.5" />
    </svg>
  );
}

export function PrivacyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 5 6v5c0 4.4 3 7.9 7 9.5 4-1.6 7-5.1 7-9.5V6l-7-2.5Z" />
      <path d="m9.2 11.8 2 2 3.6-3.9" />
    </svg>
  );
}

export function FlexibilityIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.4 12.3 2.4 2.4 4.8-5" />
    </svg>
  );
}

export function TherapistIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 20c.8-3.5 3.3-5.5 6.5-5.5s5.7 2 6.5 5.5" />
    </svg>
  );
}

export function CertifiedIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="9" r="5" />
      <path d="m9.5 13.5-1.5 7 4-2.4 4 2.4-1.5-7" />
      <path d="m10.2 9 1.3 1.3 2.5-2.6" />
    </svg>
  );
}

export function CareIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20s-7-4.5-8.5-9C2.6 8 4.4 5.5 7.2 5.5c1.9 0 3.6 1.1 4.8 2.9 1.2-1.8 2.9-2.9 4.8-2.9 2.8 0 4.6 2.5 3.7 5.5C19 15.5 12 20 12 20Z" />
    </svg>
  );
}

export function LotusIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 18c-2.2-1.4-3.5-3.6-3.5-6.2 0-2.2 1.3-4.6 3.5-6.3 2.2 1.7 3.5 4.1 3.5 6.3 0 2.6-1.3 4.8-3.5 6.2Z" />
      <path d="M12 18c-3.4.6-6.3-.4-8.5-3 1.4-.8 3-1.2 4.6-1" />
      <path d="M12 18c3.4.6 6.3-.4 8.5-3-1.4-.8-3-1.2-4.6-1" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15L2 22l5.13-1.5A9.93 9.93 0 1 0 12.04 2Zm0 18.13c-1.5 0-3-.4-4.28-1.15l-.3-.18-3.05.9.92-2.97-.2-.3a8.18 8.18 0 1 1 6.9 3.7Zm4.5-6.13c-.25-.12-1.47-.72-1.7-.8-.22-.09-.39-.13-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-3.35-2.93c-.25-.43.25-.4.72-1.35.08-.16.04-.3-.02-.43-.06-.12-.55-1.34-.76-1.84-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.43.06-.66.3-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1 2.56.13.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.6.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28Z" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 4h3.5l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L15 13l4 1.5V18a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4 6.2 2 2 0 0 1 5 4Z" />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s-6.5-5.3-6.5-10.2A6.5 6.5 0 0 1 12 4.3a6.5 6.5 0 0 1 6.5 6.5C18.5 15.7 12 21 12 21Z" />
      <circle cx="12" cy="10.8" r="2.3" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="5.5" width="16" height="15" rx="2.5" />
      <path d="M4 10h16M8.5 3.5v3.5M15.5 3.5v3.5" />
      <path d="m9.5 14.8 1.8 1.8 3.4-3.5" />
    </svg>
  );
}

export function FatLossIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21c-3.6 0-6-2.4-6-5.7 0-2.5 1.5-4.4 2.9-6.1.3.9.9 1.7 1.7 2.1C10.3 8.6 10.8 5 13.6 3c-.3 2.3.6 3.8 1.9 5.3 1.3 1.6 2.5 3.2 2.5 5.6 0 3.7-2.4 7.1-6 7.1Z" />
      <path d="M12 21c-1.6 0-2.7-1.3-2.7-3 0-1.5 1-2.5 2.7-4 1.7 1.5 2.7 2.5 2.7 4 0 1.7-1.1 3-2.7 3Z" />
    </svg>
  );
}

export function MuscleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 19c0-4 2-6.5 5.5-6.5 2.6 0 4.5 1.4 5 3.5" />
      <path d="M5 19c.5-6 1-10.5 2-14h4l-1 5.5 3-1.5c3.5 1 5.5 3.5 6 8.5.1 1-.7 1.5-1.5 1.5H6.5C5.7 19 5 19 5 19Z" />
    </svg>
  );
}

export function EnduranceIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20s-7-4.5-8.5-9C2.6 8 4.4 5.5 7.2 5.5c1.9 0 3.6 1.1 4.8 2.9 1.2-1.8 2.9-2.9 4.8-2.9 2.8 0 4.6 2.5 3.7 5.5C19 15.5 12 20 12 20Z" />
      <path d="M5 12h3.5l1.5-2.5 2 4.5 1.5-3 1 1h4.5" stroke="var(--teal)" />
    </svg>
  );
}

export function RehabIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8.5v7M8.5 12h7" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.6l2.8 5.9 6.4.8-4.7 4.4 1.2 6.3L12 16.9 6.3 20l1.2-6.3L2.8 9.3l6.4-.8L12 2.6Z" />
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" />
    </svg>
  );
}
