import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpdatePassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.oldPassword.trim() ||
      !form.newPassword.trim() ||
      !form.confirmNewPassword.trim()
    ) {
      alert("All fields are required!");
      return;
    }

    if (form.newPassword !== form.confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }

    try {
      const response = await fetch("/api/v1/users/change-password", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response) {
        console.log(response);
        console.log("Updating password...");
        navigate("/Account");
      } else {
        console.log("error updating password!");
      }
    } catch (error) {
      console.log(
        "An error occured while updating the password with error: ",
        error
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-5">
      <div className="bg-[#111] p-6 rounded-lg shadow-lg w-80 text-center">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold mb-4">Update Password</h2>

          {/* Old Password Input */}
          <input
            type="password"
            name="oldPassword"
            value={form.oldPassword}
            onChange={handleChange}
            placeholder="Enter old password"
            className="w-full bg-gray-800 text-white p-3 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          />

          {/* New Password Input */}
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
            className="w-full bg-gray-800 text-white p-3 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          />

          {/* Confirm New Password Input */}
          <input
            type="password"
            name="confirmNewPassword"
            value={form.confirmNewPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
            className="w-full bg-gray-800 text-white p-3 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          />

          {/* Save Button */}
          <button
            type="submit"
            className="mt-4 w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
