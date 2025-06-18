// src/data/social-links.ts

interface SocialLink {
  name: string;
  url: string;
  icon?: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "Google", url: "#", icon: "google" },
  { name: "Microsoft", url: "#", icon: "microsoft" },
];
