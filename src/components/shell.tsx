import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { createContext, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { PHOTO_LIST, SHOTS, shotBySrc } from "@/data/photos";
import type { Look } from "@/data/types";
import { Portrait } from "@/components/portrait";
import { useAccess } from "@/components/access-context";
import { LANGS, photoAlt, useI18n } from "@/i18n";
import { photoKeyBySrc } from "@/i18n/content";
import type { UiKey } from "@/i18n/ui";
import { ACCESS_STORAGE, lockSite } from "@/lib/access";

const NAV = [
  { to: "/", key: "home", exact: true },
  { to: "/facts", key: "facts", exact: false },
  { to: "/people", key: "people", exact: false },
  { to: "/places", key: "places", exact: true },
  { to: "/ideas", key: "ideas", exact: true },
  { to: "/time", key: "time", exact: true },
  { to: "/quiz", key: "quiz", exact: true },
  { to: "/work", key: "projects", exact: false },
] as const satisfies readonly { to: string; key: UiKey; exact: boolean }[];

function PreloadPhotos() {
  useEffect(() => {
    for (const shot of PHOTO_LIST) {
      const img = new Image();
      img.decoding = "async";
      img.src = shot.src;
    }
  }, []);
  return null;
}

const InstallContext = createContext<() => void>(() => {});

export function useInstall(): () => void {
  return useContext(InstallContext);
}

function InstallDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n();
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      className="w-[min(100%-1.5rem,28rem)] rounded-card border-[3px] border-ink bg-lab p-0 text-ink"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      <div className="p-5">
        <h2 className="font-display text-2xl font-bold">{t("install")}</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-lg">
          <li>{t("install1")}</li>
          <li>{t("install2")}</li>
          <li>{t("install3")}</li>
        </ol>
        <button type="button" className="btn btn-chalk mt-5 w-full" onClick={onClose}>
          {t("close")}
        </button>
      </div>
    </dialog>
  );
}

