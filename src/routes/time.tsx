import { createFileRoute, Link } from "@tanstack/react-router";
import { Art, Shell } from "@/components/shell";
import { STEPS } from "@/data/time";
import { localizeStep, useI18n, usePageTitle } from "@/i18n";

export const Route = createFileRoute("/time")({
  validateSearch: (search: Record<string, unknown>) => {
    const n = Number(search.step);
    const step = Number.isFinite(n) ? Math.min(STEPS.length - 1, Math.max(0, Math.floor(n))) : 0;
    return { step };
  },
  head: () => ({ meta: [{ title: "Time · Every Science Fact Ever" }] }),
  component: TimePage,
});

function TimePage() {
  const { step } = Route.useSearch();
  const { t, lang } = useI18n();
  usePageTitle(t("time"));
  const raw = STEPS[step] ?? STEPS[0];
  if (!raw) return null;
  const item = localizeStep(raw, lang);
  const dark = step % 2 === 1;
  return (
    <Shell>
      <div className={dark ? "bg-cobalt text-lab" : "bg-lab text-ink"}>
        <div className="mx-auto grid max-w-5xl gap-4 px-4 py-6">
          <p className="text-sm font-extrabold uppercase">
            {t("ofN", { n: step + 1, total: STEPS.length })}
          </p>
          <div className="grid items-center gap-4 md:grid-cols-2">
            <Art src={item.image} alt={item.alt} className="stamp w-full" />
            <div>
              <p className="font-extrabold">{item.when}</p>
              <h1 className="font-display text-4xl font-bold sm:text-5xl">{item.title}</h1>
              <p className="mt-3 text-2xl">{item.sentence}</p>
              <p className="mt-3 text-lg">{item.more}</p>
              {item.unsure ? <p className="mt-3 text-lg font-extrabold">{item.unsure}</p> : null}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {step === 0 ? (
              <span className="btn btn-chalk opacity-45">{t("earlier")}</span>
            ) : (
              <Link to="/time" search={{ step: step - 1 }} className="btn btn-chalk">
                {t("earlier")}
              </Link>
            )}
            {step === STEPS.length - 1 ? (
              <span className="btn btn-chalk opacity-45">{t("later")}</span>
            ) : (
              <Link to="/time" search={{ step: step + 1 }} className="btn btn-chalk">
                {t("later")}
              </Link>
            )}
          </div>
        </div>
      </div>
    </Shell>
  );
}
