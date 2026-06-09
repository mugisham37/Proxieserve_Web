import { ErrorPage } from "@/components/organisms/ErrorPage";

export default function AdminNotFound() {
  return (
    <ErrorPage
      code="404"
      headline="That admin page doesn't exist."
      subline="The link may be incorrect or that feature has moved."
      actions={[
        { label: "Go to admin →", href: "/admin", variant: "solid" },
      ]}
    />
  );
}