export function LanguageButton() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    function close(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);
  const current = LANGS.find((item) => item.id === lang) ?? LANGS[0];
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className="btn btn-chalk h-10 px-3"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {t("langPick")}: {current.name}
      </button>
      {open ? (
        <ul role="listbox" aria-label={t("langPick")} className="absolute right-0 z-50 mt-1 w-56 rounded-card border-[3px] border-ink bg-paper p-1">
          {LANGS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                role="option"
                aria-selected={item.id === lang}
                className={`w-full rounded-full px-3 py-2 text-left text-base font-extrabold ${item.id === lang ? "bg-leaf text-lab" : ""}`}
                onClick={() => {
                  setLang(item.id);
                  setOpen(false);
                }}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function SiteHeader() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  function go(event: FormEvent) {
    event.preventDefault();
    void navigate({ to: "/facts", search: { q: q.trim(), topic: "all" } });
  }
  return (
    <header className="no-print sticky top-0 z-40 border-b-[3px] border-ink bg-lab">
      <div className="border-b-[3px] border-ink bg-paper">
        <div className="mx-auto flex max-w-6xl items-center justify-end px-3 py-1.5">
          <LanguageButton />
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl items-center px-3 pt-2">
        <Link to="/" className="truncate font-display text-lg leading-none font-bold text-ink sm:text-xl">
          {t("site")}
        </Link>
      </div>
      <form className="mx-auto flex max-w-6xl gap-2 px-3 py-2" onSubmit={go}>
        <label className="sr-only" htmlFor="site-search">
          {t("searchLabel")}
        </label>
        <input
          id="site-search"
          value={q}
          onChange={(event) => setQ(event.target.value)}
          placeholder={t("searchTry")}
          className="h-11 min-w-0 flex-1 rounded-full border-[3px] border-ink bg-paper px-4 text-base text-ink"
        />
        <button type="submit" className="btn btn-chalk shrink-0 px-3 sm:px-5">
          {t("searchBtn")}
        </button>
      </form>
      <nav className="mx-auto flex max-w-6xl flex-wrap gap-1 px-2 pb-2" aria-label={t("langPick")}>
        {NAV.map((item) => (
          <Link
            key={item.key}
            to={item.to}
            search={
              item.to === "/facts"
                ? { q: "", topic: "all" }
                : item.to === "/time"
                  ? { step: 0 }
                  : undefined
            }
            activeOptions={{ exact: item.exact }}
            className="nav-link min-w-16 flex-1 px-1"
            activeProps={{ className: "nav-link is-on min-w-16 flex-1 px-1" }}
          >
            {t(item.key)}
          </Link>
        ))}
      </nav>
    </header>
  );
}

function LockButton() {
  const { t } = useI18n();
  const { setOpen } = useAccess();
  const router = useRouter();
  const lock = useServerFn(lockSite);
  return (
    <button
      type="button"
      className="btn btn-paper"
      onClick={() => {
        try {
          localStorage.removeItem(ACCESS_STORAGE);
        } catch {
          /* still clear the cookie */
        }
        setOpen(false);
        void lock()
          .catch(() => {})
          .then(async () => {
            await router.invalidate();
            window.location.assign("/");
          });
      }}
    >
      {t("lockDevice")}
    </button>
  );
}

const COOKIE_NOTICE = "esfe-cookie-ok";

function CookieNotice() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      if (localStorage.getItem(COOKIE_NOTICE) !== "1") setShow(true);
    } catch {
      setShow(true);
    }
  }, []);
  if (!show) return null;
  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-50 border-t-[3px] border-ink bg-paper p-3" role="region" aria-label={t("cookieLabel")}>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
        <p className="max-w-3xl text-base">{t("cookieNote")}</p>
        <button
          type="button"
          className="btn btn-ink bg-ink text-lab"
          onClick={() => {
            try {
              localStorage.setItem(COOKIE_NOTICE, "1");
            } catch {
              /* still hide it for this visit */
            }
            setShow(false);
          }}
        >
          {t("cookieOk")}
        </button>
      </div>
    </div>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const unlocked = useAccess().open;
  return (
    <InstallContext.Provider value={() => setOpen(true)}>
      <PreloadPhotos />
      <div className="min-h-dvh bg-lab text-ink">
        <a href="#content" className="sr-only">
          {t("skip")}
        </a>
        <SiteHeader />
        <main id="content">{children}</main>
        <footer className="no-print mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-8 text-base">
          <p>{t("ages")}</p>
          <div className="flex flex-wrap gap-2">
            {unlocked ? <LockButton /> : null}
            <button type="button" className="btn btn-paper" onClick={() => setOpen(true)}>
              {t("install")}
            </button>
          </div>
        </footer>
        <details className="no-print mx-auto max-w-6xl px-4 pb-8">
          <summary className="cursor-pointer font-extrabold">{t("credits")}</summary>
          <p className="mt-2 text-base">{t("creditNote")}</p>
          <ul className="mt-3 space-y-2 text-sm">
            {PHOTO_LIST.map((shot) => (
              <li key={shot.src}>
                <a href={shot.href} className="font-extrabold underline" target="_blank" rel="noreferrer">
                  {photoAlt(photoKeyBySrc(shot.src, SHOTS) ?? "", shot.alt, lang)}
                </a>
                <span>. {shot.credit}</span>
              </li>
            ))}
          </ul>
        </details>
        <InstallDialog open={open} onClose={() => setOpen(false)} />
        <CookieNotice />
      </div>
    </InstallContext.Provider>
  );
}

export function Art({
  src,
  alt,
  className,
  credit = "overlay",
}: {
  src: string;
  alt: string;
  className?: string;
  credit?: "overlay" | "off";
}) {
  const { lang } = useI18n();
  const shot = shotBySrc(src);
  const line = shot?.credit;
  const key = photoKeyBySrc(src, SHOTS);
  const label = photoAlt(key ?? "", alt || shot?.alt || "", lang);
  return (
    <figure className={`m-0 overflow-hidden bg-chalk ${className ?? ""}`}>
      <img
        src={src}
        alt={label}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="block h-auto w-full"
      />
      {credit === "overlay" && line ? (
        <figcaption className="bg-ink px-2 py-1 text-left text-[0.7rem] leading-snug font-semibold break-words text-lab">
          <a href={shot.href} target="_blank" rel="noreferrer" className="underline decoration-lab/70">
            {line}
          </a>
        </figcaption>
      ) : null}
    </figure>
  );
}

export function Face({
  look,
  name,
  className,
}: {
  look: Look;
  name: string;
  className?: string;
}) {
  const { t } = useI18n();
  return (
    <div className={`overflow-hidden rounded-full border-[3px] border-ink bg-chalk ${className ?? ""}`}>
      <Portrait look={look} label={t("portrait", { name })} className="h-full w-full" />
    </div>
  );
}
