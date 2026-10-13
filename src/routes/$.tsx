import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/$")({
  component: Missing,
});

function Missing() {
  const { t } = useI18n();
  return (
    <Shell>
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="font-display text-4xl font-bold">{t("pageMissing")}</h1>
        <Link to="/" className="btn btn-chalk mt-4">
          {t("home")}
        </Link>
      </div>
    </Shell>
  );
}
