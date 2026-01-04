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

const DetailRTH = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

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
    <div className="min-h-screen bg-white font-outfit pb-12">
      {/* Header / Hero Image */}
      <div className="relative h-64 md:h-96 w-full overflow-hidden">
        <img
          src={data.foto_utama}
          alt={data.nama}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute top-6 left-6 z-10">
          <button
            onClick={() => navigate("/peta")}
            className="flex items-center gap-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all border border-white/30"
          >
            <FaArrowLeft /> Kembali ke Peta
          </button>
        </div>
        <div className="absolute bottom-8 left-6 md:left-12 text-white">
          <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider mb-2 inline-block">
            {data.kategori}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{data.nama}</h1>
          <div className="flex items-center gap-2 text-white/90 text-sm md:text-base">
            <FaMapMarkerAlt /> {data.alamat}
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Main Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Overview Card */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 border-b border-gray-100 pb-8">
              <div className="text-center">
                <FaRulerCombined className="text-2xl text-primary-dark mx-auto mb-2" />
                <p className="text-xs text-gray-400 uppercase">Luas Area</p>
                <p className="font-bold text-gray-800">{data.luas}</p>
              </div>
              <div className="text-center">
                <FaClock className="text-2xl text-blue-500 mx-auto mb-2" />
                <p className="text-xs text-gray-400 uppercase">Jam Buka</p>
                <p className="font-bold text-gray-800">{data.jam_buka}</p>
              </div>
              <div className="text-center">
                <FaCheckCircle className="text-2xl text-green-500 mx-auto mb-2" />
                <p className="text-xs text-gray-400 uppercase">Status</p>
                <p className="font-bold text-gray-800">{data.status}</p>
              </div>
              <div className="text-center">
                <FaTree className="text-2xl text-emerald-600 mx-auto mb-2" />
                <p className="text-xs text-gray-400 uppercase">Tipe</p>
                <p className="font-bold text-gray-800">Publik</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Tentang Lokasi Ini
              </h3>
              <p className="text-gray-600 leading-relaxed">{data.deskripsi}</p>
            </div>
          </div>

          {/* Gallery */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 px-2">
              Galeri Foto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.galeri.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className="rounded-xl overflow-hidden shadow-sm h-48 group cursor-pointer relative"
                >
                  <img
                    src={img}
                    alt={`Gallery ${idx}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Facilities & More */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 top-24">
            <h3 className="text-lg font-bold text-primary-dark mb-4 border-b border-gray-100 pb-2">
              Fasilitas Tersedia
            </h3>
            <ul className="space-y-3">
              {data.fasilitas.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-green-600 text-xs">
                    <FaCheckCircle />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  data.nama + " Pekanbaru"
                )}`}
                target="_blank"
                rel="noreferrer"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-blue-200"
              >
                Buka di Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white text-4xl transition-colors z-50"
          >
            &times;
          </button>
          <img
            src={selectedImage}
            alt="Full Preview"
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default DetailRTH;
