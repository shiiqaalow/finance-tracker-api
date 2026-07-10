import { Outlet } from "react-router";
import { MaindHeader } from "./MainHeader";
import { Sidebar } from "./Sidebar";
import { DashboardHeader } from "./DashboardHeader";
import { useState } from "react";
export const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Main Header */}
      <MaindHeader open={setOpen} />

      <div className="flex pt-20">
        {/* Sidebar */}

        <Sidebar 
            open={open}
            setOpen={setOpen}
        />

        {/* Content */}
        <div className="flex-1 md:ml-70">
          {/* Dashboard Header */}
          <DashboardHeader />

          {/* All Pages Content */}
          <main className="pt-46 px-7 pb-7 min-h-[calc(100vh-5rem)]">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
