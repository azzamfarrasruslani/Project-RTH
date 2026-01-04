import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaSave,
  FaCloudUploadAlt,
  FaMapMarkerAlt,
  FaTree,
  FaTimes,
} from "react-icons/fa";
import { rthService } from "../../services/rthService";
import LocationPicker from "../../components/admin/LocationPicker";

const AddDataRTH = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nama: "",
    kategori: "Taman Kota",
    status: "Aktif",
    deskripsi: "",
    alamat: "",
    lat: "",
    long: "",
    luas: "",
    tahun: "",
    fasilitas: "",
  });

  const [customKategori, setCustomKategori] = useState("");
  const [categories, setCategories] = useState([
    "Taman Kota",
    "Hutan Kota",
    "Jalur Hijau",
    "RTH Private",
    "Taman Wisata Alam",
    "Lapangan",
    "Lainnya",
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const existingCategories = await rthService.getUniqueCategories();

        // Default standard categories
        const defaults = [
          "Taman Kota",
          "Hutan Kota",
          "Jalur Hijau",
          "RTH Private",
          "Taman Wisata Alam",
          "Lapangan",
        ];

        // Merge defaults with existing from DB (remove duplicates)
        const merged = Array.from(
          new Set([...defaults, ...existingCategories])
        );

        // Ensure "Lainnya" is always at the end
        const finalCategories = merged.filter((c) => c !== "Lainnya");
        finalCategories.push("Lainnya");

        setCategories(finalCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [geojsonFile, setGeojsonFile] = useState(null);
  const [geojsonPreview, setGeojsonPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setGalleryFiles((prev) => [...prev, ...files]);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setGalleryPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeGalleryImage = (index) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGeojsonChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGeojsonFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          setGeojsonPreview(json);
        } catch (error) {
          console.error("Invalid GeoJSON", error);
          alert("File GeoJSON tidak valid");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const dataToSubmit = { ...formData };

    // Sanitize numeric fields
    if (dataToSubmit.lat === "") dataToSubmit.lat = null;
    if (dataToSubmit.long === "") dataToSubmit.long = null;
    if (dataToSubmit.luas === "") dataToSubmit.luas = null;
    if (dataToSubmit.tahun === "") dataToSubmit.tahun = null;

    if (dataToSubmit.kategori === "Lainnya") {
      dataToSubmit.kategori = customKategori;
    }

    try {
      await rthService.create(
        { ...dataToSubmit, geojsonFile },
        imageFile,
        galleryFiles
      );
      navigate("/admin/data-rth");
    } catch (error) {
      console.error("Error creating data:", error);
      alert(
        `Gagal menyimpan data: ${
          error.message || "Pastikan semua field terisi."
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 font-outfit max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/data-rth")}
          className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors shadow-sm"
        >
          <FaArrowLeft />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Tambah Data RTH</h2>
          <p className="text-gray-500 text-sm">
            Isi formulir di bawah untuk menambahkan lokasi RTH baru.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaTree className="text-primary-dark" /> Informasi Dasar
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama RTH <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    placeholder="Contoh: Taman Kota Pekanbaru"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary-dark focus:border-primary-dark outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="kategori"
                    value={formData.kategori}
                    onChange={(e) => {
                      const val = e.target.value;
                      handleChange(e);
                      if (val !== "Lainnya") {
                        setCustomKategori("");
                      }
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary-dark focus:border-primary-dark outline-none transition-all"
                  >
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {formData.kategori === "Lainnya" && (
                    <input
                      type="text"
                      value={customKategori}
                      onChange={(e) => setCustomKategori(e.target.value)}
                      placeholder="Masukkan Kategori Lainnya"
                      className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary-dark focus:border-primary-dark outline-none transition-all animate-fadeIn"
                      required
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status Operasional
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary-dark focus:border-primary-dark outline-none transition-all"
                  >
                    <option>Aktif</option>
                    <option>Dalam Perbaikan</option>
                    <option>Tutup Sementara</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deskripsi Singkat
                  </label>
                  <textarea
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Jelaskan fasilitas dan kondisi RTH..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary-dark focus:border-primary-dark outline-none transition-all"
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fasilitas Tersedia
                  </label>
                  <textarea
                    name="fasilitas"
                    value={formData.fasilitas}
                    onChange={handleChange}
                    rows="2"
                    placeholder="Contoh: Toilet, Musholla, Area Parkir, Jogging Track..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary-dark focus:border-primary-dark outline-none transition-all"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary-dark" /> Lokasi & Detail
              </h3>

              {/* Map Picker */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilih Lokasi di Peta
                </label>
                <div className="rounded-xl overflow-hidden border border-gray-100">
                  <LocationPicker
                    initialLat={0.507068}
                    initialLong={101.447779}
                    geojson={geojsonPreview}
                    onConfirm={(lat, lng) => {
                      setFormData((prev) => ({
                        ...prev,
                        lat: lat,
                        long: lng,
                      }));
                    }}
                  />
                </div>

                {/* GeoJSON Input */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload File GeoJSON (Opsional)
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                      <span>Pilih File .geojson</span>
                      <input
                        type="file"
                        accept=".geojson,.json"
                        onChange={handleGeojsonChange}
                        className="hidden"
                      />
                    </label>
                    {geojsonFile && (
                      <span className="text-sm text-gray-600">
                        {geojsonFile.name} (
                        {(geojsonFile.size / 1024).toFixed(1)} KB)
                      </span>
                    )}
                    {geojsonFile && (
                      <button
                        type="button"
                        onClick={() => {
                          setGeojsonFile(null);
                          setGeojsonPreview(null);
                        }}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        <FaTimes /> Hapus
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Format .geojson atau .json untuk menampilkan batas wilayah
                    RTH di peta.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alamat Lengkap
                  </label>
                  <input
                    type="text"
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    placeholder="Jl. Jendral Sudirman No..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary-dark focus:border-primary-dark outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Latitude{" "}
                    <span className="text-xs text-gray-400 font-normal">
                      (Otomatis/Manual)
                    </span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="lat"
                    value={formData.lat}
                    onChange={handleChange}
                    placeholder="0.507..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary-dark focus:border-primary-dark outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Longitude{" "}
                    <span className="text-xs text-gray-400 font-normal">
                      (Otomatis/Manual)
                    </span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="long"
                    value={formData.long}
                    onChange={handleChange}
                    placeholder="101.447..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary-dark focus:border-primary-dark outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Luas Area (Ha)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="luas"
                    value={formData.luas}
                    onChange={handleChange}
                    placeholder="0.0"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary-dark focus:border-primary-dark outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tahun Peresmian
                  </label>
                  <input
                    type="number"
                    name="tahun"
                    value={formData.tahun}
                    onChange={handleChange}
                    placeholder="2024"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary-dark focus:border-primary-dark outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Media & Actions */}
          <div className="space-y-6">
            {/* Upload Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Foto Utama
              </h3>

              <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <div className="w-12 h-12 bg-primary-light/20 text-primary-dark rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <FaCloudUploadAlt className="text-xl" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  Klik untuk upload foto utama
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Maksimal 5MB (JPG, PNG)
                </p>
              </label>

              {imagePreview && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3 p-2 border border-gray-100 rounded-lg bg-gray-50">
                    <div className="w-10 h-10 bg-gray-200 rounded-md overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-xs font-medium text-gray-700 truncate">
                        {imageFile?.name}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {(imageFile?.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Gallery Upload Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Galeri Foto Tambahan
              </h3>
              <label className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer group mb-4">
                <input
                  type="file"
                  multiple
                  onChange={handleGalleryChange}
                  accept="image/*"
                  className="hidden"
                />
                <div className="flex items-center gap-2 text-primary-dark mb-1">
                  <FaCloudUploadAlt />
                  <span className="text-sm font-medium">Tambah Foto</span>
                </div>
                <p className="text-xs text-gray-400">
                  Bisa pilih banyak sekaligus
                </p>
              </label>

              {galleryPreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {galleryPreviews.map((preview, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square rounded-lg overflow-hidden group"
                    >
                      <img
                        src={preview}
                        alt="Galeri"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTimes size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={loading}
                className={`
                                    flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-white shadow-lg shadow-primary-dark/20 transition-all
                                    ${
                                      loading
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-primary-dark hover:bg-green-800 hover:shadow-primary-dark/40 active:scale-95"
                                    }
                                `}
              >
                {loading ? (
                  "Menyimpan..."
                ) : (
                  <>
                    <FaSave /> Simpan Data
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/data-rth")}
                className="w-full py-3.5 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddDataRTH;
