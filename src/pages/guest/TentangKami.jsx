import React, { useState, useEffect } from "react";
import { FaLeaf, FaUsers, FaHandshake, FaGlobeAsia } from "react-icons/fa";

const TentangKami = () => {
  const [stats, setStats] = useState({
    totalPoints: 0,
    totalLuas: 0,
    totalKategori: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { rthService } = await import("../../services/rthService");
        const data = await rthService.getAll();
        if (data) {
          const totalPoints = data.length;
          const totalLuas = data.reduce(
            (acc, curr) => acc + (Number(curr.luas) || 0),
            0
          );
          // Calculate unique categories from actual data
          const uniqueCats = new Set(
            data.map((d) => d.kategori).filter(Boolean)
          ).size;
          setStats({ totalPoints, totalLuas, totalKategori: uniqueCats });
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-primary-dark py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-accent font-bold text-sm tracking-widest uppercase mb-4 block">
            Tentang EcoRiau
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold text-white font-outfit mb-6">
            Membangun Masa Depan <br />{" "}
            <span className="text-accent">Hijau & Berkelanjutan</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            EcoRiau adalah inisiatif berbasis data untuk memetakan, memantau,
            dan melestarikan Ruang Terbuka Hijau di Pekanbaru demi kualitas
            hidup yang lebih baik.
          </p>
        </div>

        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Green City Vision"
                className="rounded-3xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary-dark font-outfit mb-6">
                Visi & Misi Kami
              </h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="bg-primary-light p-3 rounded-xl h-fit">
                    <FaGlobeAsia className="w-6 h-6 text-primary-dark" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-dark mb-2">
                      Kota Hijau Cerdas
                    </h3>
                    <p className="text-teks-samping text-sm leading-relaxed">
                      Mewujudkan Pekanbaru sebagai kota cerdas yang
                      mengintegrasikan teknologi dalam pengelolaan lingkungan
                      hidup.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary-light p-3 rounded-xl h-fit">
                    <FaUsers className="w-6 h-6 text-primary-dark" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-dark mb-2">
                      Partisipasi Publik
                    </h3>
                    <p className="text-teks-samping text-sm leading-relaxed">
                      Meningkatkan kesadaran dan keterlibatan masyarakat dalam
                      menjaga dan memanfaatkan RTH secara bijak.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary-light p-3 rounded-xl h-fit">
                    <FaHandshake className="w-6 h-6 text-primary-dark" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-dark mb-2">
                      Kolaborasi Berkelanjutan
                    </h3>
                    <p className="text-teks-samping text-sm leading-relaxed">
                      Membangun kemitraan strategis antara pemerintah, swasta,
                      dan komunitas untuk pengembangan RTH.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Impact */}
      <section className="bg-primary-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h4 className="text-4xl font-bold text-primary-dark font-outfit mb-2">
                2025
              </h4>
              <p className="text-sm text-teks-samping">Tahun Berdiri</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-primary-dark font-outfit mb-2">
                {stats.totalKategori > 0 ? stats.totalKategori : "..."}
              </h4>
              <p className="text-sm text-teks-samping">Variasi Kategori</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-primary-dark font-outfit mb-2">
                {stats.totalPoints > 0 ? stats.totalPoints : "..."}
              </h4>
              <p className="text-sm text-teks-samping">Titik RTH Terdata</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-primary-dark font-outfit mb-2">
                {stats.totalLuas > 0
                  ? stats.totalLuas.toLocaleString("id-ID", {
                      maximumFractionDigits: 1,
                    })
                  : "..."}
                <span className="text-lg ml-1">Ha</span>
              </h4>
              <p className="text-sm text-teks-samping">Total Luas Area</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary-dark font-outfit mb-6">
            Bergabunglah dalam Gerakan Ini
          </h2>
          <p className="text-teks-samping mb-8">
            Apakah Anda memiliki pertanyaan, saran, atau ingin berkolaborasi?
            Kami siap mendengar dari Anda.
          </p>
          <button className="bg-primary-dark text-white px-8 py-3 rounded-full font-semibold hover:bg-green-900 transition-colors shadow-lg">
            Hubungi Kami
          </button>
        </div>
      </section>
    </div>
  );
};

export default TentangKami;
