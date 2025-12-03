import React from "react";
import { Link, useParams } from "react-router-dom";

const ErrorPage = () => {
  const { errorCode } = useParams();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-customBlue-100 mb-4">
        {errorCode || "404"}
      </h1>
      <h2 className="text-2xl font-semibold text-teks mb-4">
        Oops! Page Not Found
      </h2>
      <p className="text-teks-samping mb-8">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="bg-customBlue-100 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
