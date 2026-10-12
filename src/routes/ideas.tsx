import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/ideas")({
  head: () => ({ meta: [{ title: "Ideas · Every Science Fact Ever" }] }),
  component: IdeasPage,
});

function IdeasPage() {
  return (
    <Shell>
      <div className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="font-display text-4xl font-bold">Ideas</h1>
        <p className="mt-3 text-xl">Science is how we test ideas about the natural world.</p>

        <section className="stamp mt-6 bg-leaf-soft p-5">
          <p className="text-sm font-extrabold uppercase">Bench 1</p>
          <h2 className="font-display text-3xl font-bold">A fair test</h2>
          <p className="mt-2 text-lg">Change one thing. Keep the rest the same.</p>
          <p className="mt-2 text-lg">
            If you change the water and the light at the same time, you will not know which change mattered.
          </p>
        </section>

        <section className="stamp mt-4 bg-paper p-5">
          <p className="text-sm font-extrabold uppercase">Bench 2</p>
          <h2 className="font-display text-3xl font-bold">Measuring</h2>
          <p className="mt-2 text-lg">Use the same tool the same way each time.</p>
          <p className="mt-2 text-lg">Write the unit. Centimeters, minutes, or degrees. A number with no unit is hard to trust.</p>
          <p className="mt-2 text-lg">Measure more than once. If the numbers jump around, check your steps.</p>
        </section>

        <section className="stamp mt-4 bg-cobalt p-5 text-lab">
          <p className="text-sm font-extrabold uppercase">Bench 3</p>
          <h2 className="font-display text-3xl font-bold">What would change the result?</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-lg">
            <li>A different amount, even a little one.</li>
            <li>A warmer room, or a darker one.</li>
            <li>Starting the timer late.</li>
            <li>Comparing two things that were not the same at the start.</li>
          </ul>
        </section>

        <h2 className="mt-8 font-display text-3xl font-bold">Three big ideas</h2>
        <article className="mt-3 border-[3px] border-dashed border-ink bg-chalk p-5">
          <p className="text-sm font-extrabold uppercase">A theory</p>
          <h3 className="font-display text-2xl font-bold">Gravity</h3>
          <p className="mt-2 text-lg">Dropped things fall toward Earth. We can measure that pull.</p>
          <p className="mt-2 text-lg">The deep story of how gravity works is a theory. It has passed many tests. Scientists still test it.</p>
          <Link to="/facts/$slug" params={{ slug: "gravity" }} className="btn btn-paper mt-3">
            The gravity card
          </Link>
        </article>
        <article className="mt-3 border-[3px] border-dashed border-ink bg-chalk p-5">
          <p className="text-sm font-extrabold uppercase">A theory</p>
          <h3 className="font-display text-2xl font-bold">Germs</h3>
          <p className="mt-2 text-lg">Germ theory says tiny living things can make us ill. Tests back it up.</p>
          <p className="mt-2 text-lg">Washing hands with soap helps. Some germs help us too, like the ones in yogurt.</p>
          <Link to="/facts/$slug" params={{ slug: "germs" }} className="btn btn-paper mt-3">
            The germ card
          </Link>
        </article>
        <article className="mt-3 border-[3px] border-dashed border-ink bg-chalk p-5">
          <p className="text-sm font-extrabold uppercase">A theory</p>
          <h3 className="font-display text-2xl font-bold">Evolution</h3>
          <p className="mt-2 text-lg">Living things change over a very long time.</p>
          <p className="mt-2 text-lg">Fossils are one way we know. Family trees of living things are another.</p>
          <p className="mt-2 text-lg">This is a theory, not a wild guess. A theory is a big idea that has passed many tests.</p>
          <Link to="/facts/$slug" params={{ slug: "evolution" }} className="btn btn-paper mt-3">
            The evolution card
          </Link>
        </article>

        <aside className="stamp mt-6 bg-paper p-5">
          <p className="text-lg">
            Your family may have other ideas about life. Science does not tell you what to believe at home.
            Science is how we test ideas about the natural world.
          </p>
        </aside>
      </div>
    </Shell>
  );
}
