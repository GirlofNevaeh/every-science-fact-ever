export const LANGS = [
  { id: "en", name: "English" },
  { id: "en-US", name: "American English" },
  { id: "gd", name: "Gàidhlig" },
  { id: "cy", name: "Cymraeg" },
  { id: "ga", name: "Gaeilge" },
  { id: "fr", name: "Français" },
  { id: "it", name: "Italiano" },
  { id: "es", name: "Español" },
  { id: "de", name: "Deutsch" },
  { id: "ru", name: "Русский" },
] as const;

export type Lang = (typeof LANGS)[number]["id"];

export function isLang(value: string): value is Lang {
  return LANGS.some((item) => item.id === value);
}

export function isEnglish(lang: Lang): lang is "en" | "en-US" {
  return lang === "en" || lang === "en-US";
}
