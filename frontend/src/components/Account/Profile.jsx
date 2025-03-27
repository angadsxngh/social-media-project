import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Posts from "../Posts/Posts";

export default function Profile() {
  const params = useParams();

  //   console.log(userid)
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`/api/v1/users/profile/${params.userid}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });

        console.log(posts);

        const data = await response.json();

        if (!response.ok)
          throw new Error(data.message || "Failed to load user");

        setUser(data);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [params.userid]);

  if (loading)
    return <div className="text-white text-center mt-10">Loading...</div>;
  if (error)
    return (
      <div className="text-red-500 text-center mt-10">{error.message}</div>
    );

  return (
    <div className="bg-black min-h-screen flex flex-col items-center p-10 text-white">
      <div className="bg-[#111] p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <img
          src={user.pfp || "/default-avatar.png"}
          alt={user.username}
          className="w-24 h-24 rounded-full object-cover mx-auto"
        />
        <h2 className="text-2xl font-semibold mt-3">{user.name}</h2>
        <p className="text-gray-400">@{user.username}</p>

        <div className="mt-5 flex justify-around text-sm text-gray-300">
          <div>
            <p className="font-semibold">
              {user ? user.posts.length : "no user"}
            </p>
            <p>Posts</p>
          </div>
          <div>
            <p className="font-semibold">
              {user ? user.followers.length : "no user"}
            </p>
            <p>Followers</p>
          </div>
          <div>
            <p className="font-semibold">
              {user ? user.following.length : "no user"}
            </p>
            <p>Following</p>
          </div>
        </div>
      </div>

      <div className="mt-6 lg:px-20 w-full">
        <h3 className="text-lg font-semibold mb-3">Posts</h3>
        {user.posts.length > 0 ? (
          <div className="grid grid-cols-3 gap-1 lg:gap-4 px">
            {user.posts.map((post) => (
              <div key={post.id} className="bg-[#222] rounded-lg shadow-md">
                <Posts post={post} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No posts yet.</p>
        )}
      </div>
    </div>
  );
}
