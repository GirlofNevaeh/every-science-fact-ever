import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/shell";
import { STAGES, WORK } from "@/data/work";

export const Route = createFileRoute("/work/")({
  head: () => ({ meta: [{ title: "Work · Every Science Fact Ever" }] }),
  component: WorkPage,
});

function WorkPage() {
  const [stage, setStage] = useState<(typeof STAGES)[number]>("P1");
  const cards = WORK.filter((card) => card.stage === stage);
  const prints = WORK.filter((card) => card.mode === "print");
  return (
    <Shell>
      <div className="lined">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <h1 className="font-display text-4xl font-bold">Work</h1>
          <p className="mt-2 text-lg">Primary 1 through Primary 7. Work on your own, or with a team.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {STAGES.map((item) => (
              <button
                key={item}
                type="button"
                className={item === stage ? "chip is-on" : "chip"}
                onClick={() => setStage(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {cards.map((card) => (
              <article key={card.slug} className="stamp bg-paper p-4">
                <p className="text-sm font-extrabold uppercase">{card.mode === "solo" ? "On your own" : "With a team"}</p>
                <h2 className="font-display text-2xl font-bold">{card.title}</h2>
                <p className="mt-2">
                  <span className="font-extrabold">Time. </span>
                  {card.time}
                </p>
                <p className="mt-1">
                  <span className="font-extrabold">What you need. </span>
                  {card.need.join(", ")}
                </p>
                <ol className="mt-2 list-decimal space-y-1 pl-5">
                  {card.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <p className="mt-2">
                  <span className="font-extrabold">Finished when. </span>
                  {card.done}
                </p>
                <Link to="/work/$slug" params={{ slug: card.slug }} className="btn btn-chalk mt-3">
                  Open
                </Link>
              </article>
            ))}
          </div>
          <h2 className="mt-8 font-display text-3xl font-bold">Print a page</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {prints.map((card) => (
              <Link key={card.slug} to="/work/$slug" params={{ slug: card.slug }} className="stamp block bg-chalk p-4">
                <p className="font-display text-2xl font-bold">{card.title}</p>
                <p className="mt-1">{card.time}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}
