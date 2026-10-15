import { createRootRoute, HeadContent, Outlet, Scripts, redirect } from "@tanstack/react-router";
import { LangProvider } from "@/i18n";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { AccessProvider } from "@/components/access-context";
import { PHOTO_LIST } from "@/data/photos";
import { getAccess } from "@/lib/access";
import appCss from "../styles.css?url";

function safeNext(value: string): string {
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/unlock")) return "/";
  if (value.includes("://") || value.includes("\\")) return "/";
  return value.slice(0, 300);
}

export const Route = createRootRoute({
  beforeLoad: async ({ location }) => {
    const { open, lang } = await getAccess();
    const path = location.pathname;
    if (!open && path !== "/" && path !== "/unlock") {
      throw redirect({
        to: "/unlock",
        search: { from: safeNext(`${path}${location.searchStr}`) },
      });
    }
    return { open, lang };
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Every Science Fact Ever" },
      {
        name: "description",
        content: "Science facts, the people who found them, and ideas you can test. For ages 5 to 12.",
      },
      { name: "theme-color", content: "#1F8A4C" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      ...PHOTO_LIST.map((shot) => ({ rel: "preload", as: "image", href: shot.src })),
    ],
  }),
  component: Root,
});

function Root() {
  const { lang } = Route.useRouteContext();
  const htmlLang = lang === "en-US" ? "en-US" : lang;
  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <LangProvider initialLang={lang}>
          <AuthProvider>
            <Gate />
          </AuthProvider>
        </LangProvider>
        <Scripts />
      </body>
    </html>
  );
}

function Gate() {
  const { open } = Route.useRouteContext();
  return (
    <AccessProvider serverOpen={open}>
      <Outlet />
    </AccessProvider>
  );
}
