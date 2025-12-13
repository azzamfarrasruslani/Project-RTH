import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Cek session saat ini
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen perubahan auth state (misal logout di tab lain)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-latar">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark"></div>
      </div>
    );
  }

  if (!session) {
    // Redirect ke login, simpan lokasi asal untuk redirect balik nanti
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
