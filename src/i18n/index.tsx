import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { localizeFact, localizePerson, localizePlace, localizeQuestion, localizeStep, localizeWork, photoAlt } from "@/i18n/content";
import { isLang, LANGS, type Lang } from "@/i18n/langs";
import { ui, type UiKey } from "@/i18n/ui";
import type { Kind, TopicId, FieldId } from "@/data/types";

const STORAGE = "esfe-lang";

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

function storedLang(): Lang {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem(STORAGE);
  return saved && isLang(saved) ? saved : "en";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(storedLang);
  useEffect(() => {
    localStorage.setItem(STORAGE, lang);
    document.documentElement.lang = lang;
  }, [lang]);
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
