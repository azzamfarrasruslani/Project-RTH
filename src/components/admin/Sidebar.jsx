import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaThLarge,
  FaMapMarkedAlt,
  FaClipboardList,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaLeaf,
  FaTimes,
} from "react-icons/fa";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { path: "/admin/dashboard", icon: FaThLarge, label: "Dashboard" },
    { path: "/admin/data-rth", icon: FaMapMarkedAlt, label: "Data RTH" }, // Placeholder route
    { path: "/admin/laporan", icon: FaClipboardList, label: "Laporan Masuk" }, // Placeholder route
    { path: "/admin/users", icon: FaUsers, label: "Kelola Pengguna" }, // Placeholder route
    { path: "/admin/settings", icon: FaCog, label: "Pengaturan" }, // Placeholder route
  ];

  const handleLogout = () => {
    // Implement logout logic here
    navigate("/login");
  };

  return (
    <>
      {/* Sidebar Container */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-72 bg-white border-r border-gray-100 shadow-xl lg:shadow-none
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col h-full
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary-dark/10 p-2 rounded-lg">
              <FaLeaf className="text-primary-dark text-xl" />
            </div>
            <div>
              <h1 className="font-outfit font-bold text-xl text-primary-dark">
                Admin Panel
              </h1>
              <p className="text-xs text-teks-samping">RTH Pekanbaru</p>
            </div>
          </div>
          {/* Close Button (Mobile Only) */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group font-medium
                ${
                  isActive
                    ? "bg-primary-dark text-white shadow-md shadow-primary-dark/20"
                    : "text-teks hover:bg-gray-50 hover:text-primary-dark"
                }
              `}
            >
              <item.icon className="text-lg" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer / User Profile */}
        <div className="p-4 border-t border-gray-50">
          <div className="bg-gray-50 rounded-xl p-4 mb-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary-dark text-white flex items-center justify-center font-bold">
                A
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  Administrator
                </p>
                <p className="text-xs text-gray-500 truncate">admin@rth.com</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
            >
              <FaSignOutAlt />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Sidebar;
