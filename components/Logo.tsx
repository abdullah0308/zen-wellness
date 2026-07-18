export function ZenMark({
  className = "",
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* brushed ring, two arcs */}
      <path
        d="M 88 32 A 43 43 0 0 0 22 18"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M 12 68 A 43 43 0 0 0 78 82"
        stroke="var(--teal)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Z */}
      <path
        d="M 33 30 H 67 L 35 70 H 69"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* spine dots along the diagonal */}
      {[
        { cx: 60, cy: 34, r: 2.2 },
        { cx: 56.5, cy: 41, r: 2.7 },
        { cx: 53, cy: 48, r: 3.1 },
        { cx: 49.5, cy: 55, r: 3.4 },
        { cx: 46, cy: 62, r: 3.7 },
        { cx: 42.5, cy: 69.5, r: 4 },
      ].map((d, i) => (
        <circle
          key={i}
          cx={d.cx + 8}
          cy={d.cy}
          r={d.r}
          fill="var(--teal)"
          className={animated ? "spine-dot" : undefined}
          style={animated ? { animationDelay: `${i * 0.28}s` } : undefined}
        />
      ))}
    </svg>
  );
}

export function LogoLockup({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <ZenMark className={compact ? "h-9 w-9 text-foam" : "h-12 w-12 text-foam"} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-semibold tracking-[0.18em] text-foam ${
            compact ? "text-lg" : "text-2xl"
          }`}
        >
          ZEN
        </span>
        <span
          className={`font-display font-normal tracking-[0.42em] text-teal ${
            compact ? "text-[0.55rem]" : "text-[0.65rem]"
          }`}
        >
          WELLNESS
        </span>
      </span>
    </span>
  );
}
