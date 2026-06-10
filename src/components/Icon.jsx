// Custom icon set — one consistent 1.5px stroke line style across the site.
// Keys are referenced from site data (services, cards) and the admin panel.

const PATHS = {
  social: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <circle cx="4.5" cy="6" r="1.6" />
      <circle cx="19.5" cy="6" r="1.6" />
      <circle cx="4.5" cy="18" r="1.6" />
      <circle cx="19.5" cy="18" r="1.6" />
      <path d="M6 7.2 9.6 10M18 7.2 14.4 10M6 16.8 9.6 14M18 16.8 14.4 14" />
    </>
  ),
  strategy: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <path d="m12 12 4-4" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" />
      <path d="M7.5 13.5h3M13.5 13.5h3M7.5 17h3" />
    </>
  ),
  design: (
    <>
      <path d="m12 3 2.1 5.4L19.5 10 15 13.4l1.5 5.6L12 15.8 7.5 19l1.5-5.6L4.5 10l5.4-1.6L12 3Z" />
    </>
  ),
  reels: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <path d="M3.5 8.5h17M8.5 3.5l3 5M14 3.5l3 5" />
      <path d="m10.5 12.2 4 2.5-4 2.5v-5Z" />
    </>
  ),
  meta: (
    <>
      <path d="M4 15.5C4 11 6 7.5 8.6 7.5c2.1 0 3.4 2.2 4.6 4.7 1.1-2.5 2.4-4.7 4.4-4.7 2.4 0 4.4 3.5 4.4 8" />
      <path d="M4 15.5c0 .9.6 1.6 1.5 1.6 1.9 0 3.3-3 4.6-5.7M22 15.5c0 .9-.6 1.6-1.5 1.6-1.9 0-3.2-3-4.5-5.7" />
    </>
  ),
  googleads: (
    <>
      <rect x="9.2" y="3.5" width="5.6" height="13" rx="2.8" transform="rotate(30 12 10)" />
      <path d="M7.2 9.2 4.5 14a3 3 0 1 0 5.2 3l1-1.8" />
      <circle cx="18.4" cy="17.6" r="2.9" />
    </>
  ),
  brand: (
    <>
      <path d="M7 4h10l4 5.5L12 21 3 9.5 7 4Z" />
      <path d="M3 9.5h18M9.5 9.5 12 21l2.5-11.5L12 4 9.5 9.5Z" />
    </>
  ),
  copy: (
    <>
      <path d="m14.5 5.5 4 4L8 20H4v-4L14.5 5.5Z" />
      <path d="m12.5 7.5 4 4M4 20h16" opacity="0.7" />
    </>
  ),
  camera: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M8.5 7 10 4.5h4L15.5 7" />
      <circle cx="12" cy="13.3" r="3.4" />
      <circle cx="17.6" cy="10" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  report: (
    <>
      <path d="M4 20.5V4.5M4 20.5h16.5" />
      <path d="M8.5 16.5v-5M13 16.5V8M17.5 16.5v-3" strokeWidth="2" />
    </>
  ),
  radar: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" opacity="0.6" />
      <path d="M12 12 18 6.5" />
      <circle cx="15" cy="14.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="9" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5.2" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  web: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M3 9h18M6.2 6.8h.01M8.7 6.8h.01M11.2 6.8h.01" />
      <path d="M6.5 13h5M6.5 16h8" opacity="0.7" />
    </>
  ),
  influencer: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20.5c.8-3.6 3.6-5.6 7-5.6s6.2 2 7 5.6" />
      <path d="m18.5 3.5.7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7.7-1.6Z" fill="currentColor" stroke="none" />
    </>
  ),
  idea: (
    <>
      <path d="M12 3.5a6 6 0 0 0-3.4 10.9c.7.6 1.1 1.3 1.2 2.1h4.4c.1-.8.5-1.5 1.2-2.1A6 6 0 0 0 12 3.5Z" />
      <path d="M10 19.5h4M10.8 21.5h2.4" />
    </>
  ),
  team: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <circle cx="16.8" cy="9.5" r="2.3" />
      <path d="M3.5 19.5c.6-3.1 2.9-4.9 5.5-4.9s4.9 1.8 5.5 4.9" />
      <path d="M15.5 14.9c2.4 0 4.4 1.5 5 4.1" />
    </>
  ),
  data: (
    <>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
      <path d="M4.5 5.5v6.5c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V5.5" />
      <path d="M4.5 12v6c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-6" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m4.6 11.6 -1.6.9 9 5 9-5-1.6-.9M3 17.5l9 5 9-5" opacity="0.7" />
    </>
  ),
  growth: (
    <>
      <path d="M3.5 18.5 9 13l3.5 3.5L20.5 8" />
      <path d="M15.5 8h5v5" />
    </>
  ),
  system: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.8" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.8" />
      <circle cx="17" cy="7" r="3.5" />
      <path d="M7 13.5v3.2a2 2 0 0 0 2 2h2.2" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="3.8" />
      <path d="M4.5 20.5c.9-3.8 3.9-6 7.5-6s6.6 2.2 7.5 6" />
    </>
  ),
  gem: (
    <>
      <path d="M7 4h10l4 5.5L12 21 3 9.5 7 4Z" />
      <path d="M3 9.5h18M12 4l-2.5 5.5L12 21l2.5-11.5L12 4Z" opacity="0.7" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  x: <path d="m6 6 12 12M18 6 6 18" />,
  arrowRight: <path d="M4 12h16m-6-6 6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M9 7h8v8" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  phone: (
    <path d="M5.5 3.5h3.2l1.6 4.2-2 1.5a12.5 12.5 0 0 0 6.5 6.5l1.5-2 4.2 1.6v3.2a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.7a2 2 0 0 1 2-2.2Z" />
  ),
  whatsapp: (
    <>
      <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5Z" />
      <path d="M8.8 8.8c-.3 1.7 1 4.2 2.6 5.5 1.3 1 3 1.7 4 1l.4-1.4-2-1-.8.7c-.9-.4-1.9-1.4-2.3-2.3l.7-.8-1-2-1.6.3Z" fill="currentColor" stroke="none" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  spark: (
    <>
      <rect x="11" y="3" width="2.4" height="2.4" fill="currentColor" stroke="none" />
      <rect x="7.5" y="7" width="2.4" height="2.4" fill="currentColor" stroke="none" />
      <rect x="13.5" y="8.5" width="2.4" height="2.4" fill="currentColor" stroke="none" />
      <rect x="10" y="12.5" width="2.4" height="2.4" fill="currentColor" stroke="none" />
      <rect x="14.5" y="15.5" width="2.4" height="2.4" fill="currentColor" stroke="none" />
      <rect x="7" y="17" width="2.4" height="2.4" fill="currentColor" stroke="none" />
    </>
  ),
  logout: <path d="M9 4H5.5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2H9M15 16l4-4-4-4M19 12H9" />,
  save: (
    <>
      <path d="M5 3.5h11l3.5 3.5v12a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V5A1.5 1.5 0 0 1 5 3.5Z" />
      <path d="M7.5 3.5V8h7V3.5M7.5 20.5V14h9v6.5" />
    </>
  ),
  trash: <path d="M4.5 6.5h15M9.5 6.5v-2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2M6.5 6.5 7.4 19a1.5 1.5 0 0 0 1.5 1.4h6.2a1.5 1.5 0 0 0 1.5-1.4l.9-12.5M10 10.5v6M14 10.5v6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
      <circle cx="12" cy="15.5" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
}

export const SERVICE_ICON_OPTIONS = [
  'social', 'strategy', 'calendar', 'design', 'reels', 'meta', 'googleads', 'brand',
  'copy', 'camera', 'report', 'radar', 'target', 'web', 'influencer', 'idea',
  'team', 'data', 'layers', 'growth', 'system', 'person', 'gem',
]

export default function Icon({ name, className = 'h-6 w-6', strokeWidth = 1.5 }) {
  const path = PATHS[name] || PATHS.spark
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {path}
    </svg>
  )
}
