import { createFileRoute, Link } from "@tanstack/react-router";
import { Face, Shell } from "@/components/shell";
import { matchingFacts, matchingPeople, topicCounts } from "@/data/search";
import { faceFor } from "@/data/photos";
import { TOPICS, kindLabel, type TopicId } from "@/data/types";

type FactsSearch = { q: string; topic: string };

export const Route = createFileRoute("/facts/")({
  validateSearch: (search: Record<string, unknown>): FactsSearch => ({
    q: typeof search.q === "string" ? search.q : "",
    topic: typeof search.topic === "string" ? search.topic : "all",
  }),
  head: () => ({ meta: [{ title: "Facts · Every Science Fact Ever" }] }),
  component: FactsPage,
});

function FactsPage() {
  const { q, topic } = Route.useSearch();
  const counts = topicCounts(q);
  const facts = matchingFacts(q, topic);
  const people = matchingPeople(q);
  return (
    <Shell>
      <div className="mx-auto max-w-6xl px-4 py-5">
        <h1 className="font-display text-4xl font-bold">Facts</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link to="/facts" search={{ q, topic: "all" }} className={topic === "all" ? "chip is-on" : "chip"}>
            All
          </Link>
          {TOPICS.map((item) => {
            const count = counts[item.id] ?? 0;
            const empty = count === 0;
            if (empty) {
              return (
                <button key={item.id} type="button" className="chip" disabled>
                  {item.label}
                </button>
              );
            }
            return (
              <Link
                key={item.id}
                to="/facts"
                search={{ q, topic: item.id }}
                className={topic === item.id ? "chip is-on" : "chip"}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        {people.length > 0 ? (
          <section className="mt-6">
            <h2 className="font-display text-2xl font-bold">People</h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {people.map((person) => (
                <li key={person.slug}>
                  <Link to="/people/$slug" params={{ slug: person.slug }} className="stamp flex items-center gap-3 bg-paper p-3">
                    <Face src={faceFor(person.slug).src} alt={faceFor(person.slug).alt} className="h-16 w-16 shrink-0" />
                    <span>
                      <span className="block font-extrabold">{person.name}</span>
                      <span className="block text-base">{person.lines[0]}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        <section className="mt-6">
          {q ? (
            <h2 className="font-display text-2xl font-bold">
              {facts.length} matching {facts.length === 1 ? "card" : "cards"}
            </h2>
          ) : null}
          {facts.length === 0 ? <p className="mt-3 text-lg">No facts or people match that.</p> : null}
          <ul className="mt-3 divide-y-2 divide-ink border-y-2 border-ink">
            {facts.map((fact) => (
              <li key={fact.slug}>
                <Link to="/facts/$slug" params={{ slug: fact.slug }} className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:items-baseline">
                  <span className={badgeClass(fact.kind)}>{kindLabel(fact.kind)}</span>
                  <span>
                    <span className="block font-extrabold">{fact.title}</span>
                    <span className="block text-base">{fact.sentence}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Shell>
  );
}

function badgeClass(kind: TopicId | string): string {
  if (kind === "theory") return "inline-flex w-fit rounded-full bg-chalk px-2 py-1 text-sm font-extrabold text-ink";
  if (kind === "guess") return "inline-flex w-fit rounded-full border-2 border-dashed border-ink px-2 py-1 text-sm font-extrabold";
  return "inline-flex w-fit rounded-full bg-leaf px-2 py-1 text-sm font-extrabold text-lab";
}
