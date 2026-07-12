import { useState } from "react";
import {
  ArrowLeftRight,
  ArrowDownLeft,
  ArrowUpRight,
  LoaderCircle,
  Search,
  Plus,
  FileText,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { TransactionCard } from "../../components/transaction/TransactionCard";
import { CreateTransaction } from "../../components/transaction/CreateTransaction";
import { useNavigate } from "react-router";
import { api } from "../../api/Apiclient";
import { useQuery } from "@tanstack/react-query";

export const Transactions = () => {
  const [SearchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [createTransaction, setCreateTransaction] = useState(null);
  const [editTransaction, setEditTransaction] = useState(null);

  const navigate = useNavigate();

  const handleOpenTransactionModal = () => {
    setCreateTransaction(true);
    navigate("/transactions/create");
  };

  const handleCreateTransactionClose = () => {
    setCreateTransaction(false);
    setEditTransaction(null);
    navigate("/transactions");
  };

  const handleEditTransaction = (transaction) => {
    setEditTransaction(transaction);
    navigate(`/transactions/update/${transaction._id}`);
  };


  // transaction api
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await api.get("/transactions");
      return response.data.transactions;
    },
    retry: 1,
  });

  // category api
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get("/categories");
      return response.data;
    },
    retry: 1,
  });

  let filteredTransactions = transactions?.filter((transaction) => {
    const term = SearchTerm.toLocaleLowerCase();
    return (
      transaction._id.toLocaleLowerCase().includes(term) ||
      transaction.title.toLocaleLowerCase().includes(term) ||
      transaction.type.toLocaleLowerCase().includes(term)
    );
  });

  // filtered tabs
  if (activeTab === "income") {
    filteredTransactions = filteredTransactions?.filter(
      (transaction) => transaction.type === "income",
    );
  }
  if (activeTab === "expense") {
    filteredTransactions = filteredTransactions?.filter(
      (transaction) => transaction.type === "expense",
    );
  }

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

  const categoriesByType = {
    all: transactions?.length,
    income: transactions?.filter((transaction) => transaction.type === "income")
      .length,
    expense: transactions?.filter(
      (transaction) => transaction.type === "expense",
    ).length,
  };

  const { all, income, expense } = categoriesByType;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center absolute inset-0 min-h-screen z-100 bg-primary/10">
        <span className="bg-primary p-4 rounded-md">
          <LoaderCircle className="w-8 h-8 text-accent animate-spin" />
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <CreateTransaction
        categories={categories}
        transaction={editTransaction}
        open={createTransaction || !!editTransaction}
        onClose={handleCreateTransactionClose}
        // onEdit={handleEditTransaction}
      />
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-muted-foreground text-sm mt-1">
            View and manage all your transaction activity
          </p>
        </div>
        <Button
          onClick={handleOpenTransactionModal}
          className="rounded-xl gap-2 cursor-pointer hover:scale-105 transition-all duration-200"
        >
          <Plus size={18} />
          Add Transaction
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card className="group border bg-background/60 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-5">
            <div className="flex justify-between items-center mb-5">
              <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition">
                <ArrowLeftRight size={22} />
              </div>
            </div>
            <CardTitle className="text-sm text-muted-foreground">
              Total Transactions
            </CardTitle>
            <CardDescription className="text-3xl font-bold text-foreground mt-2">
              {transactions?.length || 0}
            </CardDescription>
            <p className="text-xs text-muted-foreground mt-3">all time</p>
          </CardContent>
        </Card>

        <Card className="group border bg-background/60 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-5">
            <div className="flex justify-between items-center mb-5">
              <div className="p-3 rounded-xl bg-green-500/10 text-green-600 group-hover:scale-110 transition">
                <ArrowDownLeft size={22} />
              </div>
            </div>
            <CardTitle className="text-sm text-muted-foreground">
              Total Income
            </CardTitle>
            <CardDescription className="text-3xl font-bold text-green-600 mt-2">
              ${totals.income?.toFixed(2) || 0}
            </CardDescription>
            <p className="text-xs text-muted-foreground mt-3">all time</p>
          </CardContent>
        </Card>

        <Card className="group border bg-background/60 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-5">
            <div className="flex justify-between items-center mb-5">
              <div className="p-3 rounded-xl bg-destructive/10 text-destructive group-hover:scale-110 transition">
                <ArrowUpRight size={22} />
              </div>
            </div>
            <CardTitle className="text-sm text-muted-foreground">
              Total Expenses
            </CardTitle>
            <CardDescription className="text-3xl font-bold text-destructive mt-2">
              ${totals.expense?.toFixed(2) || 0}
            </CardDescription>
            <p className="text-xs text-muted-foreground mt-3">all time</p>
          </CardContent>
        </Card>
      </div>

      {/* Search + Filter */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* search */}
          <div className="relative col-span-2 md:col-span-2">
            <Search
              size={18}
              className="absolute top-1/2 -translate-y-1/2 left-3 text-primary/50"
            />
            <Input
              value={SearchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder=" Search by description or category..."
              className="pl-8 py-5 border-primary/20 focus-visible:ring-primary/40"
            />
          </div>
          {/* actions */}
          {/* <div className="flex items-center ">
            <span className="hover:bg-primary/20 p-2 rounded-md cursor-pointer">
              <Printer />
            </span>
          </div> */}
        </div>
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="all"
              className="flex items-center gap-2 cursor-pointer"
            >
              All
              <Badge variant="secondary" className="bg-primary/20 font-bold">
                {all || 0}
              </Badge>
            </TabsTrigger>

            <TabsTrigger
              value="income"
              className="flex items-center gap-2 cursor-pointer"
            >
              Income
              <Badge variant="secondary" className="bg-primary/20 font-bold">
                {income || 0}
              </Badge>
            </TabsTrigger>

            <TabsTrigger
              value="expense"
              className="flex items-center gap-2 cursor-pointer"
            >
              Expenses
              <Badge variant="secondary" className="bg-primary/20 font-bold">
                {expense || 0}{" "}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </Card>

      {/* Transaction List */}
      <Card>
        <CardContent className="p-6">
          <CardTitle className="mb-5">
            {filteredTransactions?.length || 0}{" "}
            {filteredTransactions?.length === 1
              ? "Transaction"
              : "Transactions"}
          </CardTitle>

          {filteredTransactions?.length > 0 ? (
            <div className="space-y-3">
              {filteredTransactions?.map((transaction) => (
                <TransactionCard
                  key={transaction._id}
                  transaction={transaction}
                  onEdit={handleEditTransaction}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-5 h-60">
              <FileText className="text-accent-foreground/30 w-10 h-10" />
              <CardTitle className="text-xl text-accent-foreground/30 text-center">
                No transactions found
              </CardTitle>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
