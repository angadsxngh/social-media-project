import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react"; // Importing Trash Can Icon
import { useUser } from "../../context/UserContext"; 
import ToasterUi from 'toaster-ui'
export default function Signup() {

  const toaster = new ToasterUi()
  const { setUser } = useUser()
  const navigate = useNavigate()
  const [pfp, setPfp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    number: "",
    password: "",
    pfp: null,
  });

  const fileInputRef = useRef(null); // Ref for file input 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPfp(URL.createObjectURL(file));
      setForm({ ...form, [e.target.name]: file });
    }
  };

  const handleDeleteFile = () => {
    setForm({ ...form, pfp: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset input field
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    console.log("User Data:", form);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("username", form.username);
    formData.append("number", form.number);
    formData.append("password", form.password);
    formData.append("pfp", form.pfp);

    try {
      const response = await fetch("/api/v1/users/register", {
        method: "POST",
        body: formData,
        credentials: "include"
      });
      console.log(response)

      if(response.ok){
        const data = await response.json();
        console.log("Account created: ", data)

        if(data){
          setUser(data)
          const toast = toaster.addToast("Account registered successfully", "success")
          navigate('/Account')
        } else{
          console.log("user data is missing from response")
          const toast = toaster.addToast("User with email or username already exists", "error")
        }
      } else {
        toaster.addToast("Invalid username or password", "error")
        console.error("Login failed:", res.status);
      }
    } catch (error) {
      // const toast = toaster.addToast("User with email or username already exists", "error")
      console.error("error creating account:", error);
    } finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-[#111] p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-blue-400 text-center">Create an Account</h2>
        <p className="text-gray-400 text-center mt-2">Join our community and start connecting!</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#222] text-white border border-gray-700 focus:ring-2 focus:ring-blue-400"
            required
          />
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
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#222] text-white border border-gray-700 focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="tel"
            name="number"
            placeholder="Phone Number"
            value={form.number}
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

          {/* Custom File Upload with Delete Button */}
          <div className="text-gray-400">
            <label className="block mb-2">Profile Picture (Optional)</label>
            <div className="relative w-full flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                name="pfp"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-full p-3 bg-[#222] text-gray-400 text-center rounded-lg border border-gray-700 cursor-pointer hover:bg-blue-400 hover:text-black transition-all">
                {form.pfp ? form.pfp.name : "Upload Profile Picture"}
              </div>

              {/* Trash Can Delete Button (Visible When File is Selected) */}
              {form.pfp && (
                <button
                  type="button"
                  onClick={handleDeleteFile}
                  className="bg-red-500 p-2 rounded-lg hover:bg-red-600 transition-all"
                >
                  <Trash2 className="text-white w-5 h-5" /> {/* White Trash Icon */}
                </button>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-400 text-black font-semibold p-3 rounded-lg hover:bg-blue-500 transition-all"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/Login-email" className="text-blue-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
