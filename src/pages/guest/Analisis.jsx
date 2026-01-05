import React, { useState, useEffect } from "react";
import {
  FaChartPie,
  FaChartBar,
  FaTree,
  FaMapMarkedAlt,
  FaLeaf,
} from "react-icons/fa";

const Analisis = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPoints: 0,
    totalLuas: 0,
    categoryCounts: {},
    categoryAreas: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { rthService } = await import("../../services/rthService");
        const data = await rthService.getAll();

        if (data) {
          const totalPoints = data.length;
          const totalLuas = data.reduce((acc, curr) => {
            const val = curr.luas;
            const str =
              typeof val === "string"
                ? val.replace(",", ".")
                : String(val || 0);
            return acc + (parseFloat(str) || 0);
          }, 0);

          const categoryCounts = {};
          const categoryAreas = {};

          data.forEach((item) => {
            const cat = item.kategori || "Lainnya";
            // Ensure luas is string before replace, or handle number directly
            const luasVal = item.luas;
            const luasStr =
              typeof luasVal === "string"
                ? luasVal.replace(",", ".")
                : String(luasVal || 0);

            const luas = parseFloat(luasStr) || 0;

            categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
            categoryAreas[cat] = (categoryAreas[cat] || 0) + luas;
          });

          setStats({
            totalPoints,
            totalLuas,
            categoryCounts,
            categoryAreas,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Prepare data for visualization
  const sortedCategories = Object.keys(stats.categoryCounts).sort(
    (a, b) => stats.categoryCounts[b] - stats.categoryCounts[a]
  );

  const maxCount = Math.max(...Object.values(stats.categoryCounts), 1);
  const maxArea = Math.max(...Object.values(stats.categoryAreas), 1);

  // Color palette for charts
  const colors = {
    "Taman Kota": "bg-green-500",
    "Hutan Kota": "bg-emerald-700",
    "Jalur Hijau": "bg-lime-500",
    "RTH Private": "bg-orange-400",
    "Taman Wisata Alam": "bg-teal-500",
    Pemakaman: "bg-indigo-500",
    Lainnya: "bg-gray-400",
  };

  const textColors = {
    "Taman Kota": "text-green-600",
    "Hutan Kota": "text-emerald-800",
    "Jalur Hijau": "text-lime-700",
    "RTH Private": "text-orange-600",
    "Taman Wisata Alam": "text-teal-700",
    Pemakaman: "text-indigo-700",
    Lainnya: "text-gray-600",
  };

  return (
    <div className="min-h-screen bg-gray-50 font-outfit pb-20 pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-dark font-bold text-sm tracking-widest uppercase mb-4 block animate-fadeIn">
            // Data Insight
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-6 animate-slideUp">
            Analisis & Statistik <span className="text-primary-dark">RTH</span>
          </h1>
          <p className="text-teks-samping text-lg leading-relaxed animate-slideUp delay-100">
            Pemetaan data statistik Ruang Terbuka Hijau di Pekanbaru untuk
            mendukung pengambilan keputusan berbasis data dan transparansi
            informasi ke publik.
          </p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-scaleIn delay-200">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-4 group-hover:bg-green-100 transition-colors">
                <FaTree className="text-2xl" />
              </div>
              <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-1">
                Total Titik RTH
              </h3>
              <p className="text-4xl font-bold text-gray-800">
                {stats.totalPoints}{" "}
                <span className="text-lg text-gray-400 font-normal">
                  Lokasi
                </span>
              </p>
            </div>
            <div className="absolute -right-4 -bottom-4 text-green-50 opacity-50 transform rotate-12 group-hover:scale-110 transition-transform">
              <FaTree className="text-9xl" />
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-100 transition-colors">
                <FaMapMarkedAlt className="text-2xl" />
              </div>
              <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-1">
                Total Luas Area
              </h3>
              <p className="text-4xl font-bold text-gray-800">
                {stats.totalLuas.toLocaleString("id-ID", {
                  maximumFractionDigits: 2,
                })}{" "}
                <span className="text-lg text-gray-400 font-normal">Ha</span>
              </p>
            </div>
            <div className="absolute -right-4 -bottom-4 text-blue-50 opacity-50 transform rotate-12 group-hover:scale-110 transition-transform">
              <FaMapMarkedAlt className="text-9xl" />
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 mb-4 group-hover:bg-orange-100 transition-colors">
                <FaLeaf className="text-2xl" />
              </div>
              <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-1">
                Kategori RTH
              </h3>
              <p className="text-4xl font-bold text-gray-800">
                {Object.keys(stats.categoryCounts).length}{" "}
                <span className="text-lg text-gray-400 font-normal">Jenis</span>
              </p>
            </div>
            <div className="absolute -right-4 -bottom-4 text-orange-50 opacity-50 transform rotate-12 group-hover:scale-110 transition-transform">
              <FaLeaf className="text-9xl" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-slideUp delay-300">
          {/* Distribution Chart (Simple Bar) */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-primary-light p-2 rounded-lg">
                <FaChartBar className="text-primary-dark text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Sebaran Jumlah Titik per Kategori
              </h3>
            </div>

            <div className="space-y-6">
              {sortedCategories.map((cat, idx) => {
                const count = stats.categoryCounts[cat];
                const percentage = (count / stats.totalPoints) * 100;

                return (
                  <div key={cat} className="group">
                    <div className="flex justify-between items-end mb-2">
                      <span
                        className={`font-semibold text-sm ${
                          textColors[cat] || "text-gray-700"
                        }`}
                      >
                        {cat}
                      </span>
                      <span className="text-sm font-bold text-gray-800">
                        {count}{" "}
                        <span className="text-xs text-gray-400 font-normal">
                          ({percentage.toFixed(1)}%)
                        </span>
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${
                          colors[cat] || "bg-gray-400"
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Area Chart (Horizontal Bars for visual variety) */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FaChartPie className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Proporsi Luas Area (Hektar)
              </h3>
            </div>

            <div className="space-y-6">
              {sortedCategories.map((cat) => {
                const area = stats.categoryAreas[cat];
                const percentage = (area / maxArea) * 100; // Relative to max for visual scaling

                return (
                  <div key={cat} className="group flex items-center gap-4">
                    <div className="w-32 flex-shrink-0 text-right">
                      <span
                        className="text-sm font-medium text-gray-500 truncate block"
                        title={cat}
                      >
                        {cat}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-50 rounded-r-full h-8 flex items-center">
                          <div
                            className={`h-full rounded-r-full flex items-center px-3 transition-all duration-1000 ease-out ${
                              colors[cat]?.replace(
                                "bg-",
                                "bg-opacity-20 bg-"
                              ) || "bg-gray-100"
                            }`}
                            style={{ width: `${percentage}%`, minWidth: "4px" }}
                          >
                            <div
                              className={`h-1.5 w-full rounded-full ${
                                colors[cat] || "bg-gray-400"
                              }`}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-gray-700 w-20 text-right">
                          {area.toLocaleString("id-ID", {
                            maximumFractionDigits: 1,
                          })}{" "}
                          Ha
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                * Data dihitung berdasarkan total luas area yang terdaftar dalam
                sistem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analisis;
