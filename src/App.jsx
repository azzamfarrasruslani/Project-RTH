import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import GuestLayout from "./layout/GuestLayout";
import AuthLayout from "./layout/AuthLayout";
import AdminLayout from "./layout/AdminLayout";
import Loading from "./components/Loading";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load pages
const Beranda = React.lazy(() => import("./pages/guest/Beranda"));
const Peta = React.lazy(() => import("./pages/guest/Peta"));
const DetailRTH = React.lazy(() => import("./pages/guest/DetailRTH"));
const TentangKami = React.lazy(() => import("./pages/guest/TentangKami"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Dashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const DataRTH = React.lazy(() => import("./pages/admin/DataRTH"));
const AddDataRTH = React.lazy(() => import("./pages/admin/AddDataRTH"));
const EditDataRTH = React.lazy(() => import("./pages/admin/EditDataRTH"));

function App() {
  return (
    <div className="bg-latar min-h-screen font-outfit">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<GuestLayout />}>
            <Route path="/" element={<Beranda />} />
            <Route path="/peta" element={<Peta />} />
            <Route path="/peta/:id" element={<DetailRTH />} />
            <Route path="/tentang" element={<TentangKami />} />
            <Route path="/error/:errorCode" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="data-rth" element={<DataRTH />} />
            <Route path="data-rth/add" element={<AddDataRTH />} />
            <Route path="data-rth/edit/:id" element={<EditDataRTH />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
