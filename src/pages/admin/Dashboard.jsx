import React from 'react';
import { FaTree, FaUsers, FaMapMarkedAlt, FaClipboardList } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 font-outfit">Dashboard Overview</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-4 bg-green-100 rounded-full text-green-600">
            <FaTree className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total RTH</p>
            <h3 className="text-2xl font-bold text-gray-800">124</h3>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-4 bg-blue-100 rounded-full text-blue-600">
            <FaMapMarkedAlt className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Luas Area (Ha)</p>
            <h3 className="text-2xl font-bold text-gray-800">450.5</h3>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-4 bg-yellow-100 rounded-full text-yellow-600">
            <FaUsers className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pengunjung (Bln)</p>
            <h3 className="text-2xl font-bold text-gray-800">1,205</h3>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-4 bg-purple-100 rounded-full text-purple-600">
            <FaClipboardList className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Laporan Baru</p>
            <h3 className="text-2xl font-bold text-gray-800">12</h3>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Aktivitas Terbaru</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-800 uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Aktivitas</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">#1023</td>
                <td className="px-6 py-4">Update Data Taman Kota</td>
                <td className="px-6 py-4">Admin 1</td>
                <td className="px-6 py-4">03 Des 2025</td>
                <td className="px-6 py-4"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Selesai</span></td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">#1022</td>
                <td className="px-6 py-4">Laporan Kerusakan Fasilitas</td>
                <td className="px-6 py-4">Budi Santoso</td>
                <td className="px-6 py-4">02 Des 2025</td>
                <td className="px-6 py-4"><span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">Pending</span></td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">#1021</td>
                <td className="px-6 py-4">Penambahan Lokasi Baru</td>
                <td className="px-6 py-4">Admin 2</td>
                <td className="px-6 py-4">01 Des 2025</td>
                <td className="px-6 py-4"><span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Review</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
