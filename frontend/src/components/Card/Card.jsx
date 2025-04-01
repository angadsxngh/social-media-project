import React, { useState } from "react";
import { FaHeart, FaRegComment, FaTrash } from "react-icons/fa";
import { useUser } from "../../context/UserContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";

export default function Card() {
  const navigate = useNavigate();
  const location = useLocation();
  const usePost = location.state || { likes: [], comments: [], mediaUrl: "", caption: "" };
  const { user } = useUser();
  const [showComments, setShowComments] = useState(false);
  const isOwner = user?.id === usePost.authorId;
  const [post, setPost] = useState(usePost || { authorId: "", likes: [] });
  const [isLiked, setIsLiked] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [commentText, setCommentText] = useState("");

  // const handleComment = async () => {
  //   if (!commentText.trim()) return;
    
  //   const response = await fetch(`/api/v1/users/posts/add-comment/${usePost.id}`, {
  //     method: "POST",
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify({ text: commentText }),
  //     credentials: "include",
  //   });

  //   if (response.ok) {
  //     const res = await response.json();
  //     setPost(...post, );
  //     setCommentText("");
  //     setShowDialog(false);
  //   }
  // };

  const handleLike = async () => {
    const response = await fetch("/api/v1/users/likePost", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ postid: usePost.id }),
      credentials: "include",
    });

    if (response.ok) {
      const res = await response.json();
      setPost(res.post);
      setIsLiked(res.post.likes.includes(user.id));
    }
  };

  async function handleDelete() {
    if (!usePost.id) return;
    const response = await fetch("/api/v1/users/delete-post", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ postid: usePost.id }),
    });

    if (response.ok) {
      navigate("/account");
    }
  }

  return (
    <div className="bg-black py-20 flex justify-center">
      <div className="max-w-md w-full bg-[#111] p-2 border rounded-lg shadow-lg text-white">
        {post?.mediaUrl && (
          <div className="rounded-lg overflow-hidden flex items-center justify-center w-full bg-gray-800 h-64">
            <img src={post?.mediaUrl} alt="Post" className="w-full h-64 object-cover" />
          </div>
        )}

        <p className="mt-3 text-gray-300">{post?.caption || "No caption provided"}</p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4">
            <button onClick={handleLike} className="flex items-center gap-1 hover:text-red-500">
              <FaHeart className="text-red-400" /> {post?.likes.length}
            </button>
          </div>

          {isOwner && (
            <button onClick={handleDelete} className="text-gray-400 hover:text-red-500">
              <FaTrash />
            </button>
          )}
        </div> 
      </div>
    </div>
  );
}