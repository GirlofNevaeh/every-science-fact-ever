import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Art, Face, Shell, useInstall } from "@/components/shell";
import { getFact } from "@/data/facts";
import { getPerson } from "@/data/people";
import { SHOTS } from "@/data/photos";
import { PLACES } from "@/data/places";
import { STEPS } from "@/data/time";
import { STAGES, WORK } from "@/data/work";
import { localizeFact, localizePlace, localizeStep, localizeWork, useI18n, useKindLabel, usePageTitle } from "@/i18n";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

const LIVING = ["plants-food", "whales", "bees-pollen"];
const MATERIALS = ["water-h2o", "diamond-graphite", "ice-floats"];
const FORCES = ["magnet-poles", "sound-medium", "friction"];
const SKY = ["earth-sun", "year-trip", "sun-star", "moon-light"];
const ODD = ["mercury", "octopus-hearts", "banana-berry", "venus-day"];
const FACES = ["goodall", "curie", "carver", "jemison"];

function Home() {
  return (
    <Shell>
      <HomeBody />
    </Shell>
  );
}

function HomeBody() {
  const navigate = useNavigate();
  const openInstall = useInstall();
  const { t, lang } = useI18n();
  const kindName = useKindLabel();
  usePageTitle(t("home"));
  const [q, setQ] = useState("");
  const heroRaw = getFact("wood-frog");
  const hero = heroRaw ? localizeFact(heroRaw, lang) : undefined;
  function search(event: FormEvent) {
    event.preventDefault();
    void navigate({ to: "/facts", search: { q: q.trim(), topic: "all" } });
  }
  function surprise() {
    const pool = ["mercury", "octopus-hearts", "venus-day", "ice-floats", "dna", "sound-medium"];
    const slug = pool[Math.floor(Math.random() * pool.length)] ?? "wood-frog";
    void navigate({ to: "/facts/$slug", params: { slug } });
  }
  return (
    <div className="mx-auto max-w-6xl px-4 py-5">
      <section className="grid items-stretch gap-4 lg:grid-cols-[1.3fr_1fr]">
        <Art src={SHOTS.frog.src} alt={SHOTS.frog.alt} className="stamp w-full" />
        {hero ? (
          <div className="stamp flex flex-col justify-between bg-chalk p-5">
            <p className="text-sm font-extrabold tracking-wide uppercase">{kindName(hero.kind)}</p>
            <h1 className="font-display text-3xl leading-tight font-bold sm:text-4xl">{hero.sentence}</h1>
            <p className="mt-3 text-lg">{hero.how}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to="/facts/$slug" params={{ slug: hero.slug }} className="btn btn-ink bg-ink text-lab">
                {t("readIt")}
              </Link>
              <button type="button" className="btn btn-paper" onClick={surprise}>
                {t("surprise")}
              </button>
            </div>
          </div>
        ) : null}
      </section>

      <form className="mt-4 flex gap-2" onSubmit={search}>
        <label className="sr-only" htmlFor="home-search">
          {t("searchLabel")}
        </label>
        <input
          id="home-search"
          value={q}
          onChange={(event) => setQ(event.target.value)}
          placeholder={t("searchLabel")}
          className="h-12 min-w-0 flex-1 rounded-full border-[3px] border-ink bg-paper px-4 text-lg"
        />
        <button type="submit" className="btn btn-leaf px-4">
          {t("searchBtn")}
        </button>
      </form>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="stamp overflow-hidden bg-leaf-soft">
          <Art src={SHOTS.bee.src} alt={SHOTS.bee.alt} className="w-full" />
          <div className="p-4">
            <h2 className="font-display text-3xl font-bold">{t("fieldLiving")}</h2>
            <ul className="mt-3 space-y-2">
              {LIVING.map((slug) => {
                const raw = getFact(slug);
                const fact = raw ? localizeFact(raw, lang) : undefined;
                return fact ? (
                  <li key={slug}>
                    <Link to="/facts/$slug" params={{ slug }} className="text-lg font-extrabold underline decoration-ink/30">
                      {fact.sentence}
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        </div>
        <div className="stamp bg-paper p-4">
          <h2 className="font-display text-3xl font-bold">{t("topicMaterials")}</h2>
          <ul className="mt-3 divide-y-2 divide-ink">
            {MATERIALS.map((slug) => {
              const raw = getFact(slug);
              const fact = raw ? localizeFact(raw, lang) : undefined;
              return fact ? (
                <li key={slug} className="py-3">
                  <Link to="/facts/$slug" params={{ slug }} className="font-extrabold">
                    {fact.title}
                  </Link>
                  <p className="text-base">{fact.sentence}</p>
                </li>
              ) : null;
            })}
          </ul>
        </div>
      </section>

      <section className="mt-4 grid gap-3 sm:grid-cols-3">
        {FORCES.map((slug, index) => {
          const raw = getFact(slug);
          const fact = raw ? localizeFact(raw, lang) : undefined;
          if (!fact) return null;
          return (
            <Link
              key={slug}
              to="/facts/$slug"
              params={{ slug }}
              className={`stamp block p-4 ${index === 1 ? "bg-cobalt text-lab" : "bg-paper"}`}
            >
              <p className="font-display text-4xl font-bold">0{index + 1}</p>
              <h2 className="mt-2 font-display text-2xl font-bold">{t("topicForces")}</h2>
              <p className="mt-2 text-lg">{fact.sentence}</p>
            </Link>
          );
        })}
      </section>

      <section className="stamp mt-4 grid overflow-hidden bg-cobalt text-lab md:grid-cols-2">
        <Art src={SHOTS.earth.src} alt={SHOTS.earth.alt} className="w-full" />
        <div className="p-5">
          <h2 className="font-display text-3xl font-bold">{t("earthSky")}</h2>
          <ul className="mt-3 space-y-2">
            {SKY.map((slug) => {
              const raw = getFact(slug);
              const fact = raw ? localizeFact(raw, lang) : undefined;
              return fact ? (
                <li key={slug}>
                  <Link to="/facts/$slug" params={{ slug }} className="font-extrabold underline">
                    {fact.sentence}
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
          <Art src={SHOTS.jupiter.src} alt={SHOTS.jupiter.alt} className="mt-4 w-full rounded-xl border-[3px] border-ink" />
        </div>
      </section>

      <section className="mt-4">
        <h2 className="font-display text-3xl font-bold">{t("unusual")}</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {ODD.map((slug) => {
            const raw = getFact(slug);
            const fact = raw ? localizeFact(raw, lang) : undefined;
            if (!fact) return null;
            return (
              <Link key={slug} to="/facts/$slug" params={{ slug }} className="stamp block bg-chalk p-4">
                <p className="text-sm font-extrabold uppercase">{kindName(fact.kind)}</p>
                <p className="mt-1 text-xl font-extrabold">{fact.sentence}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-8">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-display text-3xl font-bold">{t("time")}</h2>
          <Link to="/time" search={{ step: 0 }} className="btn btn-paper">
            {t("stepThrough")}
          </Link>
        </div>
        <ol className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((raw, index) => {
            const step = localizeStep(raw, lang);
            return (
            <li key={step.id}>
              <Link to="/time" search={{ step: index }} className="stamp flex gap-3 bg-paper p-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink font-extrabold text-lab">
                  {index + 1}
                </span>
                <span>
                  <span className="block font-extrabold">{step.title}</span>
                  <span className="block text-base">{step.when}</span>
                </span>
              </Link>
            </li>
            );
          })}
        </ol>
      </section>

      <section className="mt-8">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-display text-3xl font-bold">{t("places")}</h2>
          <Link to="/places" className="btn btn-cobalt">
            {t("openMap")}
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {PLACES.map((raw) => {
            const place = localizePlace(raw, lang);
            return (
            <Link key={place.id} to="/places" className="stamp overflow-hidden bg-paper">
              <Art src={place.image} alt={place.alt} credit="off" className="w-full" />
              <p className="p-3 font-extrabold">{place.title}</p>
            </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-8">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-display text-3xl font-bold">{t("projects")}</h2>
          <Link to="/work" className="btn btn-leaf">
            {t("allYears")}
          </Link>
        </div>
        <p className="mt-2 text-lg">{t("projectsLead")}</p>
        <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STAGES.map((stage) => {
            const soloRaw = WORK.find((card) => card.stage === stage && card.mode === "solo");
            const teamRaw = WORK.find((card) => card.stage === stage && card.mode === "team");
            const solo = soloRaw ? localizeWork(soloRaw, lang) : undefined;
            const team = teamRaw ? localizeWork(teamRaw, lang) : undefined;
            return (
              <li key={stage} className="stamp bg-paper p-3">
                <p className="font-extrabold">{t("primary", { n: stage.slice(1) })}</p>
                {solo ? (
                  <Link to="/work/$slug" params={{ slug: solo.slug }} className="mt-1 block underline">
                    {solo.title}
                  </Link>
                ) : null}
                {team ? (
                  <Link to="/work/$slug" params={{ slug: team.slug }} className="mt-1 block underline">
                    {team.title}
                  </Link>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-8">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-display text-3xl font-bold">{t("scientists")}</h2>
          <Link to="/people" className="btn btn-paper">
            {t("all24")}
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {FACES.map((slug) => {
            const person = getPerson(slug);
            if (!person) return null;
            return (
              <Link key={slug} to="/people/$slug" params={{ slug }} className="stamp bg-paper p-3 text-center">
                <Face look={person.look} name={person.name} className="mx-auto h-28 w-28" />
                <p className="mt-2 font-extrabold">{person.name}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="stamp mt-8 bg-cobalt p-5 text-lab">
        <h2 className="font-display text-3xl font-bold">{t("install")}</h2>
        <p className="mt-2 text-lg">{t("safariSteps")}</p>
        <button type="button" className="btn btn-chalk mt-4" onClick={openInstall}>
          {t("showSteps")}
        </button>
      </section>
    </div>
  );
}
