import React from "react";
import {
  FaTree,
  FaMapMarkedAlt,
  FaUsers,
  FaClipboardCheck,
  FaArrowUp,
  FaArrowDown,
  FaEllipsisH,
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="space-y-8 font-outfit">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Dashboard Overview
          </h2>
          <p className="text-gray-500 mt-1">
            Selamat datang kembali, Admin! Berikut ringkasan hari ini.
          </p>
        </div>
        <div className="flex gap-3">
          <select className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-primary-dark focus:border-primary-dark block p-2.5 shadow-sm">
            <option>Minggu Ini</option>
            <option>Bulan Ini</option>
            <option>Tahun Ini</option>
          </select>
          <button className="bg-primary-dark hover:bg-green-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-lg shadow-primary-dark/30 transition-all">
            Unduh Laporan
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total RTH"
          value="124"
          change="+12%"
          isPositive={true}
          icon={FaTree}
          color="bg-green-100 text-green-600"
        />
        <StatsCard
          title="Luas Area (Ha)"
          value="450.5"
          change="+5.2%"
          isPositive={true}
          icon={FaMapMarkedAlt}
          color="bg-blue-100 text-blue-600"
        />
        <StatsCard
          title="Pengunjung (Bln)"
          value="1,205"
          change="-2.4%"
          isPositive={false}
          icon={FaUsers}
          color="bg-orange-100 text-orange-600"
        />
        <StatsCard
          title="Laporan Selesai"
          value="98"
          change="+18%"
          isPositive={true}
          icon={FaClipboardCheck}
          color="bg-purple-100 text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Section (Placeholder for Chart.js/Recharts) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">
              Statistik Kunjungan RTH
            </h3>
            <button className="text-gray-400 hover:text-primary-dark">
              <FaEllipsisH />
            </button>
          </div>
          {/* Simple CSS Bar Chart Placeholder */}
          <div className="h-64 flex items-end justify-between gap-2 mt-4 px-2">
            {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
              <div
                key={i}
                className="w-full bg-gray-50 rounded-t-lg relative group h-full flex items-end"
              >
                <div
                  style={{ height: `${h}%` }}
                  className="w-full bg-primary-dark/80 group-hover:bg-primary-dark rounded-t-md transition-all duration-300 relative"
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded shadow transition-opacity">
                    {h * 10}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400 font-medium px-1">
            <span>Sen</span>
            <span>Sel</span>
            <span>Rab</span>
            <span>Kam</span>
            <span>Jum</span>
            <span>Sab</span>
            <span>Min</span>
          </div>
        </div>

        {/* Categories Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">
            Distribusi Kategori
          </h3>
          <div className="space-y-5">
            <CategoryItem
              label="Taman Kota"
              count={45}
              color="bg-green-500"
              percentage={45}
            />
            <CategoryItem
              label="Hutan Kota"
              count={20}
              color="bg-emerald-700"
              percentage={20}
            />
            <CategoryItem
              label="Jalur Hijau"
              count={35}
              color="bg-lime-500"
              percentage={35}
            />
            <CategoryItem
              label="Pemakaman"
              count={15}
              color="bg-gray-400"
              percentage={15}
            />
          </div>

          <div className="mt-8 p-4 bg-primary-light/30 rounded-xl border border-primary-light">
            <h4 className="text-sm font-bold text-primary-dark mb-1">
              Tips Hari Ini
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Pastikan data luas area diupdate setiap bulan untuk akurasi
              laporan dinas.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Aktivitas Terbaru</h3>
          <button className="text-sm text-primary-dark font-medium hover:underline">
            Lihat Semua
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-gray-500 uppercase font-semibold text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Aktivitas</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <ActivityRow
                activity="Update Data Taman Kota"
                user="Admin 1"
                date="03 Des 2025"
                status="Selesai"
                statusColor="bg-green-100 text-green-700"
              />
              <ActivityRow
                activity="Laporan Kerusakan Fasilitas"
                user="Budi Santoso"
                date="02 Des 2025"
                status="Pending"
                statusColor="bg-yellow-100 text-yellow-700"
              />
              <ActivityRow
                activity="Penambahan Lokasi Baru"
                user="Admin 2"
                date="01 Des 2025"
                status="Review"
                statusColor="bg-blue-100 text-blue-700"
              />
              <ActivityRow
                activity="Verifikasi Lahan Rumbai"
                user="Siti Aminah"
                date="30 Nov 2025"
                status="Ditolak"
                statusColor="bg-red-100 text-red-700"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Sub-components for cleaner code
const StatsCard = ({ title, value, change, isPositive, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <span
        className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${
          isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
        }`}
      >
        {isPositive ? (
          <FaArrowUp className="mr-1" />
        ) : (
          <FaArrowDown className="mr-1" />
        )}
        {change}
      </span>
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
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
        className={`h-2 rounded-full ${color}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

const ActivityRow = ({ activity, user, date, status, statusColor }) => (
  <tr className="hover:bg-gray-50/80 transition-colors group">
    <td className="px-6 py-4 font-medium text-gray-800">{activity}</td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
          {user.charAt(0)}
        </div>
        {user}
      </div>
    </td>
    <td className="px-6 py-4 text-gray-500">{date}</td>
    <td className="px-6 py-4">
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}
      >
        {status}
      </span>
    </td>
    <td className="px-6 py-4 text-right">
      <button className="text-gray-400 hover:text-primary-dark opacity-0 group-hover:opacity-100 transition-opacity">
        Detail
      </button>
    </td>
  </tr>
);

export default Dashboard;
