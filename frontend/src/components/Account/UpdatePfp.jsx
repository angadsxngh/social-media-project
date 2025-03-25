import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"; // Default avatar

export default function UpdatePfp() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(defaultAvatar);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setImage(null);
    setPreview(defaultAvatar);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-5">
      <div className="bg-[#111] p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-xl font-semibold mb-4">Update Profile Picture</h2>

        {/* Profile Picture Preview */}
        <div className="relative mx-auto">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-500">
            <img src={preview} alt="Profile Preview" className="w-full h-full object-cover" />
          </div>

          {/* Remove Image Button (Centered) */}
          {image && (
            <div className="flex justify-center mt-3">
              <button
                onClick={handleRemoveImage}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <FaTrash className="text-white" />
                Remove
              </button>
            </div>
          )}
        </div>

        {/* File Input */}
        <div className="mt-4">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="fileInput"
            onChange={handleFileChange}
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            Choose Image
          </label>
        </div>

        {/* Save Button */}
        <button className="mt-4 cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          Save Changes
        </button>
      </div>
    </div>
  );
}
