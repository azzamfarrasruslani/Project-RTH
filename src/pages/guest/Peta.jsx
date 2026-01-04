import React, { useState } from "react";
import MapComponent from "../../components/MapComponent";
import {
  FaTree,
  FaFilter,
  FaLayerGroup,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

const Peta = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    taman: true,
    hutan: true,
    jalur: true,
    private: true,
    wisata: true,
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
        <div className="p-6 pb-2 flex-shrink-0 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-primary-dark font-outfit mb-2">
              Peta Sebaran
            </h1>
            <p className="text-sm text-teks-samping">
              Filter dan jelajahi lokasi RTH.
            </p>
          </div>
          {/* Close Button Mobile */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 -mr-2 text-gray-400 hover:text-primary-dark transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="px-6 py-2">
          <input
            type="text"
            placeholder="Cari lokasi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary-dark focus:border-primary-dark outline-none transition-all text-sm"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-6 pt-2 custom-scrollbar space-y-6">
          {/* Filter Section */}
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-primary-dark mb-4 sticky top-0 bg-white py-2 z-10">
              <FaFilter className="text-accent" /> Filter Kategori
            </h3>
            <div className="space-y-3 pl-1">
              <label className="flex items-center space-x-3 cursor-pointer group p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  name="taman"
                  checked={filters.taman}
                  onChange={handleFilterChange}
                  className="form-checkbox h-5 w-5 text-primary-dark rounded border-gray-300 focus:ring-primary-dark transition duration-150 ease-in-out"
                />
                <span className="text-teks group-hover:text-primary-dark transition-colors font-medium">
                  Taman Kota
                </span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  name="hutan"
                  checked={filters.hutan}
                  onChange={handleFilterChange}
                  className="form-checkbox h-5 w-5 text-primary-dark rounded border-gray-300 focus:ring-primary-dark transition duration-150 ease-in-out"
                />
                <span className="text-teks group-hover:text-primary-dark transition-colors font-medium">
                  Hutan Kota
                </span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  name="jalur"
                  checked={filters.jalur}
                  onChange={handleFilterChange}
                  className="form-checkbox h-5 w-5 text-primary-dark rounded border-gray-300 focus:ring-primary-dark transition duration-150 ease-in-out"
                />
                <span className="text-teks group-hover:text-primary-dark transition-colors font-medium">
                  Jalur Hijau
                </span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  name="private"
                  checked={filters.private}
                  onChange={handleFilterChange}
                  className="form-checkbox h-5 w-5 text-primary-dark rounded border-gray-300 focus:ring-primary-dark transition duration-150 ease-in-out"
                />
                <span className="text-teks group-hover:text-primary-dark transition-colors font-medium">
                  RTH Private
                </span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  name="wisata"
                  checked={filters.wisata}
                  onChange={handleFilterChange}
                  className="form-checkbox h-5 w-5 text-primary-dark rounded border-gray-300 focus:ring-primary-dark transition duration-150 ease-in-out"
                />
                <span className="text-teks group-hover:text-primary-dark transition-colors font-medium">
                  Taman Wisata Alam
                </span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  name="lainnya"
                  checked={filters.lainnya}
                  onChange={handleFilterChange}
                  className="form-checkbox h-5 w-5 text-primary-dark rounded border-gray-300 focus:ring-primary-dark transition duration-150 ease-in-out"
                />
                <span className="text-teks group-hover:text-primary-dark transition-colors font-medium">
                  Lainnya
                </span>
              </label>
            </div>
          </div>

          {/* Legend Section */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="flex items-center gap-2 font-semibold text-primary-dark mb-4">
              <FaLayerGroup className="text-accent" /> Legenda
            </h3>
            <div className="space-y-3 text-sm pl-1">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50/50">
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm ring-2 ring-green-100"></div>
                <span className="text-teks font-medium">
                  Taman Kota (Aktif)
                </span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50/50">
                <div className="w-3 h-3 rounded-full bg-emerald-700 shadow-sm ring-2 ring-emerald-100"></div>
                <span className="text-teks font-medium">Hutan Kota</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50/50">
                <div className="w-3 h-3 rounded-full bg-lime-400 shadow-sm ring-2 ring-lime-100"></div>
                <span className="text-teks font-medium">Jalur Hijau</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50/50">
                <div className="w-3 h-3 rounded-full bg-orange-400 shadow-sm ring-2 ring-orange-100"></div>
                <span className="text-teks font-medium">RTH Private</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50/50">
                <div className="w-3 h-3 rounded-full bg-teal-500 shadow-sm ring-2 ring-teal-100"></div>
                <span className="text-teks font-medium">Taman Wisata</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50/50">
                <div className="w-3 h-3 rounded-full bg-gray-500 shadow-sm ring-2 ring-gray-100"></div>
                <span className="text-teks font-medium">Lainnya</span>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 mt-6">
            <div className="flex gap-3 items-start">
              <FaInfoCircle className="text-primary-dark mt-0.5 flex-shrink-0" />
              <p className="text-xs text-primary-dark leading-relaxed">
                Data diperbarui terakhir pada <strong>Desember 2025</strong>.
                Klik marker pada peta untuk melihat detail lokasi.
              </p>
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
