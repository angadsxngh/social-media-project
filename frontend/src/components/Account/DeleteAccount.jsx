import React, { useState } from "react";

export default function DeleteAccount() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleDelete = () => {
    if (!password.trim() || !confirmPassword.trim()) {
      alert("Please enter your password twice to confirm deletion!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (confirmDelete) {
      console.log("Account deleted!"); // Replace with API call
      alert("Your account has been deleted.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-5">
      <div className="bg-[#111] p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-xl font-semibold mb-4 text-red-500">Delete Account</h2>
        <p className="text-sm text-gray-400 mb-4">
          Warning: This action is permanent and cannot be undone.
        </p>

        {/* Password Input */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full bg-gray-800 text-white p-3 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 mb-3"
        />

        {/* Confirm Password Input */}
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          className="w-full bg-gray-800 text-white p-3 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 mb-3"
        />

        {/* Delete Account Button */}
        <button
          onClick={handleDelete}
          className="mt-4 cursor-pointer w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
