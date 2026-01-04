import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaTree,
  FaRulerCombined,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

import ReviewForm from "../../components/ReviewForm";
import ReviewList from "../../components/ReviewList";

const DetailRTH = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [refreshReviews, setRefreshReviews] = React.useState(0);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const { rthService } = await import("../../services/rthService");
        const result = await rthService.getById(id);
        if (result) {
          setData({
            ...result,
            // Ensure defaults for array/missing fields
            galeri: result.galeri || [],
            fasilitas: result.fasilitas ? result.fasilitas.split(",") : [],
          });
        }
      } catch (error) {
        console.error("Error loading detail:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const [selectedImage, setSelectedImage] = React.useState(null);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Memuat...
      </div>
    );
  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Data tidak ditemukan
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 font-outfit pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={data.foto_utama}
          alt={data.nama}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>

        {/* Navigation */}
        <div className="absolute top-6 left-6 z-10 w-full max-w-7xl mx-auto px-4">
          <button
            onClick={() => navigate("/peta")}
            className="group flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-5 py-2.5 rounded-full transition-all border border-white/20 shadow-lg hover:shadow-xl hover:-translate-x-1"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium tracking-wide">Kembali ke Peta</span>
          </button>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 w-full z-20 pb-12 sm:pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="animate-slideUp">
              <span className="bg-emerald-500/90 backdrop-blur-sm text-white text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-widest mb-4 inline-block shadow-lg border border-white/20">
                {data.kategori}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg leading-tight">
                {data.nama}
              </h1>
              <div className="flex items-center gap-3 text-gray-200 text-lg md:text-xl font-light">
                <FaMapMarkerAlt className="text-emerald-400" />
                <span>{data.alamat}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container - Floating Up */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-30">
        {/* Stats Grid - Enhanced */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-10 grid grid-cols-2 md:grid-cols-3 gap-8 divide-x divide-gray-100">
          <div className="text-center group">
            <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors text-blue-600">
              <FaRulerCombined className="text-2xl" />
            </div>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">
              Luas Area
            </p>
            <p className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors">
              {data.luas}
            </p>
          </div>

          <div className="text-center group">
            <div className="bg-green-50 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-100 transition-colors text-green-600">
              <FaCheckCircle className="text-2xl" />
            </div>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">
              Status
            </p>
            <p className="font-bold text-gray-800 text-lg group-hover:text-green-600 transition-colors">
              {data.status}
            </p>
          </div>

          <div className="text-center group !border-r-0">
            <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-100 transition-colors text-emerald-600">
              <FaTree className="text-2xl" />
            </div>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">
              Tipe
            </p>
            <p className="font-bold text-gray-800 text-lg group-hover:text-emerald-600 transition-colors">
              {data.kategori === "RTH Private" ? "Private" : "Publik"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Details, Gallery, Reviews */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-emerald-500 rounded-full"></span>
                Tentang Lokasi Ini
              </h3>
              <p className="text-gray-600 leading-loose text-lg font-light text-justify">
                {data.deskripsi}
              </p>
            </div>

            {/* Gallery */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3 px-2">
                <span className="w-1.5 h-8 bg-blue-500 rounded-full"></span>
                Galeri Foto
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {data.galeri.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className="aspect-square rounded-2xl overflow-hidden shadow-sm group cursor-pointer relative"
                  >
                    <img
                      src={img}
                      alt={`Gallery ${idx}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-sm font-medium">
                        Lihat Foto
                      </span>
                    </div>
                  </div>
                ))}
                {data.galeri.length === 0 && (
                  <div className="col-span-full py-12 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                    <p className="text-gray-400">Belum ada foto tambahan.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Reviews Section */}
            <div
              id="reviews"
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-yellow-500 rounded-full"></span>
                Ulasan & Rating
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  {/* Column Left Header */}
                  <h4 className="font-bold text-gray-900 mb-4">
                    Tulis Ulasan Anda
                  </h4>
                  {/* Form is inside ReviewForm, which has its own card style. 
                      So we just render it directly, no extra container needed. 
                   */}
                  <ReviewForm
                    rthId={id}
                    onReviewAdded={() => setRefreshReviews((p) => p + 1)}
                  />
                </div>
                <div className="md:border-l border-gray-100 pl-0 md:pl-12">
                  {/* Column Right Header */}
                  <h4 className="font-bold text-gray-900 mb-4">
                    Apa Kata Mereka?
                  </h4>
                  <ReviewList rthId={id} refreshTrigger={refreshReviews} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Facilities - Sticky */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-28">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                Fasilitas Tersedia
              </h3>

              {data.fasilitas && data.fasilitas.length > 0 ? (
                <ul className="space-y-4">
                  {data.fasilitas.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 group">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center text-emerald-600 mt-0.5 group-hover:scale-110 transition-transform">
                        <FaCheckCircle className="text-xs" />
                      </div>
                      <span className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 italic">
                  Data fasilitas belum tersedia.
                </p>
              )}

              <div className="mt-8 pt-6 border-t border-gray-100">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    data.nama + " Pekanbaru"
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group block w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5"
                >
                  <span className="flex items-center justify-center gap-2">
                    <FaMapMarkerAlt />
                    Buka di Google Maps
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white/50 hover:text-white text-5xl transition-colors z-50 transform hover:rotate-90 duration-300"
          >
            &times;
          </button>
          <img
            src={selectedImage}
            alt="Full Preview"
            className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default DetailRTH;
