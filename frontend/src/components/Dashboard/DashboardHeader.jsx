import { Link, useLocation } from "react-router";
import { Home, ChevronRight } from "lucide-react";
import { useAuthStore } from "../../lib/store/authStore";

const pathLabels = {
  dashboard: "Dashboard",
  user: "Dashboard",
  admin: "Dashboard",
  transactions: "Transactions",
  categories: "Categories",
  summary: "Summary",
  "monthly-summary": "Monthly Summary",
  me: "Profile",
  logout: 'Logout'
};

export const DashboardHeader = () => {
  const { user } = useAuthStore()
  const { pathname } = useLocation();

  const segments = pathname.split("/").filter(Boolean);
  const currentLabel = pathLabels[segments[segments.length - 1]] ?? "Dashboard";

  return (
    <div className="fixed w-full px-7 py-5 space-y-5 backdrop-blur-xl shadow-md text-sm text-muted-foreground z-40">
      <Link
        to={user?.role === 'admin' ? '/dashboard/admin' : '/dashboard/user' }
        className="flex items-center gap-1 hover:text-foreground transition-colors"
      >
        <Home size={14} />
        Home
        <ChevronRight size={12} />
        <span className="text-foreground font-medium">{currentLabel}</span>
      </Link>
      <p className="text-3xl font-bold">{currentLabel}</p>
      <p>Welcome to your dashboard</p>
    </div>
  );
};
