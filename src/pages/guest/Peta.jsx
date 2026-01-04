import React, { useState } from "react";
import MapComponent from "../../components/MapComponent";
import {
  FaTree,
  FaFilter,
  FaLayerGroup,
  FaInfoCircle,
  FaTimes,
  FaPagelines,
  FaRoad,
  FaBuilding,
  FaMountain,
  FaShapes,
  FaMonument,
} from "react-icons/fa";

const Peta = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    taman: true,
    hutan: true,
    jalur: true,
    private: true,
    wisata: true,
    pemakaman: true,
    lainnya: true,
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div className="relative flex h-[calc(100vh-100px)] overflow-hidden">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Filters */}
      <aside
        className={`
          absolute z-50 bg-white shadow-2xl rounded-tr-2xl rounded-br-2xl lg:rounded-2xl
          flex flex-col transition-transform duration-300 ease-in-out border border-gray-100
          
          /* Mobile Sizing & Pos */
          top-0 left-0 h-full w-4/5 max-w-[320px] 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}

          /* Desktop Sizing & Pos (Floating Panel) */
          lg:translate-x-0 lg:top-4 lg:left-4 lg:h-[calc(100%-32px)] lg:w-80
        `}
      >
        {/* Header Section */}
        <div className="px-6 py-6 pb-4 flex-shrink-0 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-primary-dark font-outfit mb-1">
              Peta Sebaran
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed font-outfit">
              Eksplorasi Ruang Terbuka Hijau
            </p>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 -mr-2 text-gray-400 hover:text-primary-dark transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Search & Filter Content */}
        <div className="flex-1 overflow-y-auto px-6 py-2 pb-6 custom-scrollbar space-y-6">
          {/* Search Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaTree className="text-gray-400 group-focus-within:text-primary-dark transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Cari lokasi RTH..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-dark/20 focus:border-primary-dark outline-none transition-all text-sm font-medium font-outfit shadow-sm"
            />
          </div>

          {/* Filter Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 font-outfit text-sm">
                Kategori & Layer
              </h3>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold bg-gray-100 px-2 py-0.5 rounded-full">
                Filter
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  id: "taman",
                  label: "Taman Kota",
                  icon: FaTree,
                  color: "bg-green-500",
                  iconColor: "text-green-600",
                  activeClass: "border-green-500 bg-green-50 text-green-800",
                },
                {
                  id: "hutan",
                  label: "Hutan Kota",
                  icon: FaPagelines,
                  color: "bg-emerald-700",
                  iconColor: "text-emerald-700",
                  activeClass:
                    "border-emerald-700 bg-emerald-50 text-emerald-800",
                },
                {
                  id: "jalur",
                  label: "Jalur Hijau",
                  icon: FaRoad,
                  color: "bg-lime-500",
                  iconColor: "text-lime-600",
                  activeClass: "border-lime-500 bg-lime-50 text-lime-800",
                },
                {
                  id: "private",
                  label: "RTH Private",
                  icon: FaBuilding,
                  color: "bg-orange-400",
                  iconColor: "text-orange-500",
                  activeClass: "border-orange-500 bg-orange-50 text-orange-800",
                },
                {
                  id: "wisata",
                  label: "Wisata Alam",
                  icon: FaMountain,
                  color: "bg-teal-500",
                  iconColor: "text-teal-600",
                  activeClass: "border-teal-500 bg-teal-50 text-teal-800",
                },
                {
                  id: "pemakaman",
                  label: "Pemakaman",
                  icon: FaMonument,
                  color: "bg-indigo-500",
                  iconColor: "text-indigo-600",
                  activeClass: "border-indigo-500 bg-indigo-50 text-indigo-800",
                },
                {
                  id: "lainnya",
                  label: "Lainnya",
                  icon: FaShapes,
                  color: "bg-gray-500",
                  iconColor: "text-gray-500",
                  activeClass: "border-gray-500 bg-gray-50 text-gray-800",
                },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, [cat.id]: !prev[cat.id] }))
                  }
                  className={`
                    relative p-3 rounded-xl border text-left flex flex-col gap-3 transition-all duration-200 group
                    ${
                      filters[cat.id]
                        ? `${cat.activeClass} shadow-sm ring-1 ring-inset ring-black/5`
                        : "border-gray-100 bg-white text-gray-400 hover:bg-gray-50 hover:border-gray-200"
                    }
                  `}
                >
                  <div className="flex items-center justify-between w-full">
                    <cat.icon
                      className={`text-xl transition-colors ${
                        filters[cat.id] ? cat.iconColor : "text-gray-300"
                      }`}
                    />
                    <span
                      className={`w-2.5 h-2.5 rounded-full shadow-sm transition-transform duration-300 ${
                        filters[cat.id] ? "scale-100" : "scale-75 opacity-50"
                      } ${cat.color}`}
                    />
                  </div>

                  <span className="text-xs font-bold font-outfit truncate w-full block">
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-blue-50/80 p-4 rounded-xl border border-blue-100/50 backdrop-blur-sm">
            <div className="flex gap-3">
              <FaInfoCircle className="text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-xs font-semibold text-blue-800 font-outfit">
                  Informasi Peta
                </p>
                <p className="text-[11px] text-blue-600/80 leading-relaxed font-outfit">
                  Warna pada tombol filter sesuai dengan warna area/marker di
                  peta. Klik tombol untuk menyembunyikan atau menampilkan
                  kategori.
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Map Area */}
      <main className="w-full h-full bg-white relative">
        <MapComponent filters={filters} searchTerm={searchTerm} />

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden absolute bottom-6 right-6 bg-primary-dark text-white p-4 rounded-full shadow-lg z-[30] hover:scale-105 active:scale-95 transition-all duration-200 group"
          aria-label="Filter Peta"
        >
          <FaFilter className="text-xl group-hover:rotate-12 transition-transform" />
        </button>
      </main>
    </div>
  );
};

export default Peta;
