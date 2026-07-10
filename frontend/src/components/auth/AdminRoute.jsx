import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthStore } from "../../lib/store/authStore";

export const AdminRoute = ({ children }) => {
  const { user } = useAuthStore();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/signin"
        state={{ from: location }}
        replace
      />
    );
  }

  if (user.role !== "admin") {
    return (
      <Navigate
        to="/dashboard/user"
        replace
      />
    );
  }

  return children ?? <Outlet />;
};