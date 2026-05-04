import { DashboardHome } from "@/src/components/sections/dashboard/DashboardHome";
import { DashboardEmpty } from "@/src/components/sections/dashboard/DashboardEmpty";

const HAS_DATA = true;

export default function DashboardPage() {
  return HAS_DATA ? <DashboardHome /> : <DashboardEmpty />;
}
