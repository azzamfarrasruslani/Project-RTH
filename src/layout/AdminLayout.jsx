import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import { FaBars, FaBell, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        // Coba ambil data detail dari tabel 'users' di public schema
        const { data, error } = await supabase
          .from("users")
          .select("nama, role")
          .eq("id", user.id)
          .single();

        if (data && !error) {
          setUserProfile(data);
        } else {
          // Fallback jika tidak ada data di tabel users
          setUserProfile({ nama: user.email.split("@")[0], role: "admin" });
        }
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-latar overflow-hidden">
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex-shrink-0 bg-white border-b border-gray-100 h-16 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaBars className="text-xl" />
            </button>

            {/* Search Bar (Optional) */}
            <div className="hidden md:flex items-center bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 focus-within:border-primary-light focus-within:ring-2 focus-within:ring-primary-light/20 transition-all w-64">
              <FaSearch className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Cari data..."
                className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-primary-dark transition-colors">
              <FaBell className="text-xl" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-gray-800">
                  {userProfile?.nama || "Memuat..."}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {userProfile?.role || "User"}
                </p>
              </div>
              {/* Avatar Placeholder */}
              <img
                src={`https://ui-avatars.com/api/?name=${
                  userProfile?.nama || "Admin"
                }&background=16A34A&color=fff`}
                alt="Admin"
                className="w-9 h-9 rounded-full border-2 border-white shadow-sm cursor-pointer hover:opacity-80 transition-opacity"
              />
              <button
                onClick={handleLogout}
                className="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Keluar"
              >
                <FaSignOutAlt />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-latar p-4 lg:p-8 custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
