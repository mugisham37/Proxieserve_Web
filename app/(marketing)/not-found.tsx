import { ErrorPage } from "@/components/organisms/ErrorPage";

export default function MarketingNotFound() {
  return (
    <ErrorPage
      code="404"
      actions={[
        { label: "Go home →", href: "/", variant: "solid" },
        { label: "Browse services", href: "/services", variant: "ghost" },
        { label: "Track an application", href: "/track", variant: "ghost" },
      ]}
    />
  );
}
