import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaSearch,
  FaFilter,
  FaEdit,
  FaTrash,
  FaTree,
  FaMapMarkerAlt,
  FaEllipsisV,
} from "react-icons/fa";

const DataRTH = () => {
  const navigate = useNavigate();

  // Fetch RTH Data
  const [dataRTH, setDataRTH] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await import("../../services/rthService").then((m) =>
        m.rthService.getAll()
      );
      if (data) {
        // Map backend fields to frontend fields
        const mappedData = data.map((item) => ({
          id: item.id,
          nama: item.nama,
          kategori: item.kategori,
          luas: item.luas,
          lokasi: item.alamat, // Mapping 'alamat' to 'lokasi' for table display
          status: item.status,
        }));
        setDataRTH(mappedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await import("../../services/rthService").then((m) =>
          m.rthService.delete(id)
        );
        fetchData(); // Refresh data
      } catch (error) {
        console.error("Error deleting data:", error);
        alert("Gagal menghapus data.");
      }
    }
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const filteredData = dataRTH.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lokasi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8 font-outfit">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Manajemen Data RTH
          </h2>
          <p className="text-gray-500 mt-1">
            Kelola data lokasi Ruang Terbuka Hijau di Pekanbaru.
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/data-rth/add")}
          className="flex items-center gap-2 bg-primary-dark hover:bg-green-800 text-white font-medium rounded-xl text-sm px-6 py-3 transition-all shadow-lg shadow-primary-dark/20 hover:shadow-primary-dark/40 active:scale-95"
        >
          <FaPlus />
          <span>Tambah Data Baru</span>
        </button>
      </div>

      {/* Filter & Action Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cari nama RTH atau lokasi..."
            value={searchTerm}
            onChange={handleSearch}
            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-primary-dark focus:border-primary-dark block w-full pl-10 p-2.5 transition-all"
          />
        </div>

        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-1 md:flex-none">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaFilter className="text-gray-400 text-xs" />
            </div>
            <select className="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-primary-dark focus:border-primary-dark block w-full pl-8 p-2.5 cursor-pointer hover:bg-gray-50 transition-colors">
              <option value="">Semua Kategori</option>
              <option value="Taman Kota">Taman Kota</option>
              <option value="Hutan Kota">Hutan Kota</option>
              <option value="Jalur Hijau">Jalur Hijau</option>
            </select>
          </div>
          <div className="relative flex-1 md:flex-none">
            <select className="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-primary-dark focus:border-primary-dark block w-full p-2.5 cursor-pointer hover:bg-gray-50 transition-colors">
              <option value="">Status: Semua</option>
              <option value="Aktif">Aktif</option>
              <option value="Perbaikan">Perbaikan</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/80 text-gray-500 uppercase font-bold text-xs tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 w-16">No</th>
                <th className="px-6 py-4">Nama RTH</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Lokasi</th>
                <th className="px-6 py-4">Luas (Ha)</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4 font-medium text-gray-400">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                          <FaTree />
                        </div>
                        <span className="font-semibold text-gray-800">
                          {item.nama}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-md font-medium border border-gray-200">
                        {item.kategori}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <FaMapMarkerAlt className="text-xs" />
                        <span className="truncate max-w-[150px]">
                          {item.lokasi}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-gray-700 font-medium">
                      {item.luas}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center w-fit gap-1.5
                                                ${
                                                  item.status === "Aktif"
                                                    ? "bg-green-50 text-green-700 ring-1 ring-green-600/20"
                                                    : item.status ===
                                                      "Perbaikan"
                                                    ? "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20"
                                                    : "bg-gray-50 text-gray-600 ring-1 ring-gray-600/20"
                                                }
                                            `}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.status === "Aktif"
                              ? "bg-green-600"
                              : item.status === "Perbaikan"
                              ? "bg-yellow-600"
                              : "bg-gray-600"
                          }`}
                        ></span>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() =>
                            navigate(`/admin/data-rth/edit/${item.id}`)
                          }
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <FaTree className="text-4xl text-gray-200 mb-2" />
                      <p>Tidak ada data yang ditemukan untuk "{searchTerm}"</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination (Dynamic UI) */}
        {filteredData.length > 0 && (
          <div className="p-4 border-t border-gray-50 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Menampilkan{" "}
              <span className="font-semibold text-gray-800">
                {indexOfFirstItem + 1}-
                {Math.min(indexOfLastItem, filteredData.length)}
              </span>{" "}
              dari{" "}
              <span className="font-semibold text-gray-800">
                {filteredData.length}
              </span>{" "}
              data
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-gray-200 rounded-lg text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-1 text-sm rounded-lg shadow-sm transition-colors ${
                    currentPage === i + 1
                      ? "bg-primary-dark text-white border-primary-dark"
                      : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataRTH;
