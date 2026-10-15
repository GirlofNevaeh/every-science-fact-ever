import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { useAccess } from "@/components/access-context";
import { Art, LanguageButton, Shell } from "@/components/shell";
import { SHOTS } from "@/data/photos";
import { useI18n } from "@/i18n";
import { ACCESS_STORAGE, unlock } from "@/lib/access";

function safeNext(value: unknown): string {
  if (typeof value !== "string") return "/";
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/unlock")) return "/";
  if (value.includes("://") || value.includes("\\")) return "/";
  return value.slice(0, 300);
}

export const Route = createFileRoute("/unlock")({
  validateSearch: (search: Record<string, unknown>) => ({ from: safeNext(search.from) }),
  beforeLoad: ({ context, search }) => {
    if (context.open) {
      throw redirect({ href: search.from === "/" ? "/facts" : search.from });
    }
  },
  component: UnlockPage,
});

function UnlockPage() {
  const { from } = Route.useSearch();
  return (
    <Shell>
      <UnlockForm from={from} />
    </Shell>
  );
}

function UnlockForm({ from }: { from: string }) {
  const { t } = useI18n();
  const router = useRouter();
  const { setOpen } = useAccess();
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
      setOpen(true);
      const next = from === "/" ? "/facts" : from;
      await router.invalidate();
      window.location.assign(next);
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="mb-4 flex justify-end lg:hidden">
        <LanguageButton />
      </div>
      <p className="text-sm font-extrabold tracking-wide uppercase">{t("ages")}</p>
      <h1 className="mt-2 font-display text-4xl leading-tight font-bold">{t("site")}</h1>
      <p className="mt-3 text-xl leading-snug">{t("payLead")}</p>
      <Art src={SHOTS.frog.src} alt={SHOTS.frog.alt} className="stamp mt-5 w-full" />
      <p className="mt-4 text-lg">{t("payInside")}</p>
      <section className="stamp mt-5 bg-chalk p-5">
        <p className="text-lg leading-snug">{t("payBuy")}</p>
        <a href="https://www.everyschoolever.com/pricing?plan=" className="btn btn-cobalt mt-4 w-full" target="_blank" rel="noreferrer">
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
    </div>
  );
}
