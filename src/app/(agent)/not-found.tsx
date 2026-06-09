import { ErrorPage } from "@/components/organisms/ErrorPage";

export default function AgentNotFound() {
  return (
    <ErrorPage
      code="404"
      headline="We can't find that case."
      subline="It may have been reassigned or the link is incorrect."
      actions={[
        { label: "Go to queue →", href: "/agent", variant: "solid" },
      ]}
    />
  );
}
