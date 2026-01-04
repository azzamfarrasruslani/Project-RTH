import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const EditDataRTH = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // State untuk form data
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

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [geojsonFile, setGeojsonFile] = useState(null);
  const [existingGeojson, setExistingGeojson] = useState(null);
  const [geojsonPreview, setGeojsonPreview] = useState(null);
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

        const defaults = [
          "Taman Kota",
          "Hutan Kota",
          "Jalur Hijau",
          "RTH Private",
          "Taman Wisata Alam",
          "Lapangan",
        ];

        const merged = Array.from(
          new Set([...defaults, ...existingCategories])
        );
        const finalCategories = merged.filter((c) => c !== "Lainnya");
        finalCategories.push("Lainnya");

        setCategories(finalCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Data
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await rthService.getById(id);
        if (data) {
          setFormData({
            nama: data.nama || "",
            kategori: data.kategori || "Taman Kota",
            status: data.status || "Aktif",
            deskripsi: data.deskripsi || "",
            fasilitas: data.fasilitas || "",
            alamat: data.alamat || "",
            lat: data.lat || "",
            long: data.long || "",
            luas: data.luas || "",
            tahun: data.tahun || "",
            galeri: data.galeri || [], // Ensure array
          });

          // Check if category is standard
          // Simplified: We now support dynamic categories.
          // If the category exists in our dynamic list, it will be selected automatically.
          // We only default to 'Lainnya' if specifically needed, but generally we treat db value as truth.

          if (data.foto_utama) {
            setExistingImage(data.foto_utama);
          }
          if (data.geojson_file) {
            setExistingGeojson(data.geojson_file);
            // Optimistically try to fetch and parse it for preview if meaningful
            // For now just storing url
            fetch(data.geojson_file)
              .then((res) => res.json())
              .then((data) => setGeojsonPreview(data))
              .catch((err) =>
                console.error("Error loading geojson preview", err)
              );
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
        alert("Gagal memuat data.");
        navigate("/admin/data-rth");
      } finally {
        setFetching(false);
      }
    };
    loadData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
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

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setGalleryFiles((prev) => [...prev, ...files]);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setGalleryPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeNewGalleryImage = (index) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingGalleryImage = (url) => {
    setFormData((prev) => ({
      ...prev,
      galeri: prev.galeri.filter((item) => item !== url),
    }));
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
      await rthService.update(
        id,
        { ...dataToSubmit, geojsonFile },
        imageFile,
        galleryFiles
      );
      navigate("/admin/data-rth");
    } catch (error) {
      console.error("Error updating data:", error);
      alert(
        `Gagal memperbarui data: ${
          error.message || "Terjadi kesalahan sistem."
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="text-center py-20">Memuat data...</div>;
  }

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
          <h2 className="text-2xl font-bold text-gray-800">Edit Data RTH</h2>
          <p className="text-gray-500 text-sm">
            Perbarui informasi RTH:{" "}
            <span className="font-semibold text-primary-dark">#{id}</span>
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
                      setFormData((prev) => ({ ...prev, kategori: val }));
                      if (val !== "Lainnya") setCustomKategori("");
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
                      className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary-dark focus:border-primary-dark outline-none transition-all"
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
                  Sesuaikan Lokasi di Peta
                </label>
                {/* Render only when data is fetched to ensure initial coords are passed */}
                {!fetching && (
                  <div className="rounded-xl overflow-hidden border border-gray-100">
                    <LocationPicker
                      initialLat={formData.lat ? formData.lat : 0.507068}
                      initialLong={formData.long ? formData.long : 101.447779}
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
                )}

                {/* GeoJSON Input */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Perbarui File GeoJSON (Opsional)
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
                          // Revert to existing if available, else null
                          if (existingGeojson) {
                            fetch(existingGeojson)
                              .then((res) => res.json())
                              .then((data) => setGeojsonPreview(data))
                              .catch(() => setGeojsonPreview(null));
                          } else {
                            setGeojsonPreview(null);
                          }
                        }}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        <FaTimes /> Batal
                      </button>
                    )}
                  </div>
                  {existingGeojson && !geojsonFile && (
                    <p className="text-xs text-green-600 mt-2">
                      ✓ File GeoJSON sudah tersimpan sebelumnya. Upload baru
                      untuk mengganti.
                    </p>
                  )}
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
                Foto Lokasi
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
                  Klik atau drag foto ke sini
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Maksimal 5MB (JPG, PNG)
                </p>
              </label>

              <div className="mt-4 space-y-3">
                {/* Preview New Image */}
                {imagePreview && (
                  <div className="flex items-center gap-3 p-2 border border-gray-100 rounded-lg bg-gray-50">
                    <div className="w-10 h-10 bg-gray-200 rounded-md overflow-hidden relative">
                      <img
                        src={imagePreview}
                        alt="New Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-xs font-medium text-green-700 truncate">
                        Foto Baru: {imageFile.name}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {(imageFile.size / 1024 / 1024).toFixed(2)} MB
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
                )}

                {/* Existing Image */}
                {existingImage && !imagePreview && (
                  <div className="flex items-center gap-3 p-2 border border-blue-50 bg-blue-50/50 rounded-lg">
                    <div className="w-10 h-10 bg-gray-200 rounded-md overflow-hidden relative">
                      <img
                        src={existingImage}
                        alt="Existing"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-xs font-medium text-gray-700 truncate">
                        Foto Saat Ini
                      </p>
                      <p className="text-[10px] text-gray-400">
                        Tersimpan di server
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Gallery Management Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Galeri Foto Tambahan
              </h3>

              {/* Existing Gallery */}
              {formData.galeri && formData.galeri.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Foto Tersimpan ({formData.galeri.length})
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {formData.galeri.map((url, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-lg overflow-hidden group"
                      >
                        <img
                          src={url}
                          alt={`Galeri ${idx}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingGalleryImage(url)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Hapus foto ini"
                        >
                          <FaTimes size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Uploads */}
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
                  <span className="text-sm font-medium">Tambah Foto Baru</span>
                </div>
                <p className="text-xs text-gray-400">
                  Klik untuk upload lebih banyak
                </p>
              </label>

              {galleryPreviews.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-green-700 mb-2">
                    Akan Diupload ({galleryPreviews.length})
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {galleryPreviews.map((preview, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-lg overflow-hidden group border-2 border-green-500"
                      >
                        <img
                          src={preview}
                          alt="New Galeri"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeNewGalleryImage(idx)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FaTimes size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
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
                    <FaSave /> Perbarui Data
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

export default EditDataRTH;
