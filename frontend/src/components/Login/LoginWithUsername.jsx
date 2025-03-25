import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function LoginWithUsername() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-[#111] p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-blue-400 text-center">Welcome Back!</h2>
        <p className="text-gray-400 text-center mt-2">Log in to continue</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#222] text-white border border-gray-700 focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#222] text-white border border-gray-700 focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-400 text-black font-semibold p-3 rounded-lg hover:bg-blue-500 transition-all"
          >
            Log In
          </button>
        </form>

        {/* Redirect Link to Email & Password Login */}
        <p className="mt-4 text-center text-gray-400">
          Want to log in with email?{" "}
          <Link to="/login-email" className="text-blue-400 hover:underline">
            Click here
          </Link>
        </p>

        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
