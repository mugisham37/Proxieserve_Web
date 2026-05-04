import { cn } from "@/src/lib/utils";

interface DashSectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function DashSectionTitle({ children, className }: DashSectionTitleProps) {
  return (
    <h2 className={cn("text-[15px] font-semibold mb-3", className)}>
      {children}
    </h2>
  );
}
