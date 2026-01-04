import React from "react";
import { FaTree } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-tr-xl rounded-bl-xl flex items-center justify-center">
                <FaTree className="text-primary-dark text-lg" />
              </div>
              <span className="text-2xl font-bold font-outfit">EcoRiau</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Wujudkan kota hijau yang cerdas dan berkelanjutan. Akses data RTH
              dengan mudah dan transparan.
            </p>
            <div className="flex space-x-4 pt-2">
              {/* Social Icons Placeholders */}
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                <span className="text-xs">IG</span>
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                <span className="text-xs">FB</span>
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                <span className="text-xs">TW</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 font-outfit">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Peta RTH
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 font-outfit">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <span>📧</span>
                <span>info@ecoriau.com</span>
              </li>
              <li className="flex items-start gap-3">
                <span>📞</span>
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-start gap-3">
                <span>📍</span>
                <span>Jl. Jend. Sudirman No. 123, Pekanbaru, Riau</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Subscribe */}
          <div>
            <h3 className="text-lg font-semibold mb-6 font-outfit">
              Subscribe for Updates
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Dapatkan informasi terbaru seputar RTH dan lingkungan.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Anda"
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-white/50 text-white placeholder-gray-400"
              />
              <button className="bg-primary-light text-primary-dark px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white transition-colors">
                Kirim
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} EcoRiau. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
