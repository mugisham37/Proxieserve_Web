import { ErrorPage } from "@/components/organisms/ErrorPage";

export default function DashboardNotFound() {
  return (
    <ErrorPage
      code="404"
      headline="We can't find that page."
      subline="It may have moved or no longer exists."
      actions={[
        { label: "Go to dashboard →", href: "/dashboard", variant: "solid" },
        { label: "Browse services", href: "/services", variant: "ghost" },
      ]}
    />
  );
}
