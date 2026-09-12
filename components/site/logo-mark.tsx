/** Inline rendering of assets/logo/logo.svg (see public/logo.svg for the distributable copy).
 * Inlined rather than <img>-ed: an <img>-loaded SVG renders in a sandboxed "image context" that
 * drops external @font-face/@import fetches, so the Space Grotesk text would silently fall back
 * to a generic sans-serif. Inline SVG lives in the page DOM and picks up --font-display for free. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} fill="none" aria-hidden="true">
      <circle cx="256" cy="256" r="224" stroke="currentColor" strokeWidth="40" />
      <text
        x="256"
        y="332"
        textAnchor="middle"
        fontSize="240"
        fontWeight="800"
        letterSpacing="-8"
        fill="currentColor"
        className="font-display"
      >
        EA
      </text>
    </svg>
  );
}
