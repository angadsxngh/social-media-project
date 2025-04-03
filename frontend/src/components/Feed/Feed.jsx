import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Feed = () => {
  const navigate = useNavigate()
  const defaultAvatar =
    "https://cdn-icons-png.flaticon.com/512/3177/3177440.png";
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/v1/users/feed", {
          method: "GET",
          credentials: "include",
        });

        const res = await response.json();
        console.log(res);
        setPosts(res || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      const response = await fetch("/api/v1/users/likePost", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ postid: postId }),
        credentials: "include",
      });

      if (response.ok) {
        const res = await response.json();

        // Update the posts array with new likes count
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, likes: res.post.likes } : post
          )
        );
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const goToProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (!posts.length)
    return <div className="bg-black text-white text-center p-4 py-[15%] font-semibold text-lg">Follow people to see their posts!</div>;

  return (
    <div className="px-[30%] mx-auto bg-black">
      <br />
      <br />
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-[#111] mb-4 p-4 shadow-md rounded-lg text-white font-semibold"
        >
          <div className="flex items-center gap-3">
            <img
              src={post.User?.pfp || defaultAvatar}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <span
              className="font-semibold cursor-pointer hover:underline"
              onClick={() => goToProfile(post.User?.id)}
            >
              {post.User?.username}
            </span>
          </div>
          {post.mediaUrl && (
            <img src={post.mediaUrl} className="rounded-lg w-full mx-auto mt-2 p-2" alt="" />
          )}
          <p className="mt-2">{post.caption}</p>

          <button
            onClick={() => handleLike(post.id)}
            className="flex items-center gap-1 hover:text-red-500 cursor-pointer mt-2"
          >
            <FaHeart className="text-red-400" /> {post?.likes.length}
          </button>

          <span className="text-sm text-gray-500 block mt-2">
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </div>
      ))}
      <br />
      <br />
    </div>
  );
};

export default Feed;
