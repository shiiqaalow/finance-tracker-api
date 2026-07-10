import {
  Activity,
  Bell,
  CalendarDays,
  Camera,
  ChevronRight,
  Clock,
  Globe,
  Lock,
  Mail,
  Moon,
  Settings,
  Shield,
  Smartphone,
  Trash2,
  User,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

import { useAuthStore } from "../../lib/store/authStore";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { api } from "../../api/Apiclient";
import { toast } from "sonner";
import { UserStats } from "../../components/users/UserStats";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";

const activities = [
  {
    title: "Updated Profile Picture",
    date: "Today",
  },
  {
    title: "Password Changed",
    date: "Yesterday",
  },
  {
    title: "Enabled Two Factor Authentication",
    date: "2 Days Ago",
  },
  {
    title: "Added New Bank Card",
    date: "Last Week",
  },
];

export const Report = () => {
  const { user } = useAuthStore();

  const profilePicture = user?.profilePicture || "https://i.pravatar.cc/300";

  const uploadMutation = useMutation({
    mutationFn: async (profileData) => {
      const response = await api.post("/profile/upload", profileData);
      return response.data;
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Transaction added successfully");
    },
    onError: (err) => {
      toast.error("Failed to add transaction");
    },
  });

  const handleUpload = (e) => {
    const file = e.target.files[0];
    uploadMutation.mutate(file);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-7">
      <Card className="overflow-hidden border-0 shadow-xl">
        {/* Banner */}
        <div className="relative h-56 md:h-72 bg-gradient-to-r from-primary via-primary/90 to-blue-600 rounded-md">
          <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-white/10" />
          <div className="absolute right-20 bottom-5 h-24 w-24 rounded-full bg-white/10" />
          <div className="absolute left-10 top-2 h-20 w-20 rounded-full bg-white/10" />
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        </div>

        <CardContent className="relative pb-8">
          <div className="flex flex-col items-center gap-6 -mt-24 md:-mt-20 md:flex-row md:items-end">
            {/* Avatar */}
            <div className="relative shrink-0">
              <Avatar className="h-44 w-44 md:h-52 md:w-52 border-[6px] border-background shadow-2xl">
                <AvatarImage src={profilePicture} />

                <AvatarFallback className="text-5xl">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <Input
                id="profile-photo"
                type="file"
                accept="image/*"
                hidden
                onChange={handleUpload}
              />

              <label
                htmlFor="profile-photo"
                className="absolute bottom-3 right-0 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-4 border-background bg-primary text-white shadow-lg transition hover:scale-110"
              >
                <Camera className="h-5 w-5" />
              </label>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left pb-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <h1 className="text-3xl font-bold capitalize">{user?.name}</h1>

                <span
                  className={`w-fit rounded-md px-4 py-1 text-xs uppercase font-semibold text-white mx-auto md:mx-0 ${
                    user?.role === "admin" ? "bg-emerald-500" : ""
                  }`}
                >
                  {user?.role}
                </span>
              </div>

              <p className="mt-2 text-muted-foreground">
                Welcome back to your dashboard.
              </p>

              <div className="mt-6 flex flex-col gap-4 md:flex-row md:flex-wrap">
                <div className="flex items-center justify-center gap-2 rounded-xl md:justify-start">
                  <Mail className="h-5 w-5 text-primary" />

                  <span className="break-all text-xs">{user?.email}</span>
                </div>

                <div className="flex items-center justify-center gap-2 rounded-xl md:justify-start">
                  <CalendarDays className="h-5 w-5 text-primary" />

                  <span className="text-xs">
                    Member Since {user?.createdAt?.split("T")[0]}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button className="cursor-pointer">Edit Profile</Button>

                <Button className="cursor-pointer" variant="outline">
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* user stats */}
      <UserStats />

      {/* CONTENT GRID */}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT COLUMN */}

        <div className="space-y-6 lg:col-span-2">
          {/* PERSONAL INFORMATION */}

          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>

              <CardDescription>
                Manage your personal account details.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm text-muted-foreground">
                    Username
                  </label>

                  <div className="mt-2 rounded-xl border bg-background p-4">
                    {user?.name}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground">
                    Email Address
                  </label>

                  <div className="mt-2 rounded-xl border bg-background p-4 text-gray-500">
                    {user?.email}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground">
                    Phone Number
                  </label>

                  <div className="mt-2 rounded-xl border bg-background p-4">
                    +27 00 000 0000
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground">
                    Country
                  </label>

                  <div className="mt-2 rounded-xl border bg-background p-4">
                    South Africa
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground">City</label>

                  <div className="mt-2 rounded-xl border bg-background p-4">
                    Cape Town
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ACCOUNT DETAILS */}

          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>

              <CardDescription>Banking account overview.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Account Type</span>

                <Badge>Premium</Badge>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Member Since</span>

                <span>January 2025</span>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Verification</span>

                <Badge variant="secondary">Verified</Badge>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Currency</span>

                <span>USD</span>
              </div>
            </CardContent>
          </Card>

          {/* SECURITY */}

          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Change Password
                </span>

                <ChevronRight className="h-4 w-4" />
              </Button>

              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Two-Factor Authentication
                </span>

                <ChevronRight className="h-4 w-4" />
              </Button>

              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Trusted Devices
                </span>

                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN */}

        <div className="space-y-6">
          {/* PREFERENCES */}

          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <Button variant="ghost" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                </span>

                <ChevronRight className="h-4 w-4" />
              </Button>

              <Button variant="ghost" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  Appearance
                </span>

                <ChevronRight className="h-4 w-4" />
              </Button>

              <Button variant="ghost" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Language
                </span>

                <ChevronRight className="h-4 w-4" />
              </Button>

              <Button variant="ghost" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  General Settings
                </span>

                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          {/* RECENT ACTIVITY */}

          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>

              <CardDescription>Your latest account activity.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>

                      <div>
                        <p className="font-medium">{activity.title}</p>

                        <p className="text-sm text-muted-foreground">
                          {activity.date}
                        </p>
                      </div>
                    </div>
                  </div>

                  {index !== activities.length - 1 && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* ACCOUNT STATUS */}

          <Card className="rounded-2xl border-emerald-500/30 shadow-sm">
            <CardHeader>
              <CardTitle>Account Status</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Email Verified</span>

                <Badge>Yes</Badge>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Phone Verified</span>

                <Badge>Verified</Badge>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Two Factor Authentication
                </span>

                <Badge variant="secondary">Enabled</Badge>
              </div>
            </CardContent>
          </Card>

          {/* DANGER ZONE */}

          <Card className="rounded-2xl border-destructive shadow-sm">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>

              <CardDescription>
                These actions are permanent and cannot be undone.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <Button variant="destructive" className="w-full">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>

              <Button variant="outline" className="w-full">
                Download My Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
