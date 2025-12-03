import React, { useState } from 'react';
import MapComponent from '../../components/MapComponent';
import { FaTree, FaFilter, FaLayerGroup, FaInfoCircle } from 'react-icons/fa';

const Peta = () => {
  const [filters, setFilters] = useState({
    taman: true,
    hutan: true,
    jalur: true,
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-100px)] gap-6">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-80 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-shrink-0 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-primary-dark font-outfit mb-2">Peta Sebaran RTH</h1>
          <p className="text-sm text-teks-samping">
            Filter dan jelajahi lokasi Ruang Terbuka Hijau di Pekanbaru.
          </p>
        </div>

        <div className="space-y-6">
          {/* Filter Section */}
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-primary-dark mb-4">
              <FaFilter className="text-accent" /> Filter Kategori
            </h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  name="taman"
                  checked={filters.taman}
                  onChange={handleFilterChange}
                  className="form-checkbox h-5 w-5 text-primary-dark rounded border-gray-300 focus:ring-primary-dark transition duration-150 ease-in-out" 
                />
                <span className="text-teks group-hover:text-primary-dark transition-colors">Taman Kota</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  name="hutan"
                  checked={filters.hutan}
                  onChange={handleFilterChange}
                  className="form-checkbox h-5 w-5 text-primary-dark rounded border-gray-300 focus:ring-primary-dark transition duration-150 ease-in-out" 
                />
                <span className="text-teks group-hover:text-primary-dark transition-colors">Hutan Kota</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  name="jalur"
                  checked={filters.jalur}
                  onChange={handleFilterChange}
                  className="form-checkbox h-5 w-5 text-primary-dark rounded border-gray-300 focus:ring-primary-dark transition duration-150 ease-in-out" 
                />
                <span className="text-teks group-hover:text-primary-dark transition-colors">Jalur Hijau</span>
              </label>
            </div>
          </div>

          {/* Legend Section */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="flex items-center gap-2 font-semibold text-primary-dark mb-4">
              <FaLayerGroup className="text-accent" /> Legenda
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-teks">Taman Kota (Aktif)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-emerald-700"></div>
                <span className="text-teks">Hutan Kota</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-lime-400"></div>
                <span className="text-teks">Jalur Hijau</span>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-primary-light/50 p-4 rounded-xl border border-primary-light mt-6">
            <div className="flex gap-3">
              <FaInfoCircle className="text-primary-dark mt-1 flex-shrink-0" />
              <p className="text-xs text-primary-dark leading-relaxed">
                Data diperbarui terakhir pada <strong>Desember 2025</strong>. Klik marker pada peta untuk melihat detail lokasi.
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Map Area */}
      <main className="flex-grow bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
        <MapComponent />
        
        {/* Mobile Filter Toggle (Visible only on small screens) */}
        <button className="lg:hidden absolute bottom-4 right-4 bg-primary-dark text-white p-3 rounded-full shadow-lg z-[1000]">
          <FaFilter />
        </button>
      </main>
    </div>
  );
};

export default Peta;
