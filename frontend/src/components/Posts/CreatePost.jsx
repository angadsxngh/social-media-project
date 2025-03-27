import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";

export default function CreatePost() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    caption: "",
    media: ""
  });

  function handleMediaChange(e) {
    const file = e.target.files[0];
    if (file) {
      setMedia(URL.createObjectURL(file));
      setForm({ ...form, [e.target.name]: file });
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("caption", form.caption);
    formData.append("media", form.media);

    try {
      const response = await fetch("/api/v1/users/create-post", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/Account");
      } else {
        console.error("Error creating post:", data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-black lg:p-5">
      <div className="max-w-md mx-auto p-6 bg-[#111] text-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-4">Create Post</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-gray-300">Upload Media</label>
          <input
            type="file"
            name="media"
            accept="image/*,video/*"
            onChange={handleMediaChange}
            className="bg-gray-800 p-2 rounded-lg text-white"
          />

          {media && (
            <div className="w-full h-40 bg-gray-900 flex items-center justify-center rounded-lg overflow-hidden">
              <img src={media} alt="Preview" className="object-cover w-full h-full" />
            </div>
          )}

          <label className="text-gray-300">Caption</label>
          <textarea
            name="caption"
            onChange={handleChange}
            className="bg-gray-800 p-2 rounded-lg text-white"
            placeholder="Write something..."
            rows={3}
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg flex justify-center items-center disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-white rounded-full animate-spin"></div>
            ) : (
              "Post"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
