import React, { useState } from "react";
import { FaHeart, FaRegComment, FaTrash } from "react-icons/fa";
import { useUser } from "../../context/UserContext.jsx";
import { useNavigate, NavLink } from "react-router-dom";

export default function Posts({
  mediaUrl = "",
  caption = "No caption provided",
  likes = 0,
  comments = [],
  authorId = "",
  onDelete,
  post
}) {
  const navigate=useNavigate()
  const { user } = useUser();
  const [showComments, setShowComments] = useState(false);
  const isOwner = user?.id === post.authorId;

  const handleClick =() => 
    {console.log("Post clicked!", post)
    navigate('/Card', {state: post}) 
  }

  return (
    <NavLink to='/Card' state={post}>
    <div className="max-w-md w-full bg-[#111] p-2 border-white border cursor-pointer shadow-lg text-white">
      {post.mediaUrl && (
        <div className="rounded-lg overflow-hidden flex items-center justify-center w-full bg-gray-800 h-40 lg:h-64">
          <img src={post.mediaUrl} alt="Post" className="w-full h-64 object-cover" />
        </div>
      )}

      {!post.mediaUrl && (
        <p className="text-gray-300 rounded-lg overflow-hidden w-fullh-40 lg:h-64">{post.caption}</p>
      )}
    </div> 
    </NavLink>
  );
}
