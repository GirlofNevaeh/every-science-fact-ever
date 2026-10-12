import { createFileRoute, Link } from "@tanstack/react-router";
import { Art, Face, Shell } from "@/components/shell";
import { FACTS } from "@/data/facts";
import { getPerson } from "@/data/people";
import { faceFor, sceneFor } from "@/data/photos";
import { fieldLabel } from "@/data/types";

export const Route = createFileRoute("/people/$slug")({
  loader: ({ params }) => getPerson(params.slug) ?? null,
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData ? `${loaderData.name} · Every Science Fact Ever` : "People · Every Science Fact Ever",
      },
    ],
  }),
  component: PersonPage,
});

function PersonPage() {
  const person = Route.useLoaderData();
  if (!person) {
    return (
      <Shell>
        <div className="mx-auto max-w-3xl px-4 py-8">
          <p className="text-xl">That person is not here.</p>
          <Link to="/people" className="btn btn-chalk mt-4">
            All people
          </Link>
        </div>
      </Shell>
    );
  }
  const related = FACTS.filter((fact) => fact.person === person.slug);
  const face = faceFor(person.slug);
  const scene = sceneFor(person.slug);
  return (
    <Shell>
      <article className="mx-auto grid max-w-5xl gap-4 px-4 py-5 lg:grid-cols-[16rem_1fr]">
        <div className="stamp bg-chalk p-4">
          <Face src={face.src} alt={face.alt} className="mx-auto h-56 w-56" />
          <p className="mt-3 text-center text-sm leading-snug font-semibold break-words">
            <a href={face.href} className="underline" target="_blank" rel="noreferrer">
              {face.credit}
            </a>
          </p>
          <p className="mt-3 text-center text-sm font-extrabold uppercase">{fieldLabel(person.field)}</p>
        </div>
        <div>
          <h1 className="font-display text-4xl font-bold">{person.name}</h1>
          <p className="mt-2 text-lg">{person.when}</p>
          <div className="mt-4 space-y-3">
            {person.lines.map((line) => (
              <p key={line} className="text-xl">
                {line}
              </p>
            ))}
          </div>
          {person.extra ? <p className="stamp mt-4 bg-paper p-4 text-lg">{person.extra}</p> : null}
          {person.unsure ? <p className="mt-3 text-lg font-extrabold">{person.unsure}</p> : null}
        </div>
        <Art src={scene.src} alt={scene.alt} className="stamp h-56 w-full lg:col-span-2" />
        {related.length > 0 ? (
          <section className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold">Related</h2>
            <ul className="mt-2 space-y-2">
              {related.map((fact) => (
                <li key={fact.slug}>
                  <Link to="/facts/$slug" params={{ slug: fact.slug }} className="font-extrabold underline">
                    {fact.sentence}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </Shell>
  );
}
