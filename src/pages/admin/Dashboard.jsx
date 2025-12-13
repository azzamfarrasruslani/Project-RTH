import React, { useEffect, useState } from "react";
import {
  FaTree,
  FaMapMarkedAlt,
  FaArrowUp,
  FaSync,
  FaRecycle,
  FaLeaf,
} from "react-icons/fa";
import { rthService } from "../../services/rthService";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRTH: 0,
    totalLuas: 0,
    kategori: [],
    latestData: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await rthService.getAll();
        if (data) {
          // 1. Total RTH
          const totalCount = data.length;

          // 2. Total Luas
          const totalArea = data.reduce(
            (acc, curr) => acc + (parseFloat(curr.luas) || 0),
            0
          );

          // 3. Kategori Distribution
          const categoryCounts = data.reduce((acc, curr) => {
            acc[curr.kategori] = (acc[curr.kategori] || 0) + 1;
            return acc;
          }, {});

          const categoryData = Object.keys(categoryCounts).map((key) => ({
            label: key,
            count: categoryCounts[key],
            percentage: Math.round((categoryCounts[key] / totalCount) * 100),
          }));

          // 4. Latest 5 Data (Assuming id implies recency, better if timestamp created_at exists)
          const latest = [...data].sort((a, b) => b.id - a.id).slice(0, 5);

          setStats({
            totalRTH: totalCount,
            totalLuas: totalArea.toFixed(2),
            kategori: categoryData,
            latestData: latest,
          });
        }
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">Memuat statistik...</div>
    );
  }

  return (
    <div className="space-y-8 font-outfit">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Dashboard Overview
          </h2>
          <p className="text-gray-500 mt-1">
            Ringkasan data Ruang Terbuka Hijau Pekanbaru.
          </p>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total RTH"
          value={stats.totalRTH}
          subtext="Lokasi Terdaftar"
          icon={FaTree}
          color="bg-green-100 text-green-600"
        />
        <StatsCard
          title="Total Luas (Ha)"
          value={stats.totalLuas}
          subtext="Hektar Area Hijau"
          icon={FaMapMarkedAlt}
          color="bg-blue-100 text-blue-600"
        />
        <StatsCard
          title="Kategori Utama"
          value={stats.kategori.length > 0 ? stats.kategori[0].label : "-"}
          subtext="Jenis Terbanyak"
          icon={FaLeaf}
          color="bg-emerald-100 text-emerald-600"
        />
        <StatsCard
          title="Status Data"
          value="Up to Date"
          subtext="Real-time Sync"
          icon={FaSync}
          color="bg-purple-100 text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* RTH Terbaru (Menggantikan Activity Log) */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">
              Data RTH Terbaru
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50/50 text-gray-500 uppercase font-semibold text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4">Nama RTH</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">Luas</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {stats.latestData.length > 0 ? (
                  stats.latestData.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50/80 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {item.nama}
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded inline-block">
                          {item.kategori}
                        </span>
                      </td>
                      <td className="px-6 py-4">{item.luas} Ha</td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            item.status === "Aktif"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {item.status || "N/A"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-center text-gray-400"
                    >
                      Belum ada data.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Categories Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h3 className="text-lg font-bold text-gray-800 mb-6">
            Distribusi Kategori
          </h3>
          <div className="space-y-5">
            {stats.kategori.map((cat, idx) => (
              <CategoryItem
                key={idx}
                label={cat.label}
                count={cat.percentage}
                color={`bg-green-${((idx % 3) + 4) * 100}`}
                percentage={cat.percentage}
              />
            ))}
            {stats.kategori.length === 0 && (
              <p className="text-gray-400 text-sm">Tidak ada data kategori.</p>
            )}
          </div>

          <div className="mt-8 p-4 bg-primary-light/30 rounded-xl border border-primary-light">
            <h4 className="text-sm font-bold text-primary-dark mb-1">
              Tips Admin
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Jaga keseimbangan proporsi jenis RTH untuk memenuhi target tata
              kota yang ideal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components
const StatsCard = ({ title, value, subtext, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      <p className="text-xs text-gray-400 mt-1">{subtext}</p>
    </div>
  </div>
);

const CategoryItem = ({ label, count, color, percentage }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="font-medium text-gray-700">{label}</span>
      <span className="text-gray-500">{count}%</span>
    </div>
    <div className="w-full bg-gray-100 rounded-full h-2">
      <div
        className={`h-2 rounded-full bg-primary-dark`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

export default Dashboard;
