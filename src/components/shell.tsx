import { Link, useNavigate } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { PHOTO_LIST, shotBySrc } from "@/data/photos";

const NAV = [
  { to: "/", label: "Home", exact: true },
  { to: "/facts", label: "Facts", exact: false },
  { to: "/people", label: "People", exact: false },
  { to: "/places", label: "Places", exact: true },
  { to: "/ideas", label: "Ideas", exact: true },
  { to: "/time", label: "Time", exact: true },
  { to: "/quiz", label: "Quiz", exact: true },
  { to: "/work", label: "Work", exact: false },
] as const;

const InstallContext = createContext<() => void>(() => {});

export function useInstall(): () => void {
  return useContext(InstallContext);
}

function InstallDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
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
        <h2 className="font-display text-2xl font-bold">Add to iPhone or iPad</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-lg">
          <li>Use Safari.</li>
          <li>Tap Share.</li>
          <li>Tap Add to Home Screen.</li>
        </ol>
        <button type="button" className="btn btn-chalk mt-5 w-full" onClick={onClose}>
          Close
        </button>
      </div>
    </dialog>
  );
}

function SiteHeader() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  function go(event: FormEvent) {
    event.preventDefault();
    void navigate({ to: "/facts", search: { q: q.trim(), topic: "all" } });
  }
  return (
    <header className="no-print sticky top-0 z-40 border-b-[3px] border-ink bg-lab">
      <div className="mx-auto flex max-w-6xl items-center px-3 pt-2">
        <Link to="/" className="truncate font-display text-lg leading-none font-bold text-ink sm:text-xl">
          Every Science Fact Ever
        </Link>
      </div>
      <form className="mx-auto flex max-w-6xl gap-2 px-3 py-2" onSubmit={go}>
        <label className="sr-only" htmlFor="site-search">
          Search facts and people
        </label>
        <input
          id="site-search"
          value={q}
          onChange={(event) => setQ(event.target.value)}
          placeholder="Try frog, magnet, or Curie"
          className="h-11 min-w-0 flex-1 rounded-full border-[3px] border-ink bg-paper px-4 text-base text-ink"
        />
        <button type="submit" className="btn btn-chalk shrink-0 px-3 sm:px-5">
          SEARCH
        </button>
      </form>
      <nav className="mx-auto grid max-w-6xl grid-cols-8 gap-1 px-2 pb-2" aria-label="Pages">
        {NAV.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            search={
              item.to === "/facts"
                ? { q: "", topic: "all" }
                : item.to === "/time"
                  ? { step: 0 }
                  : undefined
            }
            activeOptions={{ exact: item.exact }}
            className="nav-link"
            activeProps={{ className: "nav-link is-on" }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <InstallContext.Provider value={() => setOpen(true)}>
      <div className="min-h-dvh bg-lab text-ink">
        <a href="#content" className="sr-only">
          Skip to content
        </a>
        <SiteHeader />
        <main id="content">{children}</main>
        <footer className="no-print mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-8 text-base">
          <p>For ages 5 to 12.</p>
          <button type="button" className="btn btn-paper" onClick={() => setOpen(true)}>
            Add to iPhone or iPad
          </button>
        </footer>
        <details className="no-print mx-auto max-w-6xl px-4 pb-8">
          <summary className="cursor-pointer font-extrabold">Photo credits</summary>
          <p className="mt-2 text-base">Pictures were resized to fit. Nothing else was changed.</p>
          <ul className="mt-3 space-y-2 text-sm">
            {PHOTO_LIST.map((shot) => (
              <li key={shot.src}>
                <a href={shot.href} className="font-extrabold underline" target="_blank" rel="noreferrer">
                  {shot.alt}
                </a>
                <span>. {shot.credit}</span>
              </li>
            ))}
          </ul>
        </details>
        <InstallDialog open={open} onClose={() => setOpen(false)} />
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
  const shot = shotBySrc(src);
  const line = shot?.credit;
  return (
    <figure className={`relative m-0 overflow-hidden bg-cobalt-soft ${className ?? ""}`}>
      <img src={src} alt={alt} className="h-full w-full object-cover" />
      {credit === "overlay" && line ? (
        <figcaption className="absolute inset-x-0 bottom-0 bg-ink/85 px-2 py-1 text-left text-[0.7rem] leading-snug font-semibold break-words text-lab">
          <a href={shot.href} target="_blank" rel="noreferrer" className="underline decoration-lab/70">
            {line}
          </a>
        </figcaption>
      ) : null}
    </figure>
  );
}

export function Face({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-full border-[3px] border-ink object-cover object-[center_15%] ${className ?? ""}`}
    />
  );
}
