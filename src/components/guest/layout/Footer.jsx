import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bottom-0 mt-auto w-full rounded-t-4xl bg-gray-800 px-10 py-10 text-white">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-start justify-between gap-10">
        
        {/* Logo & Deskripsi */}
        <div className="flex w-full flex-col items-center text-center md:w-1/4 md:items-start md:text-left">
          <img
            src="/image/Mobilin_Logo_1.png"
            alt="Mobilin Logo"
            className="mb-4 h-auto w-48"
          />
          <p className="text-sm text-gray-300">
            Solusi jual beli mobil terbaik untuk keluarga Indonesia. Aman,
            cepat, dan terpercaya.
          </p>
        </div>

        {/* Navigasi Utama */}
        <nav className="w-full text-base md:w-1/5">
          <h2 className="mb-4 text-xl font-semibold">Navigasi</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/buy-cars" className="hover:underline">Beli Mobil</Link></li>
            <li><Link to="/sell-cars" className="hover:underline">Jual Mobil</Link></li>
            <li><Link to="/promo" className="hover:underline">Promo</Link></li>
            <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
          </ul>
        </nav>

        {/* Perusahaan */}
        <nav className="w-full text-base md:w-1/5">
          <h2 className="mb-4 text-xl font-semibold">Perusahaan</h2>
          <ul className="space-y-2">
            <li><Link to="/tentang-kami" className="hover:underline">{t("navbar.tentang-kami")}</Link></li>
            <li><Link to="/artikel" className="hover:underline">{t("navbar.artikel")}</Link></li>
            <li><Link to="/kontak-kami" className="hover:underline">{t("navbar.kontak-kami")}</Link></li>
            <li><Link to="/lokasi-kami" className="hover:underline">{t("navbar.lokasi-kami")}</Link></li>
            <li><Link to="/karir" className="hover:underline">{t("navbar.karir")}</Link></li>
            <li><Link to="/simulasi-kredit" className="hover:underline">{t("navbar.simulasi-kredit")}</Link></li>
            <li><Link to="/katalog-media" className="hover:underline">{t("navbar.katalog-media")}</Link></li>
          </ul>
        </nav>

        {/* Kontak */}
        <div className="w-full text-base md:w-1/4">
          <h2 className="mb-4 text-xl font-semibold">Kontak Kami</h2>
          <p>
            Email:{" "}
            <a href="mailto:info@mobilin.com" className="hover:underline">
              info@mobilin.com
            </a>
          </p>
          <p>
            Telepon:{" "}
            <a href="tel:+6281234567890" className="hover:underline">
              +62 812-3456-7890
            </a>
          </p>
          <p>Alamat: Jl. Raya Otomotif No.123, Jakarta</p>
        </div>
      </div>

      {/* Sosial Media */}
      <div className="mt-10 flex flex-wrap justify-center gap-4 text-center md:gap-6">
        <FaFacebookF
          className="h-10 w-10 rounded-full bg-white p-2.5 text-xl text-gray-800 shadow-lg 
                     transition duration-300 ease-in-out hover:bg-yellow-500 hover:text-white hover:shadow-xl"
        />
        <FaInstagram
          className="h-10 w-10 rounded-full bg-white p-2.5 text-xl text-gray-800 shadow-lg 
                     transition duration-300 ease-in-out hover:bg-yellow-500 hover:text-white hover:shadow-xl"
        />
        <FaYoutube
          className="h-10 w-10 rounded-full bg-white p-2.5 text-xl text-gray-800 shadow-lg 
                     transition duration-300 ease-in-out hover:bg-yellow-500 hover:text-white hover:shadow-xl"
        />
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t-2 border-gray-500/80 px-4 pt-6 text-center text-xs text-gray-400 md:text-sm">
        © 2025 Showroom Mobilin. All Rights Reserved.
        <span className="px-3">
          |
          <Link to="/kebijakan-privasi" className="px-1 hover:underline">Kebijakan Privasi</Link>
          |
          <Link to="/ketentuan-penggunaan" className="px-1 hover:underline">Ketentuan Penggunaan</Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
