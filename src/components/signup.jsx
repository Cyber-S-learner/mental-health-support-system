import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError("⚠️ Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("❌ Passwords do not match.");
      return;
    }

    // 🔹 Dummy Signup Success (Replace with API/Firebase later)
    setError("");
    alert("✅ Signup successful! Please login.");
    navigate("/"); // Redirect to Login Page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md flex-col items-center jusitfy-center">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-teal-700 mb-2">
          🌱 Create Your Account
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Join our Mental Health Support community
        </p>

        {/* Signup Form */}
<form
  onSubmit={handleSubmit}
  className="flex flex-col gap-6 w-fit max-w-md mx-auto bg-white  rounded-2xl shadow-lg border border-gray-200 px-15 py-15 "
>
  {error && (
    <p className="text-red-500 text-sm text-center font-semibold">
      {error}
    </p>
  )}

  {/* Name */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Full Name
    </label>
    <input
      type="text"
      placeholder="John Doe"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 focus:outline-none"
    />
  </div>

  {/* Email */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Email Address
    </label>
    <input
      type="email"
      placeholder="student@example.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 focus:outline-none"
    />
  </div>

  {/* Password */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Password
    </label>
    <input
      type="password"
      placeholder="••••••••"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 focus:outline-none"
    />
  </div>

  {/* Confirm Password */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Confirm Password
    </label>
    <input
      type="password"
      placeholder="••••••••"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 focus:outline-none"
    />
  </div>

  {/* Signup Button */}
  <button
    type="submit"
    className="w-full py-3 bg-teal-600 text-white rounded-xl font-semibold  hover:bg-teal-700 transition-all duration-200"
  >
    Sign Up
  </button>
</form>


        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-teal-600 font-medium hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
