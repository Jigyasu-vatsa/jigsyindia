export type Language = 'en' | 'hi' | 'mai';

export interface Sector {
  id: string;
  name: string;
  slug: string;
  code: string;
  motto: {
    en: string;
    hi: string;
    mai: string;
  };
  shortDescription: {
    en: string;
    hi: string;
    mai: string;
  };
  fullDescription: {
    en: string;
    hi: string;
    mai: string;
  };
  iconName: string;
  colorScheme: {
    badge: string;
    accent: string;
  };
  deliverables: {
    en: string;
    hi: string;
    mai: string;
  };
  coreOperations: {
    en: string[];
    hi: string[];
    mai: string[];
  };
  services: {
    title: { en: string; hi: string; mai: string };
    description: { en: string; hi: string; mai: string };
    icon: string;
  }[];
  featuredProjects: {
    title: { en: string; hi: string; mai: string };
    shortDescription: { en: string; hi: string; mai: string };
    details: { en: string[]; hi: string[]; mai: string[] };
    status: string;
  }[];
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
}
