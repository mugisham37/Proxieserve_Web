import { ErrorPage } from "@/components/organisms/shared/ErrorPage";

export default function ApplicationNotFound() {
  return (
    <ErrorPage
      code="404"
      headline="We can't find that service."
      subline="The service you're looking for may have been renamed or is no longer available."
      actions={[
        { label: "Browse services →", href: "/services", variant: "solid" },
        { label: "Go home", href: "/", variant: "ghost" },
      ]}
    />
  );
}
