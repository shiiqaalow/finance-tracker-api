import {
  Wallet,
  Utensils,
  ShoppingBag,
  Cigarette,
  TrendingUp,
  Plus,
  BottleWine,
  FileText,
  Car,
  LoaderCircle,
  Users,
  ArrowLeftRight,
  Tags,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingDown,
  HandCoins,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "../../components/ui/card";
import { useAuthStore } from "../../lib/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/Apiclient";
import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

export const AdminDashboard = () => {
  const { user } = useAuthStore();

  // users api
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await api.get("/users");
      return response.data;
    },
  });

  // summary api
  const { data: summaryByCategory, isLoading: summaryByCategoryLoading } =
    useQuery({
      queryKey: ["summary"],
      queryFn: async () => {
        const response = await api.get("/transactions/summary");
        return response.data;
      },
    });

  // Transaction api
  const { data: transactions, isLoading: transactionsLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await api.get("/transactions/");
      return response.data.transactions;
    },
  });

  const icons = {
    food: Utensils,
    electronics: ShoppingBag,
    cigaretes: Cigarette,
    beverages: BottleWine,
    transport: Car,
    rent: HandCoins,
  
  };

  // total income and expense
  const totals = (transactions??[]).reduce(
    (sum, transaction) => {
      if (transaction.type === "income") {
        sum.income += transaction.amount;
      }
      if (transaction.type === "expense") {
        sum.expense += transaction.amount;
      }
      return sum;
    },
    {
      income: 0,
      expense: 0,
    },
  );

  const recentTransactions = [...(transactions || [])]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  if (usersLoading || summaryByCategoryLoading || transactionsLoading) {
    return (
      <div className="flex justify-center items-center absolute inset-0 min-h-screen z-100 bg-gradient-to-br from-primary/10 via-background to-primary/5 backdrop-blur-sm">
        <span className="bg-primary p-4 rounded-2xl shadow-lg shadow-primary/30">
          <LoaderCircle className="w-8 h-8 text-primary-foreground animate-spin" />
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-8 capitalize">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold text-primary tracking-wide uppercase">
          <span className="">{user?.role}</span>
          's Dashboard
        </p>

        <h1 className="text-3xl font-bold mt-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Financial Overview
        </h1>

        <p className="text-muted-foreground text-sm mt-1">
          Track your spending and transaction activity
        </p>
      </div>

      {/* Welcome and Quick actions */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Welcome */}
        <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-primary/25 via-primary/10 to-transparent border border-primary/20 shadow-sm">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
          <h1 className="text-3xl font-bold relative">
            Welcome back <span className="text-primary">{user?.name}</span>!
          </h1>
          <p className="text-muted-foreground mt-2 relative">
            Here is your financial overview today
          </p>
        </div>

        {/* Quick Action */}
        <Card className="border-primary/10 shadow-sm">
          <CardContent className="p-6">
            <CardTitle className="text-base">Quick Actions</CardTitle>
            <div className="space-y-3 mt-5">
              <Link
                to="/transactions"
                className="w-full flex items-center gap-3 rounded-xl p-4 bg-primary/10 hover:bg-primary/20 border border-primary/10 hover:border-primary/30 transition-all duration-200 text-primary font-medium"
              >
                <span className="p-1.5 rounded-lg bg-primary/15">
                  <Plus size={16} />
                </span>
                Add Transaction
              </Link>
              <Link 
                to='/summary'
                className="w-full flex items-center gap-3 rounded-xl p-4 border border-border hover:bg-muted/60 hover:border-primary/20 transition-all duration-200 font-medium text-muted-foreground hover:text-foreground">
                <span className="p-1.5 rounded-lg bg-muted">
                  <FileText size={16} />
                </span>
                View Reports
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activities */}
      <Card className="p-6 border-primary/10 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {/* Users */}
          <Card className="group border bg-background/60 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-5">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300">
                  <Users size={22} />
                </div>
                <TrendingUp size={18} className="text-green-500" />
              </div>
              <CardTitle className="text-sm  text-muted-foreground font-medium">
                Total Users
              </CardTitle>

              <CardDescription className="text-3xl font-bold text-foreground mt-2">
                {users.length}
              </CardDescription>

              <p className="text-xs text-muted-foreground mt-3">
                registered accounts
              </p>
            </CardContent>
          </Card>

          {/* Transactions */}
          <Card className="group border bg-background/60 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-5">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300">
                  <ArrowLeftRight size={22} />
                </div>
                <TrendingUp size={18} className="text-green-500" />
              </div>
              <CardTitle className="text-sm  text-muted-foreground font-medium">
                Total Transactions
              </CardTitle>

              <CardDescription className="text-3xl font-bold text-foreground mt-2">
                {transactions.length }
              </CardDescription>

              <p className="text-xs text-muted-foreground mt-3">all time</p>
            </CardContent>
          </Card>

          {/* summary By Category */}
          <Card className="group border bg-background/60 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-5">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300">
                  <Tags size={22} />
                </div>
                <TrendingUp size={18} className="text-green-500" />
              </div>
              <CardTitle className="text-sm  text-muted-foreground font-medium">
                total categories
              </CardTitle>

              <CardDescription className="text-3xl font-bold text-foreground mt-2">
                {summaryByCategory.length}
              </CardDescription>

              <p className="text-xs text-muted-foreground mt-3 ">
                spending groups
              </p>
            </CardContent>
          </Card>
        </div>
      </Card>

      {/* Financial Stats */}
      <Card className="p-6 border-primary/10 shadow-sm">
        <CardTitle className="text-base mb-5">Financial Summary</CardTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Total Income */}
          <Card className="group border bg-background/60 hover:-translate-y-1 hover:shadow-xl hover:border-green-500/30 transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-5">
                <div className="p-3 rounded-xl bg-green-500/10 text-green-600 group-hover:scale-110 group-hover:bg-green-500/15 transition-all duration-300">
                  <ArrowDownLeft size={22} />
                </div>
                <TrendingUp size={18} className="text-green-500" />
              </div>
              <CardTitle className="text-sm text-muted-foreground font-medium">
                Total Income
              </CardTitle>
              <CardDescription className="text-3xl font-bold text-green-600 mt-2">
                R{totals.income?.toFixed(2)}
              </CardDescription>
              <p className="text-xs text-muted-foreground mt-3">all time</p>
            </CardContent>
          </Card>

          {/* Expenses */}
          <Card className="group border bg-background/60 hover:-translate-y-1 hover:shadow-xl hover:border-destructive/30 transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-5">
                <div className="p-3 rounded-xl bg-destructive/10 text-destructive group-hover:scale-110 group-hover:bg-destructive/15 transition-all duration-300">
                  <ArrowUpRight size={22} />
                </div>
                <TrendingDown size={18} className="text-destructive" />
              </div>
              <CardTitle className="text-sm text-muted-foreground font-medium">
                Total Expenses
              </CardTitle>
              <CardDescription className="text-3xl font-bold text-destructive mt-2">
                R{totals.expense?.toFixed(2)}
              </CardDescription>
              <p className="text-xs text-muted-foreground mt-3">
                across all users
              </p>
            </CardContent>
          </Card>
          {/* Net Balnce */}
          <Card className="group border bg-background/60 hover:-translate-y-1 hover:shadow-xl hover:border-destructive/30 transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-5">
                <div
                  className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${totals.income > totals.expense ? "bg-green-500/10 text-green-600 group-hover:bg-green-500/15 " : "bg-destructive/10 text-destructive  group-hover:bg-destructive/15 "}`}
                >
                  {totals.income > totals.expense ? (
                    <ArrowDownLeft size={22} />
                  ) : (
                    <ArrowUpRight size={22} />
                  )}
                </div>
                <TrendingDown size={18} className="text-destructive" />
              </div>
              <CardTitle className="text-sm text-muted-foreground font-medium">
                Net Balance
              </CardTitle>
              <CardDescription
                className={`text-3xl font-bold mt-2 ${totals.income > totals.expense ? "text-green-500" : "text-destructive "}`}
              >
                R{totals.income - totals.expense?.toFixed(2)}
              </CardDescription>
              <p className="text-xs text-muted-foreground mt-3">all time</p>
            </CardContent>
          </Card>
        </div>
      </Card>
      {/* Chart placeholder + Recent Transactions */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Chart */}
        <Card className="border-primary/10 shadow-sm">
          <CardContent className="p-6">
            <CardTitle className="text-base">Monthly Overview</CardTitle>
            <div className="h-72 flex items-center justify-center text-muted-foreground rounded-xl bg-gradient-to-b from-primary/5 to-transparent border border-dashed border-primary/15 mt-4">
              Chart here
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="border-primary/10 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-5">
              <CardTitle className="text-base">Recent Transactions</CardTitle>
              <Link
                to="/transactions"
                className="text-xs text-primary hover:underline font-medium"
              >
                View all
              </Link>
            </div>

            {recentTransactions.length > 0 ? (
              <div className="space-y-3">
                {recentTransactions.map((t) => {
                  const Icon = icons[t.category?.name?.toLowerCase()] || Wallet;
                  const isIncome = t.type === "income";

                  return (
                    <div
                      key={t._id}
                      className="flex items-center justify-between rounded-xl border bg-background/60 p-4 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center gap-4">
                        {/* Transaction Icon */}
                        <div
                          className={`p-3 rounded-xl ${
                            isIncome
                              ? "bg-green-500/10 text-green-600"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          <Icon size={18} />
                        </div>

                        {/* Transaction Details */}
                        <div className="space-y-1">
                          <p className="font-semibold text-sm">{t.title}</p>

                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={t.createdBy?.profilePicture} />
                              <AvatarFallback className="text-[10px]">
                                {t.createdBy?.name?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>

                            <span className="text-xs text-muted-foreground font-medium">
                              {t.createdBy?.name}
                            </span>
                          </div>

                          <p className="text-xs text-muted-foreground">
                            {new Date(t.date).toLocaleDateString("en-ZA", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span
                          className={`block text-sm font-bold ${
                            isIncome ? "text-green-600" : "text-destructive"
                          }`}
                        >
                          {isIncome ? "+" : "-"}R{Math.abs(t.amount).toFixed(2)}
                        </span>

                        <span
                          className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            isIncome
                              ? "bg-green-500/10 text-green-600"
                              : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {t.type}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-4 h-52">
                <FileText className="text-accent-foreground/30 w-9 h-9" />
                <CardTitle className="text-lg text-accent-foreground/30">
                  No transactions yet
                </CardTitle>
              </div>
            )}
          </CardContent>
        </Card>
        {/* summaryByCategory */}
        <Card className="border-primary/10 shadow-sm">
          <CardContent className="p-6">
            <CardTitle className="text-base">spending top categories</CardTitle>
            {summaryByCategory?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5">
                {summaryByCategory.map(({ name, totalAmount }) => {
                  const Icon = icons?.[name?.toLowerCase()] || Wallet;
                  return (
                    <div
                      key={name}
                      className="flex items-center justify-between rounded-xl border bg-background/40 p-4 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div>
                        <p className="text-sm text-muted-foreground  font-medium">
                          {name}
                        </p>
                        <h2 className="text-xl font-bold mt-2 text-foreground">
                          R{totalAmount.toFixed(2)}
                        </h2>
                      </div>

                      <div className="p-3 rounded-xl bg-primary/10 text-primary">
                        <Icon size={22} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <Card className="border-dashed border-primary/15 bg-primary/5 mt-5">
                <CardContent className="flex flex-col justify-center items-center gap-5 h-50">
                  <FileText className="text-accent-foreground/30 w-10 h-10" />
                  <CardTitle className="text-2xl text-accent-foreground/30">
                    No summaryByCategory found!
                  </CardTitle>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
