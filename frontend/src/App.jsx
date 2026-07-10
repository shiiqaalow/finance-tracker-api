import { Route, Routes } from "react-router";

import { SignupPage } from "./pages/auth/SignupPage";
import { SigninPage } from "./pages/auth/SigninPage";

import { DashboardLayout } from "./components/Dashboard/DashboardLayout";
import { ProtectedRoutes } from "./components/auth/ProtectedRoutes";
import { AdminRoute } from "./components/auth/AdminRoute";

import { Dashboard } from "./pages/dashboard/Dashboard";
import { AdminDashboard } from "./pages/dashboard/AdminDashboard";
import { Transactions } from "./pages/dashboard/Transactions";
import { UsersPage } from "./pages/dashboard/UsersPage";
import { Report } from "./pages/dashboard/Report";
import { Profile } from "./pages/dashboard/Profile";
import { Home } from "./pages/Home";
import { CategoriesPage } from "./pages/dashboard/CategoriesPage";
import {Summary} from "./pages/dashboard/Summary";
import { MonthlySummaryPage } from "./pages/dashboard/MonthlySummary";
import { Logout } from "./pages/dashboard/Logout";

export const App = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<SigninPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected */}
      <Route
        element={
          <ProtectedRoutes>
            <DashboardLayout />
          </ProtectedRoutes>
        }
      >
        {/* User Dashboard */}
        <Route path="/dashboard/user" element={<Dashboard />} />

        {/* Admin Only */}
        <Route
          path="/dashboard/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Transactions */}
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transactions/create" element={<Transactions />} />
        <Route path="/transactions/update/:id" element={<Transactions />} />
        {/* Shared */}
        <Route path="/users" element={<UsersPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/monthly-summary" element={<MonthlySummaryPage />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/me" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/logout" element={<Logout />} />

      </Route>
    </Routes>
  );
};