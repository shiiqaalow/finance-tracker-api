import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";

import { api } from "../../api/Apiclient";
import { useAuthStore } from "../../lib/store/authStore";

export const ProtectedRoutes = ({ children }) => {
  const { user, token, setAuth, clearAuth } = useAuthStore();
  const location = useLocation();

  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    enabled: !!token,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (isSuccess && data?.user) {
      // Prevent unnecessary Zustand updates
      if (user?._id !== data.user._id) {
        setAuth(data.user, token);
      }
    }

    if (isError) {
      clearAuth();
    }
  }, [
    isSuccess,
    isError,
    data,
    token,
    user,
    setAuth,
    clearAuth,
  ]);

  if (!token) {
    return (
      <Navigate
        to="/signin"
        state={{ from: location }}
        replace
      />
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2Icon className="animate-spin" size={24} />
      </div>
    );
  }

  if (isError) {
    return (
      <Navigate
        to="/signin"
        state={{ from: location }}
        replace
      />
    );
  }

  return children ?? <Outlet />;
};