import {
  LayoutDashboard,
  BriefcaseBusiness,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

function DashboardLayout({
  children,
}) {
  const navigate = useNavigate();

  const { logout } =
    useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-72 bg-white border-r border-gray-200 p-6 hidden md:flex md:flex-col">
        <div>
          <h1 className="text-3xl font-bold">
            JobPilot AI
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Smart Job Tracking System
          </p>
        </div>

        <nav className="mt-12 flex-1">
          <button className="w-full flex items-center gap-3 bg-black text-white px-5 py-4 rounded-2xl">
            <LayoutDashboard size={20} />

            Dashboard
          </button>

          <button className="w-full flex items-center gap-3 text-gray-700 hover:bg-gray-100 px-5 py-4 rounded-2xl mt-3 transition">
            <BriefcaseBusiness size={20} />

            Applications
          </button>
        </nav>

        <button
          onClick={() => {
            logout();

            navigate("/");
          }}
          className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl transition"
        >
          <LogOut size={18} />

          Logout
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;