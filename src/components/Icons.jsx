// Inline SVG icons for the mobile bottom navigation.
//
// Hand-drawn rather than pulled from an icon library: the global spec forbids
// dependencies no specification requires, and four glyphs do not justify one.
// Each icon inherits colour through `currentColor` and is marked aria-hidden —
// the accessible name comes from the label alongside it.

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
}

export function HomeIcon() {
  return (
    <svg {...base}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.8V20h14V9.8" />
      <path d="M9.5 20v-5.5h5V20" />
    </svg>
  )
}

export function PortfolioIcon() {
  return (
    <svg {...base}>
      <rect x="3" y="7" width="18" height="13" rx="1.5" />
      <path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7" />
      <path d="M3 12h18" />
    </svg>
  )
}

export function LinksIcon() {
  return (
    <svg {...base}>
      <path d="M10.5 13.5a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-1.5 1.5" />
      <path d="M13.5 10.5a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5L12 17" />
    </svg>
  )
}

export function ContactIcon() {
  return (
    <svg {...base}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  )
}
