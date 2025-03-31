import React, { useState, useEffect } from "react";
import { FaCog } from "react-icons/fa";
import MediaCard from "../Card/Card.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";
import Posts from "../Posts/Posts.jsx";
import { Navigate } from "react-router-dom";

// ✅ Default Avatar
const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png";

export default function Account() {
  const navigate = useNavigate();
  const { user, posts, refreshPosts } = useUser();
  const {
    name = "No Name",
    username = "unknown_user",
    email = "No email provided",
    number = "No phone number",
    pfp = "",
    followers = 0,
    following = 0,
  } = user || {};

  const [imageSrc, setImageSrc] = useState(pfp || defaultAvatar);
  const [isRotating, setIsRotating] = useState(false);

  const handleImageError = () => {
    setImageSrc(defaultAvatar);
  };

  const handleGearClick = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 500);
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white lg:p-5">
      <div className="bg-[#111] p-6 rounded-lg shadow-lg max-w-md w-full text-center relative">
        {/* Profile Picture */}
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-500">
          <img
            src={imageSrc}
            alt="Profile"
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        </div>

        {/* User Details */}
        <h2 className="text-xl font-semibold mt-4">{name}</h2>
        <p className="text-gray-400">@{username}</p>

        {/* Stats: posts, Followers, Following */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-gray-300 text-sm">
          <div>
            <p className="text-lg font-bold">{posts.length}</p>
            <p>Posts</p>
          </div>
          <div>
            <p className="text-lg font-bold">{followers.length}</p>
            <p>Followers</p>
          </div>
          <div>
            <p className="text-lg font-bold">{following.length}</p>
            <p>Following</p>
          </div>
          <div>
            <NavLink to="/create-post">
              <button className="cursor-pointer bg-blue-400 mt-5 w-full px-3 py-1 rounded-lg text-black font-semibold">
                New Post
              </button>
            </NavLink>
          </div>
          <div>
            <NavLink to="/update-account">
              <button className="cursor-pointer bg-blue-400 mt-5 w-full px-3 py-1 rounded-lg text-black font-semibold order-last">
                Edit Profile
              </button>
            </NavLink>
          </div>
          {/*  FUTURE FUNCTIONALITY 
          <div>
            <button className="cursor-pointer bg-blue-400 mt-5 w-full px-3 py-1 rounded-lg text-black font-semibold">New Post</button>
          </div> */}
        </div>
      </div>

      {/* User's Posts Section */}
      <div className="mt-6 lg:px-20 w-full">
        <h2 className="text-xl font-semibold text-center mb-4">Your Posts</h2>
        {posts.length > 0 ? (
          <div className="grid grid-cols-3 gap-1 lg:gap-4 px-2">
            {posts.map((post, index) => (
              // <MediaCard
              //   key={index}
              //   post={post}
              // />
              <Posts key={index} post={post} />
            ))}
          </div>
        ) : (
          <div className="">
            <p className="text-gray-500 text-center">
              No posts uploaded yet.{" "}
              <a className="underline text-blue-400" href="/create-post">
                Add a post?
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
