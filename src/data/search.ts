import { FACTS } from "@/data/facts";
import { PEOPLE } from "@/data/people";
import type { Fact, Person } from "@/data/types";
import { localizeFact, localizePerson } from "@/i18n/content";
import type { Lang } from "@/i18n/langs";

function factHay(fact: Fact, lang: Lang): string {
  const local = localizeFact(fact, lang);
  return [fact.title, fact.sentence, fact.how, fact.extra ?? "", fact.unsure ?? "", local.title, local.sentence, local.how, local.extra ?? "", local.unsure ?? ""]
    .join(" ")
    .toLowerCase();
}

function personHay(person: Person, lang: Lang): string {
  const local = localizePerson(person, lang);
  return [person.name, person.when, ...person.lines, person.extra ?? "", person.unsure ?? "", local.when, ...local.lines, local.extra ?? "", local.unsure ?? ""]
    .join(" ")
    .toLowerCase();
}

export function matchingFacts(q: string, topic: string, lang: Lang = "en"): Fact[] {
  const s = q.trim().toLowerCase();
  return FACTS.filter((fact) => {
    if (topic !== "all" && fact.topic !== topic) return false;
    if (!s) return true;
    return factHay(fact, lang).includes(s);
  });
}

export function topicCounts(q: string, lang: Lang = "en"): Record<string, number> {
  const s = q.trim().toLowerCase();
  const counts: Record<string, number> = {};
  for (const fact of FACTS) {
    if (s && !factHay(fact, lang).includes(s)) continue;
    counts[fact.topic] = (counts[fact.topic] ?? 0) + 1;
  }
  return counts;
}

export function matchingPeople(q: string, lang: Lang = "en"): Person[] {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return PEOPLE.filter((person) => personHay(person, lang).includes(s));
}
