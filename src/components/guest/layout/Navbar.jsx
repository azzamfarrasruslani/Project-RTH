import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/image/Mobilin_Logo_1.png"
            alt="Mobilin Logo"
            className="h-10 w-auto"
          />
        </Link>

        {/* Menu Desktop */}
        <ul className="hidden md:flex items-center gap-6 font-medium text-gray-800">
          <li><Link to="/" className="hover:text-yellow-600">Home</Link></li>
          <li><Link to="/login" className="hover:text-yellow-600">Login</Link></li>
        </ul>

        {/* Hamburger Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-800"
        >
          {open ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow">
          <ul className="flex flex-col p-4 gap-4 font-medium text-gray-800">
            <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
            <li><Link to="/login" onClick={() => setOpen(false)}>Login</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
