import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FindUser() {
  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png";
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Find new people!");

  const navigate = useNavigate();

  useEffect(() => {
    setUsers([]);
    setMessage("Find new people!");
  }, [query]);

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    setUsers([]);
    console.log("users", users);
    setMessage("Searching...");
    setLoading(true);

    try {
      setUsers([...[]]);

      const response = await fetch(
        `/api/v1/users/search?query=${encodeURIComponent(query)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response)
      const data = await response.json();
      if (response.ok) {
        setUsers(data.users || []);
        setMessage(data.users.length ? "" : "No users found");
      } else {
        setMessage("Error searching users");
      }
    } catch (error) {
      console.error("Error searching users:", error);
      setMessage("Error fetching users");
    } finally {
      setLoading(false);
    }
  }

  function handleClick(userId) {
    navigate(`/profile/${userId}`);
  }

  return (
    <div className="bg-black min-h-screen flex flex-col items-center p-10 text-white">
      <h2 className="text-xl font-semibold mb-4">Find Users</h2>

      <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or username"
          className="flex-1 p-2 rounded-lg bg-gray-800 text-white border border-gray-600"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 cursor-pointer hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center disabled:bg-blue-400"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-white rounded-full animate-spin"></div>
          ) : (
            "Search"
          )}
        </button>
      </form>

      <div className="mt-6 w-full max-w-md">
        {users.length > 0 ? (
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex items-center justify-between bg-[#111] p-3 rounded-lg shadow-md"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.pfp || defaultAvatar
                    }
                    alt={user.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span>{user.username}</span>
                </div>
                <button
                  onClick={() => handleClick(user.id)}
                  className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg cursor-pointer"
                >
                  View
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 mt-4 absolute left-[50%] translate-x-[-50%]">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
