import { createFileRoute, Link } from "@tanstack/react-router";
import { Art, Shell } from "@/components/shell";
import { getFact } from "@/data/facts";
import { getPerson } from "@/data/people";
import { TOPIC_SHOT } from "@/data/photos";
import { localizeFact, useI18n, useKindLabel, usePageTitle, useTopicLabel } from "@/i18n";

export const Route = createFileRoute("/facts/$slug")({
  loader: ({ params }) => getFact(params.slug) ?? null,
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.title} · Every Science Fact Ever`
          : "Facts · Every Science Fact Ever",
      },
    ],
  }),
  component: FactPage,
});

function FactPage() {
  const raw = Route.useLoaderData();
  const { t, lang } = useI18n();
  const kindName = useKindLabel();
  const topicName = useTopicLabel();
  const fact = raw ? localizeFact(raw, lang) : null;
  usePageTitle(fact ? fact.title : t("facts"));
  if (!fact) {
    return (
      <Shell>
        <div className="mx-auto max-w-3xl px-4 py-8">
          <p className="text-xl">{t("factMissing")}</p>
          <Link to="/facts" search={{ q: "", topic: "all" }} className="btn btn-chalk mt-4">
            {t("allFacts")}
          </Link>
        </div>
      </Shell>
    );
  }
  const art = TOPIC_SHOT[fact.topic] ?? TOPIC_SHOT.living;
  const person = fact.person ? getPerson(fact.person) : undefined;
  const band = fact.kind === "guess" ? "bg-paper" : fact.kind === "theory" ? "bg-chalk" : "bg-leaf-soft";
  return (
    <Shell>
      <article className="mx-auto max-w-5xl px-4 py-5">
        <p className="text-sm font-extrabold uppercase">{topicName(fact.topic)}</p>
        <div className={`stamp mt-3 grid overflow-hidden md:grid-cols-[1fr_16rem] ${band}`}>
          <div className="p-5 sm:p-8">
            <p
              className={
                fact.kind === "guess"
                  ? "inline-flex rounded-full border-2 border-dashed border-ink px-3 py-1 text-sm font-extrabold"
                  : fact.kind === "theory"
                    ? "inline-flex rounded-full bg-ink px-3 py-1 text-sm font-extrabold text-chalk"
                    : "inline-flex rounded-full bg-leaf px-3 py-1 text-sm font-extrabold text-lab"
              }
            >
              {kindName(fact.kind)}
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight font-bold">{fact.sentence}</h1>
            {fact.unsure ? <p className="mt-4 text-lg font-extrabold">{fact.unsure}</p> : null}
          </div>
          <div className="bg-chalk">
            <Art src={art?.src ?? "/photos/frog.jpg"} alt={art?.alt ?? ""} className="w-full" />
          </div>
        </div>
        <section className="stamp mt-4 bg-cobalt p-5 text-lab">
          <h2 className="font-display text-2xl font-bold">{t("how")}</h2>
          <p className="mt-2 text-xl">{fact.how}</p>
        </section>
        {fact.extra ? (
          <aside className="stamp mt-4 bg-paper p-5">
            <h2 className="font-display text-2xl font-bold">{t("oneMore")}</h2>
            <p className="mt-2 text-xl">{fact.extra}</p>
          </aside>
        ) : null}
        {person ? (
          <Link to="/people/$slug" params={{ slug: person.slug }} className="btn btn-paper mt-4">
            {person.name}
          </Link>
        ) : null}
        <div className="mt-4">
          <Link to="/facts" search={{ q: "", topic: fact.topic }} className="btn btn-chalk">
            {t("moreTopic", { topic: topicName(fact.topic) })}
          </Link>
        </div>
      </article>
    </Shell>
  );
}
