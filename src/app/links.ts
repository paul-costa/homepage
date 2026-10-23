export interface LinkTile {
  label: string;
  detail: string;
  /** official logo in public/logos (from the CC0 "logos" set by gilbarbara) */
  logo: string;
  /** accent color, mixed in at low opacity */
  tint: string;
  /** null shows the tile as "coming soon" */
  href: string | null;
}

export const LINKS: LinkTile[] = [
  {
    label: 'LinkedIn',
    detail: 'in/paul-costa',
    logo: 'logos/linkedin.svg',
    tint: '#4a96e8',
    href: 'https://www.linkedin.com/in/paul-costa/',
  },
  {
    label: 'GitHub',
    detail: 'paul-costa',
    logo: 'logos/github.svg',
    tint: '#8b83e6',
    href: 'https://github.com/paul-costa',
  },
  {
    label: 'App Store',
    detail: 'coming soon',
    logo: 'logos/app-store.svg',
    tint: '#e0703f',
    // Once dosed is released: https://apps.apple.com/app/id6818039868 (the developer page needs the
    // artist ID, which only appears on the public listing)
    href: null,
  },
  {
    label: 'Google Play',
    detail: 'coming soon',
    logo: 'logos/google-play.svg',
    tint: '#2bb58a',
    // dosed is in closed testing ("Alpha"), the developer page answers 404 until the first production
    // release: then https://play.google.com/store/apps/dev?id=5655845316536750169
    href: null,
  },
];

export const CONTACT_EMAIL = 'admin@costapaul.com';
