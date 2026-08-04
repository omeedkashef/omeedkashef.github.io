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

/* --- Skill icons ----------------------------------------------------------
   Larger than the nav glyphs because they head a card rather than sit in a
   bar. Same stroke language so the two sets read as one family. */

const skill = { ...base, width: 24, height: 24 }

export function CodeIcon() {
  return (
    <svg {...skill}>
      <path d="m8 8-4.5 4L8 16" />
      <path d="m16 8 4.5 4L16 16" />
      <path d="M13.5 6.5 10.5 17.5" />
    </svg>
  )
}

export function StackIcon() {
  return (
    <svg {...skill}>
      <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" />
      <path d="m3.5 12 8.5 4.5L20.5 12" />
      <path d="m3.5 16.5 8.5 4.5 8.5-4.5" />
    </svg>
  )
}

export function ServerIcon() {
  return (
    <svg {...skill}>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6" />
      <path d="M4.5 12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3" />
    </svg>
  )
}

export function ApiIcon() {
  return (
    <svg {...skill}>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="6.5" r="2.5" />
      <circle cx="18" cy="17.5" r="2.5" />
      <path d="m8.3 10.9 7.4-3.3" />
      <path d="m8.3 13.1 7.4 3.3" />
    </svg>
  )
}

export function ChartIcon() {
  return (
    <svg {...skill}>
      <path d="M3.5 20.5h17" />
      <path d="M6.5 20.5V13" />
      <path d="M11 20.5V6.5" />
      <path d="M15.5 20.5v-5" />
      <path d="M20 20.5V10" />
    </svg>
  )
}

export function ArchitectureIcon() {
  return (
    <svg {...skill}>
      <rect x="9" y="3.5" width="6" height="4" />
      <rect x="3.5" y="16.5" width="6" height="4" />
      <rect x="14.5" y="16.5" width="6" height="4" />
      <path d="M12 7.5v4.5M6.5 12h11M6.5 12v4.5M17.5 12v4.5" />
    </svg>
  )
}

export function LeadershipIcon() {
  return (
    <svg {...skill}>
      <circle cx="12" cy="7" r="3" />
      <path d="M6 20.5c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M3.5 12.5 5 11l1.5 1.5" />
      <path d="M17.5 12.5 19 11l1.5 1.5" />
    </svg>
  )
}

export function CommunicationIcon() {
  return (
    <svg {...skill}>
      <path d="M3.5 6.5A1.5 1.5 0 0 1 5 5h9a1.5 1.5 0 0 1 1.5 1.5v5A1.5 1.5 0 0 1 14 13H8l-4.5 3v-9.5Z" />
      <path d="M18 9h1a1.5 1.5 0 0 1 1.5 1.5V16a1.5 1.5 0 0 1-1.5 1.5h-1L15 20v-2.5" />
    </svg>
  )
}

export function StakeholderIcon() {
  return (
    <svg {...skill}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  )
}

export function FacilitationIcon() {
  return (
    <svg {...skill}>
      <circle cx="6" cy="7" r="2.5" />
      <circle cx="18" cy="7" r="2.5" />
      <circle cx="12" cy="17" r="2.5" />
      <path d="m8 8.5 2.5 5.8" />
      <path d="m16 8.5-2.5 5.8" />
      <path d="M8.5 7h7" />
    </svg>
  )
}

export function StrategyIcon() {
  return (
    <svg {...skill}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1Z" />
    </svg>
  )
}

/* --- Theme icons ----------------------------------------------------------
   Used by the header's light/dark toggle. The icon shown is the theme the
   button switches TO, not the one currently active. */

export function SunIcon() {
  return (
    <svg {...base} width="18" height="18">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5" />
      <path d="m5.3 5.3 1.8 1.8M16.9 16.9l1.8 1.8M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8" />
    </svg>
  )
}

export function MoonIcon() {
  return (
    <svg {...base} width="18" height="18">
      <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z" />
    </svg>
  )
}

/* --- Feedback icons -------------------------------------------------------
   Used by the contact form's success and failure states. Sized to sit inline
   with a line of body text. */

const feedback = { ...base, width: 16, height: 16, strokeWidth: 2 }

export function CheckIcon() {
  return (
    <svg {...feedback}>
      <path d="m4 12.5 5 5 11-11" />
    </svg>
  )
}

export function XIcon() {
  return (
    <svg {...feedback}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  )
}

export function TrashIcon() {
  return (
    <svg {...base} width="18" height="18">
      <path d="M4 6.5h16" />
      <path d="M9 6.5V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v1.5" />
      <path d="M6 6.5V19a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 19V6.5" />
      <path d="M10.5 10.5v6" />
      <path d="M13.5 10.5v6" />
    </svg>
  )
}

export function EmpathyIcon() {
  return (
    <svg {...skill}>
      <path d="M12 20s-7-4.4-7-9.2A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />
    </svg>
  )
}
