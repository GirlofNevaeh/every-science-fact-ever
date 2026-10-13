import { createFileRoute, Link } from "@tanstack/react-router";
import { Art, Shell } from "@/components/shell";
import { getWork } from "@/data/work";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => getWork(params.slug) ?? null,
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? `${loaderData.title} · Every Science Fact Ever` : "Projects · Every Science Fact Ever" }],
  }),
  component: WorkDetail,
});

function WorkDetail() {
  const card = Route.useLoaderData();
  if (!card) {
    return (
      <Shell>
        <div className="mx-auto max-w-3xl px-4 py-8">
          <p>That page is not here.</p>
          <Link to="/work" className="btn btn-chalk mt-4">
            Projects
          </Link>
        </div>
      </Shell>
    );
  }
  const label = card.mode === "solo" ? "On your own" : card.mode === "team" ? "With a team" : "Print";
  return (
    <Shell>
      <article className="mx-auto max-w-3xl px-4 py-6">
        <p className="text-sm font-extrabold uppercase">
          {card.stage === "Print" ? "Print" : `Primary ${card.stage.slice(1)}`} · {label}
        </p>
        <h1 className="font-display text-4xl font-bold">{card.title}</h1>
        {card.photo ? <Art src={card.photo} alt="" className="stamp mt-4 w-full" /> : null}
        <div className="lined stamp mt-4 bg-paper p-5">
          <p>
            <span className="font-extrabold">Time. </span>
            {card.time}
          </p>
          <p className="mt-3 font-extrabold">What you need.</p>
          <ul className="list-disc pl-5">
            {card.need.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-3 font-extrabold">Steps.</p>
          <ol className="list-decimal space-y-2 pl-5">
            {card.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="mt-4">
            <span className="font-extrabold">Finished when. </span>
            {card.done}
          </p>
          {card.mode === "print" ? (
            <div className="mt-6 space-y-4">
              {["Name", "Notes", "Result"].map((line) => (
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
            Print
          </button>
          <Link to="/work" className="btn btn-paper">
            All projects
          </Link>
        </div>
      </article>
    </Shell>
  );
}
