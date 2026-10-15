import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { localizeFact, localizePerson, localizePlace, localizeQuestion, localizeStep, localizeWork, photoAlt } from "@/i18n/content";
import { isLang, LANGS, type Lang } from "@/i18n/langs";
import { ui, type UiKey } from "@/i18n/ui";
import type { Kind, TopicId, FieldId } from "@/data/types";

const STORAGE = "esfe-lang";
const COOKIE = "esfe-lang";

type I18n = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: UiKey, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18n>({
  lang: "en",
  setLang: () => {},
  t: (key, vars) => ui("en", key, vars),
});

function writeLang(lang: Lang) {
  try {
    localStorage.setItem(STORAGE, lang);
  } catch {
    /* private mode can block storage */
  }
  document.cookie = `${COOKIE}=${encodeURIComponent(lang)}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

export function LangProvider({ initialLang, children }: { initialLang: Lang; children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const setLang = (next: Lang) => {
    setLangState(next);
    writeLang(next);
  };
  useEffect(() => {
    document.documentElement.lang = lang === "en-US" ? "en-US" : lang;
  }, [lang]);
  useEffect(() => {
    const hasCookie = document.cookie.split(/;\s*/).some((part) => part.startsWith(`${COOKIE}=`));
    if (hasCookie) return;
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE);
    } catch {
      saved = null;
    }
    if (saved && isLang(saved) && saved !== lang) setLang(saved);
  }, []);
  const value = useMemo<I18n>(
    () => ({
      lang,
      setLang,
      t: (key, vars) => ui(lang, key, vars),
    }),
    [lang],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18n {
  return useContext(I18nContext);
}

export function usePageTitle(title: string) {
  const { t } = useI18n();
  useEffect(() => {
    document.title = `${title} · ${t("site")}`;
  }, [title, t]);
}

const STAGE_AGES = ["5-6", "6-7", "7-8", "8-9", "9-10", "10-11", "11-12"] as const;

const AGE_WORD: Record<Lang, string> = {
  en: "Age",
  "en-US": "Age",
  gd: "Aois",
  cy: "Oed",
  ga: "Aois",
  fr: "Âge",
  it: "Età",
  es: "Edad",
  ru: "Возраст",
  de: "Alter",
};

export function useStageLabel() {
  const { lang } = useI18n();
  return (stage: string) => {
    const n = Number(stage.replace(/\D/g, ""));
    const range = STAGE_AGES[n - 1];
    return range ? `${AGE_WORD[lang]} ${range}` : stage;
  };
}

export function useKindLabel() {
  const { t } = useI18n();
  return (kind: Kind) => (kind === "theory" ? t("kindTheory") : kind === "guess" ? t("kindGuess") : t("kindFact"));
}

export function useTopicLabel() {
  const { t } = useI18n();
  const map: Record<TopicId, UiKey> = {
    living: "topicLiving",
    materials: "topicMaterials",
    forces: "topicForces",
    earth: "topicEarth",
    space: "topicSpace",
    body: "topicBody",
    unusual: "topicUnusual",
  };
  return (id: string) => (id in map ? t(map[id as TopicId]) : id);
}

export function useFieldLabel() {
  const { t } = useI18n();
  const map: Record<FieldId, UiKey> = {
    living: "fieldLiving",
    materials: "fieldMaterials",
    forces: "fieldForces",
    earth: "fieldEarth",
  };
  return (id: string) => (id in map ? t(map[id as FieldId]) : id);
}

export { LANGS, localizeFact, localizePerson, localizePlace, localizeQuestion, localizeStep, localizeWork, photoAlt };
