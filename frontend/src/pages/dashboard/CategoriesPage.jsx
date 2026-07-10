import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/Apiclient";
import {
  Plus,
  Search,
  LoaderCircle,
  Tags,
  TrendingUp,
  ArrowDownLeft,
  ArrowUpRight,
  TagX,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { CreateCategory } from "../../components/category/CreateCategory";
import { CategoryCard } from "../../components/category/CategoryCard";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";

export const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get("/categories");
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

  let filteredCategories = categories?.filter((category) => {
    const term = searchTerm.toLocaleLowerCase();
    return (
      category._id.toLocaleLowerCase().includes(term) ||
      category.name.toLocaleLowerCase().includes(term) ||
      category.type.toLocaleLowerCase().includes(term)
    );
  });

  // filtered tabs
  if (activeTab === "income") {
    filteredCategories = filteredCategories?.filter(
      (category) => category.type === "income",
    );
  }
  if (activeTab === "expense") {
    filteredCategories = filteredCategories?.filter(
      (category) => category.type === "expense",
    );
  }

  const categoriesByType = {
    all: categories?.length,
    income: categories?.filter((transaction) => transaction.type === "income")
      .length,
    expense: categories?.filter((transaction) => transaction.type === "expense")
      .length,
  };

  const { all, income, expense } = categoriesByType;

  const handleEdit = (category) => {
    setEditCategory(category);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditCategory(null);
  };

  return (
    <div className="space-y-8">
      <CreateCategory
        category={editCategory}
        open={modalOpen || !! editCategory }
        onClose={handleModalClose}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary tracking-wide uppercase">
            Admin
          </p>
          <h1 className="text-3xl font-bold mt-1 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Categories
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Organise your transactions into spending and income groups
          </p>
        </div>
        <Button
          onClick={() => {
            setEditCategory(null);
            setModalOpen(true);
          }}
          className="rounded-xl gap-2 cursor-pointer hover:scale-105 transition-all duration-200"
        >
          <Plus size={18} />
          New Category
        </Button>
      </div>

      {/* Stats */}
      <Card className="p-6 border-primary/10 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Card className="group border bg-background/60 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-5">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300">
                  <Tags size={22} />
                </div>
                <TrendingUp size={18} className="text-green-500" />
              </div>
              <CardTitle className="text-sm text-muted-foreground font-medium">
                Total Categories
              </CardTitle>
              <CardDescription className="text-3xl font-bold text-foreground mt-2">
                {categories?.length}
              </CardDescription>
              <p className="text-xs text-muted-foreground mt-3">all types</p>
            </CardContent>
          </Card>

          <Card className="group border bg-background/60 hover:-translate-y-1 hover:shadow-xl hover:border-green-500/30 transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-5">
                <div className="p-3 rounded-xl bg-green-500/10 text-green-600 group-hover:scale-110 group-hover:bg-green-500/15 transition-all duration-300">
                  <ArrowDownLeft size={22} />
                </div>
                <TrendingUp size={18} className="text-green-500" />
              </div>
              <CardTitle className="text-sm text-muted-foreground font-medium">
                Income Categories
              </CardTitle>
              <CardDescription className="text-3xl font-bold text-green-600 mt-2">
                {income || 0}
              </CardDescription>
              <p className="text-xs text-muted-foreground mt-3">
                earning groups
              </p>
            </CardContent>
          </Card>

          <Card className="group border bg-background/60 hover:-translate-y-1 hover:shadow-xl hover:border-destructive/30 transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-5">
                <div className="p-3 rounded-xl bg-destructive/10 text-destructive group-hover:scale-110 group-hover:bg-destructive/15 transition-all duration-300">
                  <ArrowUpRight size={22} />
                </div>
                <TrendingUp size={18} className="text-destructive" />
              </div>
              <CardTitle className="text-sm text-muted-foreground font-medium">
                Expense Categories
              </CardTitle>
              <CardDescription className="text-3xl font-bold text-destructive mt-2">
                {expense || 0}
              </CardDescription>
              <p className="text-xs text-muted-foreground mt-3">
                spending groups
              </p>
            </CardContent>
          </Card>
        </div>
      </Card>

      {/* Search + Filter */}
      <Card className="grid grid-cols-1 md:grid-cols-2 items-center p-4">
        {/* search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute top-1/2 -translate-y-1/2 left-3 text-primary/50"
          />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder=" Search by description or category..."
            className="pl-8 py-3 border-primary/20 focus-visible:ring-primary/40 border-2 focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-offset-0"
          />
        </div>
        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full capitalize"
        >
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
              Expense
              <Badge variant="secondary" className="bg-primary/20 font-bold">
                {expense || 0}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </Card>

      {/* Category List */}
      <Card className="border-primary/10 shadow-sm">
        <CardContent className="p-6">
          <CardTitle className="text-base mb-6">
            {filteredCategories.length}{" "}
            {filteredCategories.length === 1 ? "Category" : "Categories"}
          </CardTitle>

          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {filteredCategories.map((category) => (
                <CategoryCard
                  key={category._id}
                  category={category}
                  categories={categories}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-5 h-60">
              <TagX className="text-accent-foreground/30 w-10 h-10" />
              <CardTitle className="text-xl text-accent-foreground/30 text-center">
                No categories found
              </CardTitle>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => {
                  setEditCategory(null);
                  setModalOpen(true);
                }}
              >
                <Plus size={16} />
                Create your first category
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
