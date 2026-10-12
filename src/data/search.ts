import { FACTS } from "@/data/facts";
import { PEOPLE } from "@/data/people";
import { fieldLabel, type Fact, type Person } from "@/data/types";

function factHay(f: Fact): string {
  return [f.title, f.sentence, f.how, f.extra ?? "", f.unsure ?? "", f.topic, f.kind]
    .join(" ")
    .toLowerCase();
}

function personHay(p: Person): string {
  return [p.name, p.when, fieldLabel(p.field), ...p.lines, p.extra ?? "", p.unsure ?? ""]
    .join(" ")
    .toLowerCase();
}

export function matchingFacts(q: string, topic: string): Fact[] {
  const s = q.trim().toLowerCase();
  return FACTS.filter((f) => {
    if (topic !== "all" && f.topic !== topic) return false;
    if (!s) return true;
    return factHay(f).includes(s);
  });
}

export function topicCounts(q: string): Record<string, number> {
  const s = q.trim().toLowerCase();
  const counts: Record<string, number> = {};
  for (const f of FACTS) {
    if (s && !factHay(f).includes(s)) continue;
    counts[f.topic] = (counts[f.topic] ?? 0) + 1;
  }
  return counts;
}

export function matchingPeople(q: string): Person[] {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return PEOPLE.filter((p) => personHay(p).includes(s));
}
