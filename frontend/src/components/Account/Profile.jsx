import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Posts from "../Posts/Posts";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";


export default function Profile() {
  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png";
  const params = useParams();
  const { user } = useUser();
  const [userr, setUserr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [following, setFollowing] = useState(false);
  const navigate = useNavigate()

  const handleClick = async () => {
    console.log("button clicked");

    const response = await fetch(`/api/v1/users/follow/${params.userid}`, {
      method: "POST",
    });

    console.log(response);

    if (response.ok) {
      setFollowing(!following);

      setUserr((prevUser) => ({
        ...prevUser,
        followers: following 
        ?  prevUser.followers.filter((id) => id !== user.id) 
        : [...prevUser.followers, user.id],
      }))
    }
  };

  useEffect(() => {
    console.log("logged in user",user)

    async function fetchUser() {
      try {
        const response = await fetch(`/api/v1/users/profile/${params.userid}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });

        console.log(response);

        const data = await response.json();

        console.log(data);
        console.log("following: ", data.following);
        console.log("followers: ", data.followers);

        if (data.followers.includes(user.id)) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }

        if (!response.ok)
          throw new Error(data.message || "Failed to load user");

        setUserr(data);
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
      <div className="bg-[#111] pl-6 pr-3 pb-6 pt-3 rounded-lg shadow-lg w-full max-w-md text-center">
      {user.id !== userr.id && (
          <div className="flex justify-end">
            <button
              onClick={handleClick}
              className={`cursor-pointer px-3 py-1 rounded-lg font-semibold ${
                following ? "bg-white text-black" : "bg-blue-400 text-black"
              }`}
            >
              {following ? "Following" : "Follow"}
            </button>
          </div>
        )}
        <img
          src={userr.pfp || defaultAvatar}
          alt={userr.username}
          className="w-24 h-24 rounded-full object-cover mx-auto"
        />

        <h2 className="text-2xl font-semibold mt-3">{userr.name}</h2>
        <p className="text-gray-400">@{userr.username}</p>

        <div className="mt-5 flex justify-around text-sm text-gray-300">
          <div>
            <p className="font-semibold">
              {userr ? userr.posts.length : "no user"}
            </p>
            <p>Posts</p>
          </div>
          <div>
            <p className="font-semibold">
              {userr ? userr.followers.length : "no user"}
            </p>
            <p>Followers</p>
          </div>
          <div>
            <p className="font-semibold">
              {userr ? userr.following.length : "no user"}
            </p>
            <p>Following</p>
          </div>
        </div>
      </div>

      <div className="mt-6 lg:px-20 w-full">
        <h3 className="text-xl font-semibold text-center mb-4">Posts</h3>
        {userr.posts.length > 0 ? (
          <div className="grid grid-cols-3 gap-1 lg:gap-4 px-2">
            {userr.posts.map((post) => (
              <div key={post.id} className="bg-black rounded-lg shadow-md">
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