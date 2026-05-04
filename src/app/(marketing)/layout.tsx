import { MarketingNav } from "@/src/components/layout/MarketingNav";
import { MarketingFooter } from "@/src/components/layout/MarketingFooter";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MarketingNav />
      <main className="min-h-[calc(100vh-56px)]">{children}</main>
      <MarketingFooter />
    </>
  );
}
