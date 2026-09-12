/** Inline rendering of assets/logo/logo.svg (see public/logo.svg for the distributable copy).
 * Inlined rather than <img>-ed: an <img>-loaded SVG renders in a sandboxed "image context" that
 * drops external @font-face/@import fetches, so the Space Grotesk text would silently fall back
 * to a generic sans-serif. Inline SVG lives in the page DOM and picks up --font-display for free. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <rect x="0" y="0" width="512" height="512" rx="56" ry="56" className="fill-brand" />
      <text
        x="256"
        y="326"
        textAnchor="middle"
        fontSize="230"
        fontWeight="800"
        letterSpacing="-8"
        className="fill-brand-foreground font-display"
      >
        EA
      </text>
    </svg>
  );
}
