import { ErrorPage } from "@/components/organisms/ErrorPage";

export default function AuthNotFound() {
  return (
    <ErrorPage
      code="404"
      headline="That page doesn't exist."
      subline="The link you followed may be expired or incorrect."
      actions={[
        { label: "Sign in →", href: "/login", variant: "solid" },
        { label: "Go home", href: "/", variant: "ghost" },
      ]}
    />
  );
}
