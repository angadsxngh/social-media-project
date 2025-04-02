import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import ToasterUi from "toaster-ui";

export default function LoginWithEmail() {
  const toaster = new ToasterUi()
  const { setUser } = useUser();  // ✅ Get setUser from context
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json(); 
        console.log("Logged-in user:", data);

        if (data.user) {  
          setUser(data.user);
          toaster.addToast("Login successfull", "success")
          navigate("/Account"); 
        } else {
          toaster.addToast("email and password do not match", "error")
          console.error("User data missing from response");
        }
      } else {
        toaster.addToast("email and password do not match", "error")
      }
    } catch (error) {
      toaster.addToast("Please contact administrator or try again later", "error")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-[#111] p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-blue-400 text-center">Welcome Back!</h2>
        <p className="text-gray-400 text-center mt-2">Log in to continue</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
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

        <p className="mt-4 text-center text-gray-400">
          Want to log in with username?{" "}
          <NavLink to="/Login-username" className="text-blue-400 hover:underline">
            Click here
          </NavLink>
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
