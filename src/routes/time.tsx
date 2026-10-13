import { createFileRoute, Link } from "@tanstack/react-router";
import { Art, Shell } from "@/components/shell";
import { STEPS } from "@/data/time";

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
  const item = STEPS[step] ?? STEPS[0];
  if (!item) return null;
  const dark = step % 2 === 1;
  return (
    <Shell>
      <div className={dark ? "bg-cobalt text-lab" : "bg-lab text-ink"}>
        <div className="mx-auto grid max-w-5xl gap-4 px-4 py-6">
          <p className="text-sm font-extrabold uppercase">
            {step + 1} of {STEPS.length}
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
              <span className="btn btn-chalk opacity-45">Earlier</span>
            ) : (
              <Link to="/time" search={{ step: step - 1 }} className="btn btn-chalk">
                Earlier
              </Link>
            )}
            {step === STEPS.length - 1 ? (
              <span className="btn btn-chalk opacity-45">Later</span>
            ) : (
              <Link to="/time" search={{ step: step + 1 }} className="btn btn-chalk">
                Later
              </Link>
            )}
          </div>
        </div>
      </div>
    </Shell>
  );
}
