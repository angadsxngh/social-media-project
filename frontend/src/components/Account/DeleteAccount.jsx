import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function DeleteAccount() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.password.trim() || !form.confirmPassword.trim()) {
      alert("Please enter your password twice to confirm deletion!");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("/api/v1/users/delete-account", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const confirmDelete = window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      );

      console.log(response);

      if (response && confirmDelete) {
        console.log("deleting account");
        setUser(null);
        navigate("/");
      } else {
        console.log("error deleting the account");
      }
    } catch (error) {
      console.log("an error occured while deleting your account ", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-5">
      <div className="bg-[#111] p-6 rounded-lg shadow-lg w-80 text-center">
        <form action="">
          <h2 className="text-xl font-semibold mb-4 text-red-500">
            Delete Account
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Warning: This action is permanent and cannot be undone.
          </p>

          {/* Password Input */}
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full bg-gray-800 text-white p-3 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 mb-3"
          />

          {/* Confirm Password Input */}
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className="w-full bg-gray-800 text-white p-3 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 mb-3"
          />

          {/* Delete Account Button */}
          <button
            onClick={handleSubmit}
            className="mt-4 cursor-pointer w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
          >
            Delete Account
          </button>
        </form>
      </div>
    </div>
  );
}
