import {
  Bell,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Search,
  Tv2,
  User,
} from "lucide-react";
import { useAuthStore } from "../../lib/store/authStore";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../../api/Apiclient";

export const MaindHeader = ({ open }) => {
  const [SearchTerm, setSearchTerm] = useState("");
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // transaction api
  const { data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await api.get("/transactions");
      return response.data.transactions;
    },
    retry: 1,
  });
  const filteredTransactions = transactions?.filter((transaction) => {
    const term = SearchTerm.toLowerCase();

    return (
      transaction.title.toLowerCase().includes(term) ||
      transaction.type.toLowerCase().includes(term) ||
      transaction.amount.toString().includes(term) ||
      transaction.category?.name?.toLowerCase().includes(term) ||
      transaction.createdBy?.name?.toLowerCase().includes(term)
    );
  });

  const handleLogout = () => {
    if (!user) return;
    if (!confirm("Are you sure you want to logout ?")) {
      return;
    }
    queryClient.clear();
    clearAuth();
    navigate("/login", { replace: true });

    console.log(useAuthStore.getState());
    console.log(localStorage.getItem("auth-storage"));
  };

  
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-20 border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-7">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => open(true)}
            className="rounded-lg p-2 transition hover:bg-primary/10 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3 md:border-r border-border pr-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600 shadow-lg">
              <Tv2 className="h-6 w-6 text-white" />
            </div>

            <div className="hidden md:block">
              <h2 className="text-lg font-bold leading-none">
                Finance Tracker
              </h2>

              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </div>

          <Link
            to="/dashboard"
            className="hidden text-sm font-medium text-muted-foreground transition hover:text-primary md:block"
          >
            Home
          </Link>
        </div>

        {/* Search */}
        <div className="relative hidden w-full max-w-2xl md:block">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={SearchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search transactions, category, amount..."
            className="h-12 rounded-2xl border-border/60 pl-12 pr-24 backdrop-blur-md shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-primary"
          />
          {SearchTerm && (
            <div className="absolute mt-2 w-full overflow-hidden rounded-2xl border bg-background shadow-2xl">
              <div className="border-b px-4 py-2 text-xs font-medium text-muted-foreground">
                {filteredTransactions?.length || 0} Results
              </div>

              <div className="max-h-80 overflow-y-auto">
                {filteredTransactions?.length ? (
                  filteredTransactions.slice(0, 6).map((item) => (
                    <button
                      key={item._id}
                      className="flex w-full items-center justify-between border-b px-4 py-3 text-left transition hover:bg-muted"
                    >
                      <div>
                        <p className="font-medium">{item.title}</p>

                        <p className="text-xs capitalize text-muted-foreground">
                          {item.type}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
                          item.type === "income"
                            ? "bg-green-500/10 text-green-600"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        ${item.amount}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="py-8 text-center text-sm text-muted-foreground">
                    No transactions found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 md:border-l border-border pl-4">
          {/* Theme */}
          <button className="rounded-xl p-2.5 transition hover:bg-primary/10 cursor-pointer">
            <Moon className="h-5 w-5" />
          </button>

          {/* Notifications */}
          <button className="relative rounded-xl p-2.5 transition hover:bg-primary/10 cursor-pointer">
            <Bell className="h-5 w-5" />

            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-background"></span>
          </button>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full transition duration-200 hover:scale-105">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="h-11 w-11 rounded-full border-2 border-primary/30 object-cover cursor-pointer"
                  />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary/30 bg-muted">
                    <User className="h-5 w-5" />
                  </div>
                )}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-80 rounded-2xl p-2 shadow-2xl"
            >
              {/* User */}
              <div className="mb-2 flex items-center gap-3 rounded-xl border p-3">
                <Avatar className="h-16 w-16 border">
                  <AvatarImage src={user?.profilePicture} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold capitalize">
                    {user?.name}
                  </h3>

                  <p className="truncate text-xs text-muted-foreground">
                    {user?.email}
                  </p>

                  <span
                    className={`mt-2 inline-flex rounded-full px-2 py-1 text-[10px] font-semibold uppercase ${
                      user?.role === "admin"
                        ? "bg-green-500/10 text-green-600"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {user?.role}
                  </span>
                </div>
              </div>

              <DropdownMenuItem asChild>
                <Link
                  to={
                    user?.role === "admin"
                      ? "/dashboard/admin"
                      : "/dashboard/user"
                  }
                  className="flex cursor-pointer items-center gap-3 rounded-lg p-3"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  to="/me"
                  className="flex cursor-pointer items-center gap-3 rounded-lg p-3"
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleLogout}
                className="mt-2 flex cursor-pointer items-center gap-3 rounded-lg border-t p-3 text-red-600 focus:text-red-600"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
