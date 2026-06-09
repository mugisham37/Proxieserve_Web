import { ErrorPage } from "@/components/organisms/shared/ErrorPage";

export default function PaymentNotFound() {
  return (
    <ErrorPage
      code="404"
      headline="We can't find that payment page."
      subline="The payment link may have expired. No charge has been made."
      note="No charge was made — your card or mobile money is completely safe."
      actions={[
        { label: "Go to dashboard →", href: "/dashboard", variant: "solid" },
        { label: "Contact support", href: "/contact", variant: "ghost" },
      ]}
    />
  );
}
