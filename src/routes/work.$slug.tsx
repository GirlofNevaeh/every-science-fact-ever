import { createFileRoute, Link } from "@tanstack/react-router";
import { Art, Shell } from "@/components/shell";
import { getWork } from "@/data/work";
import { localizeWork, useI18n, usePageTitle } from "@/i18n";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => getWork(params.slug) ?? null,
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? `${loaderData.title} · Every Science Fact Ever` : "Projects · Every Science Fact Ever" }],
  }),
  component: WorkDetail,
});

function WorkDetail() {
  const raw = Route.useLoaderData();
  const { t, lang } = useI18n();
  const card = raw ? localizeWork(raw, lang) : null;
  usePageTitle(card ? card.title : t("projects"));
  if (!card) {
    return (
      <Shell>
        <div className="mx-auto max-w-3xl px-4 py-8">
          <p>{t("pageMissing")}</p>
          <Link to="/work" className="btn btn-chalk mt-4">
            {t("projects")}
          </Link>
        </div>
      </Shell>
    );
  }
  const label = card.mode === "solo" ? t("onOwn") : card.mode === "team" ? t("withTeam") : t("printWord");
  return (
    <Shell>
      <article className="mx-auto max-w-3xl px-4 py-6">
        <p className="text-sm font-extrabold uppercase">
          {card.stage === "Print" ? t("printWord") : t("primary", { n: card.stage.slice(1) })} · {label}
        </p>
        <h1 className="font-display text-4xl font-bold">{card.title}</h1>
        {card.photo ? <Art src={card.photo} alt="" className="stamp mt-4 w-full" /> : null}
        <div className="lined stamp mt-4 bg-paper p-5">
          <p>
            <span className="font-extrabold">{t("timeLabel")} </span>
            {card.time}
          </p>
          <p className="mt-3 font-extrabold">{t("needLabel")}</p>
          <ul className="list-disc pl-5">
            {card.need.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-3 font-extrabold">{t("stepsLabel")}</p>
          <ol className="list-decimal space-y-2 pl-5">
            {card.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="mt-4">
            <span className="font-extrabold">{t("doneLabel")} </span>
            {card.done}
          </p>
          {card.mode === "print" ? (
            <div className="mt-6 space-y-4">
              {[t("nameLine"), t("notesLine"), t("resultLine")].map((line) => (
                <div key={line}>
                  <p className="font-extrabold">{line}</p>
                  <div className="mt-6 border-b-2 border-ink" />
                  <div className="mt-6 border-b-2 border-ink" />
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="no-print mt-4 flex flex-wrap gap-2">
          <button type="button" className="btn btn-chalk" onClick={() => window.print()}>
            {t("printWord")}
          </button>
          <Link to="/work" className="btn btn-paper">
            {t("allProjects")}
          </Link>
        </div>
      </article>
    </Shell>
  );
}
