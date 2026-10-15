import { isLang, type Lang } from "@/i18n/langs";
import { createMiddleware, createServerFn } from "@tanstack/react-start";

export const ACCESS_STORAGE = "esfe-access";

const passToken = createMiddleware({ type: "function" }).client(async ({ next }) => {
  let accessToken = "";
  try {
    accessToken = localStorage.getItem(ACCESS_STORAGE) ?? "";
  } catch {
    accessToken = "";
  }
  return next({ sendContext: { accessToken } });
});

export const getAccess = createServerFn({ method: "GET" })
  .middleware([passToken])
  .handler(async ({ context }): Promise<{ open: boolean; lang: Lang }> => {
    const { isOpen, readLang } = await import("./access.server");
    const token = typeof context.accessToken === "string" ? context.accessToken : "";
    const raw = readLang();
    const lang: Lang = isLang(raw) ? raw : "en";
    return { open: isOpen(token), lang };
  });

export const unlock = createServerFn({ method: "POST" })
  .validator((data: { key: string }) => ({ key: String(data?.key ?? "").slice(0, 64) }))
  .handler(async ({ data }) => {
    const { grant } = await import("./access.server");
    return grant(data.key);
  });

export const lockSite = createServerFn({ method: "POST" }).handler(async () => {
  const { revoke } = await import("./access.server");
  return revoke();
});
