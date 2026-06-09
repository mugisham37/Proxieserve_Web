import { ErrorPage } from "@/components/organisms/shared/ErrorPage";

export const metadata = {
  title: "Page not found — ProxiServe",
};

export default function NotFound() {
  return (
    <ErrorPage
      code="404"
      actions={[
        { label: "Go home →", href: "/", variant: "solid" },
        { label: "Track an application", href: "/track", variant: "ghost" },
      ]}
    />
  );
}
