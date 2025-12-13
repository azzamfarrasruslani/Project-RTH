import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { supabase } from '../../lib/supabaseClient';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
      email: '',
      password: ''
  });

  const handleChange = (e) => {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value
      });
  };

  const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      setErrorMsg('');

      try {
          const { data, error } = await supabase.auth.signInWithPassword({
              email: formData.email,
              password: formData.password,
          });

          if (error) {
            throw error;
          }

          if (data.session) {
              navigate('/admin/dashboard', { replace: true });
          }
      } catch (error) {
          console.error("Login Error:", error.message);
          setErrorMsg(error.message === 'Invalid login credentials' 
            ? 'Email atau kata sandi salah.' 
            : 'Terjadi kesalahan saat masuk. Silakan coba lagi.');
      } finally {
          setLoading(false);
      }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 bg-primary-dark rounded-tr-xl rounded-bl-xl flex items-center justify-center mb-4">
           <span className="text-white font-bold text-xl">RTH</span>
        </div>
        <h2 className="mt-6 text-3xl font-bold text-gray-900 font-outfit">
          Selamat Datang Kembali
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Masuk untuk mengakses dashboard RTH Anda
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleLogin}>
        {errorMsg && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 text-center">
                {errorMsg}
            </div>
        )}
        
        <div className="rounded-md shadow-sm -space-y-px">
          <div className="relative mb-4">
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm"
              placeholder="Alamat Email"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm"
              placeholder="Kata Sandi"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary-dark focus:ring-primary-dark border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Ingat saya
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-primary-dark hover:text-green-800">
              Lupa kata sandi?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-dark hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
