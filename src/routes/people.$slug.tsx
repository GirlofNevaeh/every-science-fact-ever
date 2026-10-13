import { createFileRoute, Link } from "@tanstack/react-router";
import { Art, Shell } from "@/components/shell";
import { FACTS } from "@/data/facts";
import { getPerson } from "@/data/people";
import { sceneFor } from "@/data/photos";
import { Portrait } from "@/components/portrait";
import { localizeFact, localizePerson, useFieldLabel, useI18n, usePageTitle } from "@/i18n";

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
  const raw = Route.useLoaderData();
  const { t, lang } = useI18n();
  const fieldName = useFieldLabel();
  const person = raw ? localizePerson(raw, lang) : null;
  usePageTitle(person ? person.name : t("people"));
  if (!person) {
    return (
      <Shell>
        <div className="mx-auto max-w-3xl px-4 py-8">
          <p className="text-xl">{t("personMissing")}</p>
          <Link to="/people" className="btn btn-chalk mt-4">
            {t("allPeople")}
          </Link>
        </div>
      </Shell>
    );
  }
  const related = FACTS.filter((fact) => fact.person === person.slug).map((fact) => localizeFact(fact, lang));
  const scene = sceneFor(person.slug);
  return (
    <Shell>
      <article className="mx-auto grid max-w-5xl gap-4 px-4 py-5 lg:grid-cols-[16rem_1fr]">
        <div className="stamp bg-chalk p-4">
          <Portrait
            look={person.look}
            label={t("portrait", { name: person.name })}
            className="mx-auto h-64 w-full"
          />
          <p className="mt-3 text-center text-sm font-extrabold uppercase">{fieldName(person.field)}</p>
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
        <Art src={scene.src} alt={scene.alt} className="stamp w-full lg:col-span-2" />
        {related.length > 0 ? (
          <section className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold">{t("related")}</h2>
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
