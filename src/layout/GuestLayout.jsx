import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function GuestLayout() {
  return (
    <div id="guest-layout" className="flex flex-col min-h-screen bg-latar">
      <Navbar />

      <main className="flex-grow w-full  mx-auto ">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
