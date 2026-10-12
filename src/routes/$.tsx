import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/$")({
  component: Missing,
});

function Missing() {
  return (
    <Shell>
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="font-display text-4xl font-bold">That page is not here.</h1>
        <Link to="/" className="btn btn-chalk mt-4">
          Home
        </Link>
      </div>
    </Shell>
  );
}
