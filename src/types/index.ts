export type Language = 'en' | 'it';

export interface TranslatedString {
  en: string;
  it: string;
}

export interface Service {
  id: string;
  slug: string;
  title: TranslatedString;
  shortDesc: TranslatedString;
  fullDesc: TranslatedString;
  benefits: TranslatedString[];
  capabilities: TranslatedString[];
  heroImage: string;
  images: string[];
  icon: string;
  color: string;
}

export interface Project {
  id: string;
  title: TranslatedString;
  description: TranslatedString;
  location: string;
  serviceCategory: string;
  year: number;
  images: string[];
  featured: boolean;
  client?: string;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: TranslatedString;
  bio: TranslatedString;
  photo: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: TranslatedString;
  mapEmbed: string;
}

export interface SiteContent {
  heroTitle: TranslatedString;
  heroSubtitle: TranslatedString;
  heroImages: string[];
  aboutTitle: TranslatedString;
  aboutText: TranslatedString;
  mission: TranslatedString;
  values: TranslatedString[];
  seoTitle: TranslatedString;
  seoDescription: TranslatedString;
  contactInfo: ContactInfo;
  services: Service[];
  projects: Project[];
  clients: Client[];
  team: TeamMember[];
}
