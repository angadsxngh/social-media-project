import React, { use, useEffect, useState } from "react";
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
  const [post, setPost] = useState(usePost || { likes: [] })
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = async () => {
    console.log("post liked")

    const response = await fetch('/api/v1/users/likePost', {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ postid: usePost.id }),
      credentials: 'include'
    });
  
    if (response.ok) {
      const res = await response.json();
      console.log("Post details:", usePost);
      console.log("response:", res);

      setPost((prevPost) => ({
        ...prevPost,
        likes: res.likes
      }));
      setIsLiked(res.likes.includes(user.id));
    } else {
      console.log("Failed to like/unlike post");
    }
  }

  async function handleDelete() {
    if (!usePost.id) return;
    console.log("delete post id: ", usePost.id)

    const response = await fetch("/api/v1/users/delete-post", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ postid: usePost.id }),
    })

    console.log(response)

    // .then(() => console.log("step 1"))
    //   .then((res) => res.json())
    //   .then(() => navigate("/Account"));

    if(response){
      const data = await response.json()
      console.log("data: ", data)
      navigate('/account')
    }
  }

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/v1/posts/${params.postId}`)
      } catch (error) {
        
      }
    }
  })

  return (
    <div className="bg-black py-20 flex justify-center">
    <div className="max-w-md w-full bg-[#111] p-2 border rounded-lg shadow-lg text-white">
      {usePost.mediaUrl && (
        <div className="rounded-lg overflow-hidden flex items-center justify-center w-full bg-gray-800 h-64">
          <img src={usePost.mediaUrl} alt="Post" className="w-full h-64 object-cover" />
        </div>
      )}

      <p className="mt-3 text-gray-300">{usePost.caption || "No caption provided"}</p>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-4">
          <button onClick={handleLike} className="flex items-center gap-1 hover:text-red-500">
            <FaHeart className="text-red-400" /> {post.likes?.length}
          </button>
          <button onClick={() => setShowComments(!showComments)} className="flex items-center gap-1 hover:text-blue-400">
            <FaRegComment /> {usePost.comments ? usePost.comments.length : 0}
          </button>
        </div>

        {isOwner && (
          <button onClick={handleDelete} className="text-gray-400 hover:text-red-500">
            <FaTrash />
          </button>
        )}
      </div>

      {showComments && (
        <div className="mt-4 bg-[#222] p-3 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-blue-400">Comments</h3>
            <button onClick={() => setShowComments(false)}>
              <FaTrash className="text-gray-400 hover:text-red-500" />
            </button>
          </div>
          <ul className="space-y-2 text-gray-300">
            {usePost.comments && usePost.comments.length > 0 ? (
              usePost.comments.map((comment, index) => (
                <li key={index} className="p-2 bg-[#333] rounded-lg">{comment}</li>
              ))
            ) : (
              <p className="text-gray-400">No comments yet.</p>
            )}
          </ul>
        </div>
      )}
    </div>
    </div>
  );
}
