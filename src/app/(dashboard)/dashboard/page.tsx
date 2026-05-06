import { DashboardHome } from "@/components/sections/dashboard/DashboardHome";
import { DashboardEmpty } from "@/components/sections/dashboard/DashboardEmpty";

const HAS_DATA = true;

export default function DashboardPage() {
  return HAS_DATA ? <DashboardHome /> : <DashboardEmpty />;
}
