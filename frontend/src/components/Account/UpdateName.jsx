import React, { useState } from "react";

export default function UpdateName() {
  const [name, setName] = useState(""); // Current name (can be fetched from user data)

  const handleSave = () => {
    if (!name.trim()) {
      alert("Name cannot be empty!");
      return;
    }
    console.log("New name saved:", name); // Replace with API call
    alert("Name updated successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-5">
      <div className="bg-[#111] p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-xl font-semibold mb-4">Change Name</h2>

        {/* Name Input Field */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter new name"
          className="w-full bg-gray-800 text-white p-3 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="mt-4 w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
