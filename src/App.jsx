import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import GuestLayout from "./layout/GuestLayout";
import AuthLayout from "./layout/AuthLayout";
import AdminLayout from "./layout/AdminLayout";
import Loading from "./components/Loading";
import ErrorPage from "./pages/ErrorPage";

// Lazy load pages
const Beranda = React.lazy(() => import("./pages/guest/Beranda"));
const Peta = React.lazy(() => import("./pages/guest/Peta"));
const TentangKami = React.lazy(() => import("./pages/guest/TentangKami"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Dashboard = React.lazy(() => import("./pages/admin/Dashboard"));

function App() {
  return (
    <div className="bg-latar min-h-screen font-outfit">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<GuestLayout />}>
            <Route path="/" element={<Beranda />} />
            <Route path="/peta" element={<Peta />} />
            <Route path="/tentang" element={<TentangKami />} />
            <Route path="/error/:errorCode" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
          
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
