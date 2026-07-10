import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/Apiclient";
import {
  Utensils,
  ShoppingBag,
  Cigarette,
  BottleWine,
  Car,
  Banknote,
  Wallet,
  LoaderCircle,
  FileText,
  TrendingUp,
  TrendingDown,
  ArrowDownLeft,
  ArrowUpRight,
  ArrowLeftRight,
  Tags,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "../../components/ui/card";

const icons = {
  food: Utensils,
  electronics: ShoppingBag,
  cigaretes: Cigarette,
  cigarete: Cigarette,
  beverages: BottleWine,
  transport: Car,
  salary: Banknote,
};

export const Summary = () => {
  const { data: summary, isLoading } = useQuery({
    queryKey: ["summary"],
    queryFn: async () => {
      const response = await api.get("/transactions/summary");
      return response.data;
    },
    retry: 1,
  });


  if (isLoading) {
    return (
      <div className="flex justify-center items-center absolute inset-0 min-h-screen z-100 bg-gradient-to-br from-primary/10 via-background to-primary/5 backdrop-blur-sm">
        <span className="bg-primary p-4 rounded-2xl shadow-lg shadow-primary/30">
          <LoaderCircle className="w-8 h-8 text-primary-foreground animate-spin" />
        </span>
      </div>
    );
  }

  const safeSummary = summary ?? [];

  // total income and expense
  const totals = safeSummary.reduce(
    (sum, summary) => {
      if (summary.type === "income") {
        sum.totalIncome += summary.totalAmount;
      }
      if (summary.type === "expense") {
        sum.totalExpense += summary.totalAmount;
      }
      return sum;
    },
    {
      totalIncome: 0,
      totalExpense: 0,
    },
  );

  const { totalIncome, totalExpense } = totals;

  const incomeRows = safeSummary.filter((s) => s.type === "income");
  const expenseRows = safeSummary.filter((s) => s.type === "expense");
  const totalTransactions = safeSummary.reduce(
    (sum, summary) => sum + summary.totalTransaction,
    0,
  );
  const netProfit = totalIncome - totalExpense;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold text-primary tracking-wide uppercase">
          Reports
        </p>
        <h1 className="text-3xl font-bold mt-1 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          All-Time Summary
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Lifetime breakdown of income and spending by category
        </p>
      </div>

      {/* Top Stats */}
      <Card className="p-6 border-primary/10 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {/* Total Transactions */}
          <Card className="group border bg-background/60 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-5">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300">
                  <ArrowLeftRight size={22} />
                </div>
                <Tags size={18} className="text-muted-foreground" />
              </div>
              <CardTitle className="text-sm text-muted-foreground font-medium">
                Total Transactions
              </CardTitle>
              <CardDescription className="text-3xl font-bold text-foreground mt-2">
                {totalTransactions}
              </CardDescription>
              <p className="text-xs text-muted-foreground mt-3">
                across all categories
              </p>
            </CardContent>
          </Card>

          {/* Income */}
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
                R{totalIncome?.toFixed(2)}
              </CardDescription>
              <p className="text-xs text-muted-foreground mt-3">
                {" "}
                <span className="font-bold text-lg">
                  {incomeRows.length}
                </span>{" "}
                Income categor{incomeRows.length !== 1 ? "ies" : "y"}
              </p>
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
                R{totalExpense?.toFixed(2)}
              </CardDescription>
              <p className="text-xs text-muted-foreground mt-3">
                {" "}
                <span className="font-bold text-lg">
                  {expenseRows.length}
                </span>{" "}
                Expense categor{expenseRows.length !== 1 ? "ies" : "y"}
              </p>
            </CardContent>
          </Card>

          {/* Net */}
          <Card
            className={`group border bg-background/60 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${
              netProfit >= 0
                ? "hover:border-green-500/30"
                : "hover:border-destructive/30"
            }`}
          >
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-5">
                <div
                  className={`p-3 rounded-xl group-hover:scale-110 transition-all duration-300 ${
                    netProfit >= 0
                      ? "bg-green-500/10 text-green-600 group-hover:bg-green-500/15"
                      : "bg-destructive/10 text-destructive group-hover:bg-destructive/15"
                  }`}
                >
                  {netProfit >= 0 ? (
                    <TrendingUp size={22} />
                  ) : (
                    <TrendingDown size={22} />
                  )}
                </div>
              </div>
              <CardTitle className="text-sm text-muted-foreground font-medium">
                Net Balance
              </CardTitle>
              <CardDescription
                className={`text-3xl font-bold mt-2 ${
                  netProfit >= 0 ? "text-green-600" : "text-destructive"
                }`}
              >
                {netProfit >= 0 ? "+" : ""}R{netProfit.toFixed(2)}
              </CardDescription>
              <p className="text-xs text-muted-foreground mt-3">
                income minus expenses
              </p>
            </CardContent>
          </Card>
        </div>
      </Card>

      {/* Income breakdown */}
      <Card className="border-primary/10 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-green-500/10 text-green-600">
              <ArrowDownLeft size={18} />
            </div>
            <CardTitle className="text-base">Income by Category</CardTitle>
          </div>

          {incomeRows.length > 0 ? (
            <div className="space-y-3">
              {incomeRows
                .sort((a, b) => b.totalAmount - a.totalAmount)
                .map((row) => {
                  const Icon = icons[row.name?.toLowerCase()] || Wallet;
                  return (
                    <div
                      key={row.name}
                      className="flex items-center justify-between rounded-xl border p-4 bg-background/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-green-500/10 text-green-600">
                          <Icon size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold capitalize">
                            {row.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {row.totalTransaction} transaction
                            {row.totalTransaction !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-600">
                          R{row.totalAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-4 h-40">
              <FileText className="text-accent-foreground/30 w-9 h-9" />
              <p className="text-sm text-accent-foreground/30">
                No income recorded
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Expense breakdown */}
      <Card className="border-primary/10 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-destructive/10 text-destructive">
              <ArrowUpRight size={18} />
            </div>
            <CardTitle className="text-base">Expenses by Category</CardTitle>
          </div>

          {expenseRows.length > 0 ? (
            <div className="space-y-3">
              {expenseRows
                .sort((a, b) => b.totalAmount - a.totalAmount)
                .map((row) => {
                  const Icon = icons[row.name?.toLowerCase()] || Wallet;
                  return (
                    <div
                      key={row.name}
                      className="flex items-center justify-between rounded-xl border p-4 bg-background/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                          <Icon size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold capitalize">
                            {row.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {row.totalTransaction} transaction
                            {row.totalTransaction !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-destructive">
                          R{row.totalAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-4 h-40">
              <FileText className="text-accent-foreground/30 w-9 h-9" />
              <p className="text-sm text-accent-foreground/30">
                No expenses recorded
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
