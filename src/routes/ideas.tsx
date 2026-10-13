import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { useI18n, usePageTitle } from "@/i18n";

export const Route = createFileRoute("/ideas")({
  head: () => ({ meta: [{ title: "Ideas · Every Science Fact Ever" }] }),
  component: IdeasPage,
});

function IdeasPage() {
  const { t } = useI18n();
  usePageTitle(t("ideas"));
  return (
    <Shell>
      <div className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="font-display text-4xl font-bold">{t("ideas")}</h1>
        <p className="mt-3 text-xl">{t("ideasIntro")}</p>

        <section className="stamp mt-6 bg-leaf-soft p-5">
          <p className="text-sm font-extrabold uppercase">{t("bench", { n: 1 })}</p>
          <h2 className="font-display text-3xl font-bold">{t("fair")}</h2>
          <p className="mt-2 text-lg">{t("fair1")}</p>
          <p className="mt-2 text-lg">{t("fair2")}</p>
        </section>

        <section className="stamp mt-4 bg-paper p-5">
          <p className="text-sm font-extrabold uppercase">{t("bench", { n: 2 })}</p>
          <h2 className="font-display text-3xl font-bold">{t("measuring")}</h2>
          <p className="mt-2 text-lg">{t("measure1")}</p>
          <p className="mt-2 text-lg">{t("measure2")}</p>
          <p className="mt-2 text-lg">{t("measure3")}</p>
        </section>

        <section className="stamp mt-4 bg-cobalt p-5 text-lab">
          <p className="text-sm font-extrabold uppercase">{t("bench", { n: 3 })}</p>
          <h2 className="font-display text-3xl font-bold">{t("changeTitle")}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-lg">
            <li>{t("change1")}</li>
            <li>{t("change2")}</li>
            <li>{t("change3")}</li>
            <li>{t("change4")}</li>
          </ul>
        </section>

        <h2 className="mt-8 font-display text-3xl font-bold">{t("threeIdeas")}</h2>
        <article className="mt-3 border-[3px] border-dashed border-ink bg-chalk p-5">
          <p className="text-sm font-extrabold uppercase">{t("kindTheory")}</p>
          <h3 className="font-display text-2xl font-bold">{t("gravity")}</h3>
          <p className="mt-2 text-lg">{t("gravity1")}</p>
          <p className="mt-2 text-lg">{t("gravity2")}</p>
          <Link to="/facts/$slug" params={{ slug: "gravity" }} className="btn btn-paper mt-3">
            {t("gravityCard")}
          </Link>
        </article>
        <article className="mt-3 border-[3px] border-dashed border-ink bg-chalk p-5">
          <p className="text-sm font-extrabold uppercase">{t("kindTheory")}</p>
          <h3 className="font-display text-2xl font-bold">{t("germsTitle")}</h3>
          <p className="mt-2 text-lg">{t("germs1")}</p>
          <p className="mt-2 text-lg">{t("germs2")}</p>
          <Link to="/facts/$slug" params={{ slug: "germs" }} className="btn btn-paper mt-3">
            {t("germsCard")}
          </Link>
        </article>
        <article className="mt-3 border-[3px] border-dashed border-ink bg-chalk p-5">
          <p className="text-sm font-extrabold uppercase">{t("kindTheory")}</p>
          <h3 className="font-display text-2xl font-bold">{t("evolution")}</h3>
          <p className="mt-2 text-lg">{t("evo1")}</p>
          <p className="mt-2 text-lg">{t("evo2")}</p>
          <p className="mt-2 text-lg">{t("evo3")}</p>
          <Link to="/facts/$slug" params={{ slug: "evolution" }} className="btn btn-paper mt-3">
            {t("evoCard")}
          </Link>
        </article>

        <aside className="stamp mt-6 bg-paper p-5">
          <p className="text-lg">{t("family")}</p>
        </aside>
      </div>
    </Shell>
  );
}
