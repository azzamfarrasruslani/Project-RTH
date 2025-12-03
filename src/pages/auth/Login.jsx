import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';

const Login = () => {
  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 bg-primary-dark rounded-tr-xl rounded-bl-xl flex items-center justify-center mb-4">
           <span className="text-white font-bold text-xl">E</span>
        </div>
        <h2 className="mt-6 text-3xl font-bold text-gray-900 font-outfit">
          Selamat Datang Kembali
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Masuk untuk mengakses dashboard RTH Anda
        </p>
      </div>

      <form className="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
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
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-dark hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition-colors duration-200"
          >
            Masuk
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Atau masuk dengan</span>
          </div>
        </div>

        <div>
          <button
            type="button"
            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition-colors duration-200"
          >
            <FaGoogle className="h-5 w-5 text-red-500" />
            <span>Google</span>
          </button>
        </div>
      </form>
      
      <p className="mt-2 text-center text-sm text-gray-600">
        Belum punya akun?{' '}
        <Link to="/register" className="font-medium text-primary-dark hover:text-green-800">
          Daftar sekarang
        </Link>
      </p>
    </div>
  );
};

export default Login;
