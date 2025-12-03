import { Link } from 'react-router-dom';
import { FaTree, FaMapMarkedAlt, FaChartBar, FaLeaf, FaSearch, FaDatabase, FaLayerGroup } from 'react-icons/fa';

const Beranda = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-white pt-8 pb-20 lg:pt-16 lg:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="relative z-10">
              <div className="inline-block bg-primary-light px-4 py-1.5 rounded-full mb-6">
                <span className="text-primary-dark font-semibold text-sm tracking-wide">Kota Cerdas Hijau</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-text-dark leading-tight mb-6 font-outfit">
                Kawasan <span className="text-primary-dark">Hijau</span> <br/>
                <span className="text-primary-dark">Kota</span> Pekanbaru
              </h1>
              
              <p className="text-lg text-teks-samping mb-8 max-w-lg leading-relaxed">
                Akses mudah ke data ruang hijau untuk masyarakat dan pemerintah demi kota yang lebih hijau, nyaman, dan berkelanjutan.
              </p>
              
              <div className="flex items-center gap-6 mb-12">
                <Link
                  to="/peta"
                  className="group flex items-center gap-3 bg-primary-dark text-white px-8 py-4 rounded-full font-semibold hover:bg-green-900 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span>Lihat Peta</span>
                  <div className="bg-white/20 rounded-full p-1 group-hover:translate-x-1 transition-transform">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </div>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 border-t border-gray-100 pt-8">
                <div>
                  <h4 className="text-3xl font-bold text-primary-dark font-outfit">23+</h4>
                  <p className="text-sm text-teks-samping mt-1">Ruang Terbuka Hijau</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-primary-dark font-outfit">23Ha</h4>
                  <p className="text-sm text-teks-samping mt-1">Total Area</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-primary-dark font-outfit">70%</h4>
                  <p className="text-sm text-teks-samping mt-1">Cakupan RTH</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Aerial view of green forest" 
                  className="w-full h-[600px] object-cover"
                />
                
                {/* Floating Card */}
                <div className="absolute bottom-8 right-8 bg-primary-dark/90 backdrop-blur-sm p-6 rounded-2xl max-w-xs text-white shadow-xl border border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                       <FaTree className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h5 className="font-bold text-lg mb-1">Temukan dan Kunjungi</h5>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        Jelajahi berbagai taman kota dan hutan kota di Pekanbaru.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -z-10 top-10 -right-10 w-full h-full bg-primary-light rounded-[2.5rem]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-primary-dark py-24 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Text */}
            <div className="lg:col-span-4">
              <span className="text-accent font-bold text-sm tracking-widest uppercase mb-4 block">// Keunggulan Kami</span>
              <h2 className="text-4xl lg:text-5xl font-bold font-outfit leading-tight mb-6">
                Manfaat Utama Pemanfaatan Data RTH Berbasis SIG
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Akses informasi spasial yang akurat dan mutakhir untuk pengelolaan RTH yang lebih efektif dan berkelanjutan.
              </p>
            </div>

            {/* Center Image */}
            <div className="lg:col-span-4 flex justify-center">
               <div className="relative rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl w-full max-w-sm aspect-[4/5]">
                  <img 
                    src="https://images.unsplash.com/photo-1496564203457-11bb12075d90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="City Park" 
                    className="w-full h-full object-cover"
                  />
               </div>
            </div>

            {/* Right List */}
            <div className="lg:col-span-4 space-y-8">
              <div className="flex gap-4">
                <div className="bg-primary-light p-3 rounded-full h-fit">
                   <FaMapMarkedAlt className="w-6 h-6 text-primary-dark" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Perencanaan Tata Ruang Optimal</h3>
                  <p className="text-gray-400 text-sm">Mendukung keputusan berbasis data untuk pengembangan kota yang teratur.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-primary-light p-3 rounded-full h-fit">
                   <FaSearch className="w-6 h-6 text-primary-dark" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Transparansi Data Publik</h3>
                  <p className="text-gray-400 text-sm">Menyajikan informasi RTH yang mudah diakses oleh masyarakat.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary-light p-3 rounded-full h-fit">
                   <FaChartBar className="w-6 h-6 text-primary-dark" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Dukungan Kebijakan Berbasis Data</h3>
                  <p className="text-gray-400 text-sm">Menyediakan informasi yang relevan bagi pemerintah daerah.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary-light p-3 rounded-full h-fit">
                   <FaLeaf className="w-6 h-6 text-primary-dark" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Peningkatan Kualitas Lingkungan</h3>
                  <p className="text-gray-400 text-sm">Mendorong upaya pelestarian dan pemantauan kualitas lingkungan.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-primary-dark font-bold text-sm tracking-widest uppercase mb-4 block">// Fitur Utama</span>
          <h2 className="text-4xl font-bold text-text-dark font-outfit mb-16">
            Jelajahi Kategori Data RTH Kami
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 text-left group">
               <div className="w-14 h-14 bg-primary-light rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-dark transition-colors">
                  <FaTree className="w-7 h-7 text-primary-dark group-hover:text-white transition-colors" />
               </div>
               <h3 className="text-xl font-bold text-text-dark mb-3">Data Taman Kota</h3>
               <p className="text-teks-samping text-sm leading-relaxed">
                 Informasi lengkap seputar taman kota, lokasi, fasilitas, dan kondisi lingkungan terkini.
               </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 text-left group">
               <div className="w-14 h-14 bg-primary-light rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-dark transition-colors">
                  <FaTree className="w-7 h-7 text-primary-dark group-hover:text-white transition-colors" />
               </div>
               <h3 className="text-xl font-bold text-text-dark mb-3">Data Hutan Kota</h3>
               <p className="text-teks-samping text-sm leading-relaxed">
                 Menyajikan informasi biodiversitas dan kawasan konservasi hutan hijau di paru-paru kota.
               </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 text-left group">
               <div className="w-14 h-14 bg-primary-light rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-dark transition-colors">
                  <FaMapMarkedAlt className="w-7 h-7 text-primary-dark group-hover:text-white transition-colors" />
               </div>
               <h3 className="text-xl font-bold text-text-dark mb-3">Peta Interaktif (SIG)</h3>
               <p className="text-teks-samping text-sm leading-relaxed">
                 Jelajahi persebaran RTH secara visual. Dilengkapi dengan visualisasi data spasial yang akurat.
               </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 text-left group">
               <div className="w-14 h-14 bg-primary-light rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-dark transition-colors">
                  <FaChartBar className="w-7 h-7 text-primary-dark group-hover:text-white transition-colors" />
               </div>
               <h3 className="text-xl font-bold text-text-dark mb-3">Analisis & Statistik</h3>
               <p className="text-teks-samping text-sm leading-relaxed">
                 Akses data agregat, statistik cakupan RTH, dan tren perkembangan dari tahun ke tahun.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="bg-primary-dark py-24 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div>
              <span className="text-accent font-bold text-sm tracking-widest uppercase mb-4 block">// Alur Penggunaan</span>
              <h2 className="text-4xl lg:text-5xl font-bold font-outfit leading-tight mb-12">
                Memanfaatkan Platform Data RTH dalam 3 Langkah
              </h2>

              <div className="space-y-12 relative">
                {/* Vertical Line */}
                <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-white/20"></div>

                {/* Step 1 */}
                <div className="relative flex gap-8">
                  <div className="relative z-10">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-primary-dark font-bold text-sm">01</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-accent mb-2">Jelajahi Peta Interaktif</h3>
                    <p className="text-gray-300 text-sm max-w-sm">Temukan Taman dan Hutan Kota di Pekanbaru melalui peta digital kami.</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex gap-8">
                  <div className="relative z-10">
                    <div className="w-8 h-8 bg-primary-dark border-2 border-accent rounded-full flex items-center justify-center text-accent font-bold text-sm">02</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Analisis Data Spasial</h3>
                    <p className="text-gray-300 text-sm max-w-sm">Klik RTH untuk info detail luas, kategori, dan status wilayah.</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex gap-8">
                  <div className="relative z-10">
                    <div className="w-8 h-8 bg-primary-dark border-2 border-accent rounded-full flex items-center justify-center text-accent font-bold text-sm">03</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Manfaatkan Wawasan</h3>
                    <p className="text-gray-300 text-sm max-w-sm">Gunakan data ini untuk keputusan, penelitian, atau edukasi RTH.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Images Collage */}
            <div className="relative h-[600px]">
               <div className="absolute top-0 right-0 w-2/3 h-1/2 rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Park Map" 
                    className="w-full h-full object-cover"
                  />
               </div>
               <div className="absolute bottom-0 left-0 w-2/3 h-1/2 rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Data Analysis" 
                    className="w-full h-full object-cover"
                  />
               </div>
               <div className="absolute top-1/4 left-0 w-1/2 h-1/3 rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl -z-0">
                  <img 
                    src="https://images.unsplash.com/photo-1448375240586-dfd8f3793371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Green City" 
                    className="w-full h-full object-cover"
                  />
               </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Beranda;
