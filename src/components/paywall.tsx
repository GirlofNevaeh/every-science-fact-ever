import { useState, type FormEvent, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AccessProvider, useAccess } from "@/components/access-context";
import { Art, LanguageButton } from "@/components/shell";
import { SHOTS } from "@/data/photos";
import { useI18n } from "@/i18n";
import { ACCESS_STORAGE, unlock } from "@/lib/access";

export function AccessGate({ serverOpen, children }: { serverOpen: boolean; children: ReactNode }) {
  return (
    <AccessProvider serverOpen={serverOpen}>
      <Door>{children}</Door>
    </AccessProvider>
  );
}

function Door({ children }: { children: ReactNode }) {
  const { open, setOpen } = useAccess();
  if (!open) return <Paywall onOpen={() => setOpen(true)} />;
  return children;
}

function Paywall({ onOpen }: { onOpen: () => void }) {
  const { t } = useI18n();
  const openWithKey = useServerFn(unlock);
  const [key, setKey] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault();
    setError(false);
    setBusy(true);
    try {
      const result = await openWithKey({ data: { key } });
      if (!result.ok) {
        setError(true);
        return;
      }
      try {
        localStorage.setItem(ACCESS_STORAGE, result.token);
      } catch {
        /* the cookie still opens a normal visit */
      }
      onOpen();
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="min-h-dvh bg-lab text-ink">
      <div className="border-b-[3px] border-ink bg-paper">
        <div className="mx-auto flex max-w-3xl items-center justify-end px-3 py-1.5">
          <LanguageButton />
        </div>
      </div>
      <main className="mx-auto max-w-3xl px-4 py-6">
        <p className="text-sm font-extrabold tracking-wide uppercase">{t("ages")}</p>
        <h1 className="mt-2 font-display text-4xl leading-tight font-bold sm:text-5xl">{t("site")}</h1>
        <p className="mt-3 text-xl leading-snug">{t("payLead")}</p>
        <Art src={SHOTS.frog.src} alt={SHOTS.frog.alt} className="stamp mt-5 w-full" />
        <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {(
            [
              ["facts", t("facts")],
              ["people", t("scientists")],
              ["places", t("places")],
              ["ideas", t("ideas")],
              ["time", t("time")],
              ["projects", t("projects")],
              ["quiz", t("quiz")],
              ["years", t("allYears")],
            ] as const
          ).map(([id, label]) => (
            <li key={id} className="stamp bg-paper px-3 py-3 text-center text-base font-extrabold">
              {label}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-lg">{t("payInside")}</p>
        <section className="stamp mt-5 bg-chalk p-5">
          <p className="text-lg leading-snug">{t("payBuy")}</p>
          <a href="https://everyschoolever.com" className="btn btn-cobalt mt-4 w-full" target="_blank" rel="noreferrer">
            {t("payBuyLink")}
          </a>
          <form className="mt-5" onSubmit={(event) => void submit(event)}>
            <label htmlFor="access-key" className="block font-extrabold">
              {t("payKeyLabel")}
            </label>
            <input
              id="access-key"
              value={key}
              onChange={(event) => setKey(event.target.value)}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              className="mt-2 h-12 w-full rounded-full border-[3px] border-ink bg-paper px-4 text-lg tracking-wide uppercase"
            />
            {error ? <p className="mt-2 text-base font-extrabold">{t("payBad")}</p> : null}
            <button type="submit" className="btn btn-ink mt-3 w-full bg-ink text-lab" disabled={busy || key.trim().length === 0}>
              {busy ? t("payChecking") : t("payOpen")}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
