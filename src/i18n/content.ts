import type { QuizQuestion } from "@/data/quiz";
import type { Fact, Person, Place, Step, WorkCard } from "@/data/types";
import type { Lang } from "@/i18n/langs";
import gd from "@/i18n/gd.json";
import cy from "@/i18n/cy.json";
import ga from "@/i18n/ga.json";
import fr from "@/i18n/fr.json";
import it from "@/i18n/it.json";
import es from "@/i18n/es.json";
import de from "@/i18n/de.json";
import ru from "@/i18n/ru.json";

type QuizRow = [string, string, string, string, string];

export type ContentPack = {
  facts: Record<string, { title: string; sentence: string; how: string; extra: string; unsure: string; quiz: QuizRow[] }>;
  people: Record<string, { when: string; lines: string[]; extra: string; unsure: string; sceneAlt: string; quiz: QuizRow }>;
  places: Record<string, { title: string; where: string; lines: string[]; alt: string }>;
  time: Record<string, { title: string; when: string; sentence: string; more: string; unsure: string; alt: string }>;
  work: Record<string, { title: string; time: string; need: string[]; steps: string[]; done: string }>;
  quiz: Record<string, QuizRow>;
  photos: Record<string, string>;
};

const PACKS: Record<Exclude<Lang, "en">, ContentPack> = {
  gd: gd as unknown as ContentPack,
  cy: cy as unknown as ContentPack,
  ga: ga as unknown as ContentPack,
  fr: fr as unknown as ContentPack,
  it: it as unknown as ContentPack,
  es: es as unknown as ContentPack,
  de: de as unknown as ContentPack,
  ru: ru as unknown as ContentPack,
};

function rowChoices(row: QuizRow | undefined): [string, string, string, string] | null {
  if (!row || row.length < 5) return null;
  return [row[1], row[2], row[3], row[4]];
}

export function localizeFact(fact: Fact, lang: Lang): Fact {
  if (lang === "en") return fact;
  const row = PACKS[lang].facts[fact.slug];
  if (!row) return fact;
  return {
    ...fact,
    title: row.title || fact.title,
    sentence: row.sentence || fact.sentence,
    how: row.how || fact.how,
    extra: fact.extra ? row.extra || fact.extra : undefined,
    unsure: fact.unsure ? row.unsure || fact.unsure : undefined,
    quiz: fact.quiz.map((item, index) => {
      const quiz = row.quiz[index];
      const choices = rowChoices(quiz);
      if (!quiz || !choices) return item;
      return { ...item, prompt: quiz[0] || item.prompt, choices };
    }),
  };
}

export function localizePerson(person: Person, lang: Lang): Person {
  if (lang === "en") return person;
  const row = PACKS[lang].people[person.slug];
  if (!row) return person;
  const choices = rowChoices(row.quiz);
  return {
    ...person,
    when: row.when || person.when,
    lines: row.lines.length ? row.lines : person.lines,
    extra: person.extra ? row.extra || person.extra : undefined,
    unsure: person.unsure ? row.unsure || person.unsure : undefined,
    sceneAlt: row.sceneAlt || person.sceneAlt,
    quiz: choices ? { ...person.quiz, prompt: row.quiz[0] || person.quiz.prompt, choices } : person.quiz,
  };
}

export function localizePlace(place: Place, lang: Lang): Place {
  if (lang === "en") return place;
  const row = PACKS[lang].places[place.id];
  if (!row) return place;
  return {
    ...place,
    title: row.title || place.title,
    where: row.where || place.where,
    lines: row.lines.length ? row.lines : place.lines,
    alt: row.alt || place.alt,
  };
}

export function localizeStep(step: Step, lang: Lang): Step {
  if (lang === "en") return step;
  const row = PACKS[lang].time[step.id];
  if (!row) return step;
  return {
    ...step,
    title: row.title || step.title,
    when: row.when || step.when,
    sentence: row.sentence || step.sentence,
    more: row.more || step.more,
    unsure: step.unsure ? row.unsure || step.unsure : undefined,
    alt: row.alt || step.alt,
  };
}

export function localizeWork(card: WorkCard, lang: Lang): WorkCard {
  if (lang === "en") return card;
  const row = PACKS[lang].work[card.slug];
  if (!row) return card;
  return {
    ...card,
    title: row.title || card.title,
    time: row.time || card.time,
    need: row.need.length ? row.need : card.need,
    steps: row.steps.length ? row.steps : card.steps,
    done: row.done || card.done,
  };
}

export function localizeQuestion(question: QuizQuestion, lang: Lang): QuizQuestion {
  if (lang === "en") return question;
  const pack = PACKS[lang];
  if (question.id.startsWith("person-")) {
    const row = pack.people[question.id.slice(7)]?.quiz;
    const choices = rowChoices(row);
    if (!row || !choices) return question;
    return { ...question, prompt: row[0] || question.prompt, choices };
  }
  const extra = pack.quiz[question.id];
  const extraChoices = rowChoices(extra);
  if (extra && extraChoices) return { ...question, prompt: extra[0] || question.prompt, choices: extraChoices };
  const cut = question.id.lastIndexOf("-");
  if (cut > 0) {
    const slug = question.id.slice(0, cut);
    const index = Number(question.id.slice(cut + 1));
    const row = pack.facts[slug]?.quiz[index];
    const choices = rowChoices(row);
    if (row && choices && Number.isInteger(index)) {
      return { ...question, prompt: row[0] || question.prompt, choices };
    }
  }
  return question;
}

export function photoAlt(key: string, fallback: string, lang: Lang): string {
  if (lang === "en") return fallback;
  return PACKS[lang].photos[key] || fallback;
}

export function photoKeyBySrc(src: string, shots: Record<string, { src: string }>): string | undefined {
  return Object.entries(shots).find(([, shot]) => shot.src === src)?.[0];
}
