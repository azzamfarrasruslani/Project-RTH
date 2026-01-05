import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaTree,
  FaSearch,
  FaMapMarkerAlt,
  FaRulerCombined,
  FaArrowRight,
  FaFilter,
} from "react-icons/fa";

const DaftarRTH = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = [
    "Semua",
    "Taman Kota",
    "Hutan Kota",
    "Jalur Hijau",
    "RTH Private",
    "Taman Wisata Alam",
    "Pemakaman",
    "Lainnya",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { rthService } = await import("../../services/rthService");
        const result = await rthService.getAll();
        setData(result || []);
        setFilteredData(result || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let result = data;

    // Filter by Search
    if (searchTerm) {
      result = result.filter((item) =>
        item.nama.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by Category
    if (selectedCategory !== "Semua") {
      if (selectedCategory === "Lainnya") {
        result = result.filter(
          (item) =>
            ![
              "Taman Kota",
              "Hutan Kota",
              "Jalur Hijau",
              "RTH Private",
              "Taman Wisata Alam",
              "Pemakaman",
            ].includes(item.kategori)
        );
      } else {
        result = result.filter((item) => item.kategori === selectedCategory);
      }
    }

    setFilteredData(result);
  }, [searchTerm, selectedCategory, data]);

  return (
    <div className="min-h-screen bg-gray-50 font-outfit pb-20 pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary-dark font-bold text-sm tracking-widest uppercase mb-4 block animate-fadeIn">
            // Jelajahi Kota
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-6 animate-slideUp">
            Temukan <span className="text-primary-dark">Ruang Hijau</span> di
            Sekitarmu
          </h1>
          <p className="text-teks-samping text-lg leading-relaxed animate-slideUp delay-100">
            Telusuri daftar lengkap Ruang Terbuka Hijau di Pekanbaru. Temukan
            taman favoritmu dan nikmati suasana alam di tengah kota.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-12 flex flex-col md:flex-row gap-4 items-center animate-scaleIn delay-200 sticky top-24 z-30">
          <div className="relative w-full md:flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama lokasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-dark/20 focus:border-primary-dark outline-none transition-all"
            />
          </div>
          <div className="w-full md:w-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="text-gray-400 group-focus-within:text-primary-dark transition-colors" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-64 pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-dark/20 focus:border-primary-dark outline-none transition-all appearance-none cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-white rounded-3xl overflow-hidden h-96 animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData.map((item, idx) => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col hover:-translate-y-1"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.foto_utama}
                    alt={item.nama}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-primary-dark uppercase tracking-wider shadow-sm">
                      {item.kategori}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-text-dark mb-3 line-clamp-1 group-hover:text-primary-dark transition-colors">
                    {item.nama}
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2 text-sm text-teks-samping">
                      <FaMapMarkerAlt className="mt-1 text-primary-dark/60 flex-shrink-0" />
                      <span className="line-clamp-2">{item.alamat}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-teks-samping">
                      <FaRulerCombined className="text-primary-dark/60 flex-shrink-0" />
                      <span>{item.luas} Ha</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-100">
                    <Link
                      to={`/peta/${item.id}`}
                      className="flex items-center justify-between text-primary-dark font-semibold group/link"
                    >
                      <span className="group-hover/link:underline">
                        Lihat Detail
                      </span>
                      <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center group-hover/link:translate-x-1 transition-transform">
                        <FaArrowRight className="text-xs" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
              <FaTree className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Tidak ada data ditemukan
            </h3>
            <p className="text-gray-500">
              Coba ubah kata kunci pencarian atau filter kategori.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DaftarRTH;
