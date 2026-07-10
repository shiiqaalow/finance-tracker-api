import { useState } from "react";
import { useNavigate } from "react-router";
import { Loader2, LogOut, TriangleAlert } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useAuthStore } from "../../lib/store/authStore";
import { useQueryClient } from "@tanstack/react-query";

export const Logout = () => {
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      queryClient.clear();
      clearAuth();
      navigate("/signin", { replace: true });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black/60 backdrop-blur-sm px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-2xl border-0">
        <CardHeader className="flex flex-col justify-center items-center pb-2">
          <div className="mb-4 flex  h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
            <TriangleAlert className="h-8 w-8  text-red-500" />
          </div>

          <CardTitle className="text-2xl">Log out?</CardTitle>

          <CardDescription className="text-sm">
            Are you sure you want to log out of your account?
            <br />
            You'll need to sign in again to continue.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex gap-3 pt-4">
          <Button
            variant="outline"
            className="flex-1 cursor-pointer"
            disabled={loading}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>

          <Button
            className="flex-1 cursor-pointer"
            disabled={loading}
            onClick={handleLogout}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
