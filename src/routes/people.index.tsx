import { createFileRoute, Link } from "@tanstack/react-router";
import { Face, Shell } from "@/components/shell";
import { PEOPLE } from "@/data/people";
import { faceFor } from "@/data/photos";
import { FIELDS } from "@/data/types";

export const Route = createFileRoute("/people/")({
  head: () => ({ meta: [{ title: "People · Every Science Fact Ever" }] }),
  component: PeoplePage,
});

function PeoplePage() {
  return (
    <Shell>
      <div className="bg-mist">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <h1 className="font-display text-4xl font-bold">People</h1>
          {FIELDS.map((field) => (
            <section key={field.id} className="mt-8">
              <h2 className="font-display text-2xl font-bold">{field.label}</h2>
              <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {PEOPLE.filter((person) => person.field === field.id).map((person) => (
                  <li key={person.slug}>
                    <Link
                      to="/people/$slug"
                      params={{ slug: person.slug }}
                      className="stamp block bg-paper p-3 text-center"
                    >
                      <Face src={faceFor(person.slug).src} alt={faceFor(person.slug).alt} className="mx-auto h-28 w-28" />
                      <p className="mt-2 font-extrabold leading-tight">{person.name}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </Shell>
  );
}
