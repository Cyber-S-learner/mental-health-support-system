import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/home"); // 🔹 Directly go to Home page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-fit max-w-md">
        
        {/* App Title */}
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-2">
          🌿 Mental Health Support
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Please login to continue
        </p>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="student@example.com"
            className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 focus:outline-none"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-fit px-3 py-3 bg-indigo-600 text-black rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-200 border border-red-200 " 
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
