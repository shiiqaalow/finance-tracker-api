import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/Apiclient";
import {
  Users,
  Search,
  LoaderCircle,
  ShieldCheck,
  User,
  TrendingUp,
  UserCheck,
  UserX,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import { UserCard } from "../../components/users/UserCard";

export const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await api.get("/users");
      return response.data;
    },
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

  let UsersData = users?.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  // filtered tabs
  if (activeTab === "admin") {
    UsersData = UsersData.filter((user) => user.role === "admin");
  }
  if (activeTab === "user") {
    UsersData = UsersData.filter((user) => user.role === "user");
  }

  const usersByRole = {
    all: users?.length,
    admin: users?.filter((user) => user.role === "admin").length,
    user: users?.filter((user) => user.role === "user").length,
  };

  const { all, admin, user } = usersByRole;

  return (
    <div className="space-y-8 capitalize">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold text-primary tracking-wide uppercase">
          Admin
        </p>
        <h1 className="text-3xl font-bold mt-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          User Management
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          View and manage all registered accounts
        </p>
      </div>

      {/* Stats */}
      <Card className="p-6 border-primary/10 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Total */}
          <Card className="group border bg-background/60 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-5">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300">
                  <Users size={22} />
                </div>
                <TrendingUp size={18} className="text-green-500" />
              </div>
              <CardTitle className="text-sm text-muted-foreground font-medium">
                Total Users
              </CardTitle>
              <CardDescription className="text-3xl font-bold text-foreground mt-2">
                {UsersData.length}
              </CardDescription>
              <p className="text-xs text-muted-foreground mt-3">
                registered accounts
              </p>
            </CardContent>
          </Card>

          {/* Admins */}
          <Card className="group border bg-background/60 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-5">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300">
                  <UserCheck size={22} />
                </div>
                <ShieldCheck size={18} className="text-primary" />
              </div>
              <CardTitle className="text-sm text-muted-foreground font-medium">
                Admins
              </CardTitle>
              <CardDescription className="text-3xl font-bold text-foreground mt-2">
                {admin}
              </CardDescription>
              <p className="text-xs text-muted-foreground mt-3">
                with full access
              </p>
            </CardContent>
          </Card>

          {/* Regular Users */}
          <Card className="group border bg-background/60 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-5">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300">
                  <UserX size={22} />
                </div>
                <User size={18} className="text-muted-foreground" />
              </div>
              <CardTitle className="text-sm text-muted-foreground font-medium">
                Regular Users
              </CardTitle>
              <CardDescription className="text-3xl font-bold text-foreground mt-2">
                {user}
              </CardDescription>
              <p className="text-xs text-muted-foreground mt-3">
                standard access
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
              value="admin"
              className="flex items-center gap-2 cursor-pointer"
            >
              Admin
              <Badge variant="secondary" className="bg-primary/20 font-bold">
                {admin || 0}
              </Badge>
            </TabsTrigger>

            <TabsTrigger
              value="user"
              className="flex items-center gap-2 cursor-pointer"
            >
              User
              <Badge variant="secondary" className="bg-primary/20 font-bold">
                {user || 0}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </Card>

      {/* User List */}
      <Card className="border-primary/10 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-5">
            <CardTitle className="text-base">
              {UsersData.length} {UsersData.length === 1 ? "User" : "Users"}
            </CardTitle>
          </div>

          {UsersData.length > 0 ? (
            <div className="space-y-3">
              {UsersData.map((user) => (
                <UserCard 
                  key={user._id} 
                  user={user} 
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-5 h-60">
              <Users className="text-accent-foreground/30 w-15 h-15" />
              <CardTitle className="text-xl text-accent-foreground/30 text-center">
                No users found!
              </CardTitle>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
