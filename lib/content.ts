import type ruData from "./content.ru.json";
import type enData from "./content.en.json";
import ruJson from "./content.ru.json";
import enJson from "./content.en.json";

export type Lang = "ru" | "en";

export interface Module {
  n: string;
  title: string;
  desc: string;
}

export interface FormatPart {
  tag: string;
  title: string;
  desc: string;
  bullets: string[];
}

export interface Person {
  name: string;
  role: string;
  phone?: string;
  tg?: string;
  email: string;
}

export interface Dictionary {
  meta: { title: string; description: string };
  nav: {
    about: string;
    format: string;
    modules: string;
    audience: string;
    speaker: string;
    contacts: string;
    cta: string;
  };
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: { value: string; label: string }[];
  };
  about: {
    tag: string;
    title: string;
    paragraphs: string[];
    radar: { letter: string; word: string }[];
  };
  format: {
    tag: string;
    title: string;
    intro: string;
    parts: FormatPart[];
  };
  modules: {
    tag: string;
    title: string;
    intro: string;
    list: Module[];
  };
  audience: {
    tag: string;
    title: string;
    intro: string;
    list: { title: string; desc: string }[];
  };
  speaker: {
    tag: string;
    title: string;
    name: string;
    role: string;
    initials?: string;
    bio: string[];
    mission?: string;
    producerName: string;
    producerRole: string;
    producerInitials?: string;
  };
  gallery: { tag: string; title: string; subtitle: string };
  pricing: {
    tag: string;
    title: string;
    intro: string;
    blocks: { title: string; desc: string; items: string[] }[];
    cards?: { title: string; price: string; desc: string; featured?: boolean }[];
    note: string;
  };
  contacts: {
    tag: string;
    title: string;
    intro: string;
    persons: Person[];
    form: {
      name: string;
      phone: string;
      email: string;
      message: string;
      submit: string;
      success: string;
    };
  };
  footer: { rights: string; tagline: string };
}

export const dictionaries: Record<Lang, Dictionary> = {
  ru: ruJson as Dictionary,
  en: enJson as Dictionary,
};

export type { ruData, enData };
