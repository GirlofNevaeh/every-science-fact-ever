import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Art, Shell } from "@/components/shell";
import { PLACES } from "@/data/places";

export const Route = createFileRoute("/places")({
  head: () => ({ meta: [{ title: "Places · Every Science Fact Ever" }] }),
  component: PlacesPage,
});

function PlacesPage() {
  const [id, setId] = useState(PLACES[0]?.id ?? "rain");
  const place = PLACES.find((item) => item.id === id) ?? PLACES[0];
  return (
    <Shell>
      <div className="mx-auto max-w-6xl px-4 py-5">
        <h1 className="font-display text-4xl font-bold">Places</h1>
        <p className="mt-2 text-lg">Tap a stop.</p>
        <div className="world mt-4">
          <div className="land" style={{ left: "14%", top: "26%", width: "18%", height: "24%", borderRadius: "46% 54% 42% 58%" }} />
          <div className="land" style={{ left: "24%", top: "52%", width: "12%", height: "28%", borderRadius: "40% 60% 45% 55%" }} />
          <div className="land" style={{ left: "44%", top: "24%", width: "12%", height: "16%", borderRadius: "50%" }} />
          <div className="land" style={{ left: "46%", top: "42%", width: "14%", height: "28%", borderRadius: "48% 52% 40% 60%" }} />
          <div className="land" style={{ left: "58%", top: "20%", width: "28%", height: "32%", borderRadius: "42% 58% 48% 52%" }} />
          <div className="land" style={{ left: "78%", top: "58%", width: "12%", height: "14%", borderRadius: "50% 40% 50% 60%" }} />
          <div className="absolute right-6 bottom-3 left-6 h-4 rounded-full bg-lab" />
          {PLACES.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`absolute z-10 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[3px] border-ink text-base font-extrabold ${
                item.id === place?.id ? "bg-chalk text-ink" : "bg-paper text-ink"
              }`}
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              onClick={() => setId(item.id)}
            >
              {item.pin}
            </button>
          ))}
        </div>
        {place ? (
          <article className="stamp mt-4 grid overflow-hidden bg-paper md:grid-cols-[18rem_1fr]">
            <Art src={place.image} alt={place.alt} className="w-full" />
            <div className="p-5">
              <p className="text-sm font-extrabold uppercase">{place.where}</p>
              <h2 className="font-display text-3xl font-bold">{place.title}</h2>
              <div className="mt-3 space-y-2">
                {place.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </article>
        ) : null}
        <ul className="mt-4 grid gap-2 sm:grid-cols-3">
          {PLACES.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={item.id === place?.id ? "btn btn-chalk w-full" : "btn btn-paper w-full"}
                onClick={() => setId(item.id)}
              >
                {item.pin}. {item.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}
