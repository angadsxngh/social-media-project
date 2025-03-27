import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpdateName() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("updating name with ", form);

    if (!form.name.trim()) {
      alert("Name cannot be empty!");
      return;
    }

    try {
      const response = await fetch("/api/v1/users/update-details", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response) {
        console.log("name updating");
      }

      console.log("New name saved:", name);

      navigate("/account");
    } catch (error) {
      console.log("error updating the name", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-5">
      <div className="bg-[#111] p-6 rounded-lg shadow-lg w-80 text-center">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold mb-4">Change Name</h2>

          {/* Name Input Field */}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter new name"
            className="w-full bg-gray-800 text-white p-3 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
