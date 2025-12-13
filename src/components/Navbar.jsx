import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
               {/* Placeholder for Logo Icon if needed, using text for now */}
               <div className="w-8 h-8 bg-primary-dark rounded-tr-xl rounded-bl-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xs">E</span>
               </div>
               <span className="text-2xl font-bold text-primary-dark font-outfit">EcoRiau</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link
                to="/"
                className="text-teks hover:text-primary-dark text-sm font-medium transition-colors duration-200"
              >
                Beranda
              </Link>
              <Link
                to="/tentang"
                className="text-teks hover:text-primary-dark text-sm font-medium transition-colors duration-200"
              >
                Tentang Kami
              </Link>
              <Link
                to="/peta"
                className="text-teks hover:text-primary-dark text-sm font-medium transition-colors duration-200"
              >
                Peta
              </Link>
              <Link
                to="/login"
                className="px-6 py-2 border border-teks rounded-full text-sm font-medium text-teks hover:bg-primary-dark hover:text-white hover:border-primary-dark transition-all duration-300"
              >
                Login
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-teks hover:text-primary-dark focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <FaTimes className="block h-6 w-6" /> : <FaBars className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100" id="mobile-menu">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link
              to="/"
              className="text-teks hover:text-primary-dark block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Beranda
            </Link>
            <Link
              to="/tentang"
              className="text-teks hover:text-primary-dark block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Tentang Kami
            </Link>
            <Link
              to="/peta"
              className="text-teks hover:text-primary-dark block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Peta
            </Link>
             <Link
              to="/login"
              className="text-teks hover:text-primary-dark block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
