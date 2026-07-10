import {
  ArrowLeftRight,
  BarChart3,
  Calendar,
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Tags,
  UserRound,
  X,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { useAuthStore } from "../../lib/store/authStore";

export const Sidebar = ({ open, setOpen }) => {
  const { pathname } = useLocation();
  const { user } = useAuthStore();

  const base = user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user";

  const sidebar_navs = [
    {
      section: "Main",
      items: [{ label: "Dashboard", link: base, icon: LayoutDashboard }],
    },
    {
      section: "Finance",
      items: [
        { label: "Transactions", link: `/transactions`, icon: ArrowLeftRight },
        { label: "Categories", link: `/categories`, icon: Tags }
      ],
    },
    {
      section: "Analytics",
      items: [
        { label: "Reports", link: `/reports`, icon: BarChart3 },
        { label: "Summary", link: `/summary`, icon: Calendar },
        { label: "Monthly Summary",link: `/monthly-summary`,icon: CalendarDays,},
      ],
    },
    {
      section: "User",
      items: [
        user?.role === "admin" && {
          label: "Users",
          link: `/users`,
          icon: Users,
        },
        { label: "Profile", link: `/me`, icon: UserRound },
      ].filter(Boolean),
    },
    {
      section: "Support",
      items: [
        { label: "Logout", link: "/logout", icon: LogOut },
      ],
    },
  ];

  return (
    <aside
      className={`
            fixed top-20 left-0 h-[calc(100vh-5rem)] w-70 border-r bg-background z-50
            transition-transform duration-300
            ${open ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0 md:flex
          `}
    >
      <div className="relative pt-10 flex flex-col gap-6 px-4 py-4 backdrop-blur-xl z-50">
        <button
          className="block md:hidden absolute top-3 right-5 hover-primary/20 p-1 cursor-pointer rounded-full"
          onClick={() => setOpen(false)}
        >
          <X size={20} />
        </button>
        {sidebar_navs.map(({ section, items }) => (
          <div key={section}>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2 px-2">
              {section}
            </p>
            {items.map(({ label, link, icon: Icon }) => {
              const isActive = pathname === link;
              return (
                <Link
                    key={link}
                    to={link}
                    onClick={() => setOpen(false)}
                  className={`
                    flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors
                    ${
                        isActive
                        ? "bg-primary text-primary-foreground font-medium"
                        : "hover:bg-primary/10 text-muted-foreground hover:text-foreground"
                        }`
                    }
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
};
