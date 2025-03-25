import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // ✅ Load user from localStorage on initial render
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [posts, setPosts] = useState([])

    const [loading, setLoading] = useState(true);

    // ✅ Fetch user data from API
    const fetchUser = async () => {
        setLoading(true);
        try {
            
            const response = await fetch('/api/v1/users/get-user', {
                method: "GET",
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch user: ${response.status}`);
            }

            const res = await response.json();

            setUser(res.user || null);
            if (res.user) {
                localStorage.setItem("user", JSON.stringify(res.user)); // ✅ Store in localStorage
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            setUser(null);
            localStorage.removeItem("user"); // ✅ Clear if fetch fails
        } finally {
            setLoading(false);
        }
    };

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/v1/users/get-posts", {
                method: 'GET',
                credentials: "include"
            })

            if(!response.ok){
                throw new Error(`Failed to fetch posts: ${response.status}`)
            }

            const res = await response.json();


            setPosts(res || null)
        } catch (error) {
            console.error("Error fetching user:", error);
            setPosts(null);
        } finally{
            setLoading(false);
        }
    };

    // ✅ Runs once on mount
    useEffect(() => {
        fetchUser();
    }, []);

    // ✅ Logout function (Clears localStorage & state)
    const logout = async () => {
        try {
            await fetch("/api/v1/users/logout", {
                method: "POST",
                credentials: "include"
            });
            console.log("User logged out successfully");

            setUser(null);
            localStorage.removeItem("user"); // ✅ Ensure user data is removed
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, posts, setUser, loading, logout, refreshUser: fetchUser, refreshPosts: fetchPosts }}>
            {children}
        </UserContext.Provider>
    );
};

// ✅ Custom hook for easy access to UserContext
export const useUser = () => {
    return useContext(UserContext);
};
