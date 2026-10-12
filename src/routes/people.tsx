import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/people")({
  component: () => <Outlet />,
});
