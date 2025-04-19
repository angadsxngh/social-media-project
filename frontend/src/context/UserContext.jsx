import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false); 

    const setGlobalLoading = (state) => {
        setLoading(state);
    };

    const fetchUser = async () => {
        setGlobalLoading(true);  
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
                localStorage.setItem("user", JSON.stringify(res.user));
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            setUser(null);
            localStorage.removeItem("user");
        } finally {
            setGlobalLoading(false); 
        }
    };

    const fetchPosts = async () => {
        setGlobalLoading(true);  
        try {
            const response = await fetch("/api/v1/users/get-posts", {
                method: "GET",
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch posts: ${response.status}`);
            }

            const res = await response.json();
            setPosts(res || []);
        } catch (error) {
            console.error("Error fetching posts:", error);
            setPosts([]);
        } finally {
            setGlobalLoading(false); 
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);


    const logout = async () => {
        setGlobalLoading(true); 
        try {
            await fetch("/api/v1/users/logout", {
                method: "POST",
                credentials: "include"
            });

            setUser(null);
            localStorage.removeItem("user");
        } catch (error) {
            console.error("Error logging out:", error);
        } finally {
            setGlobalLoading(false); 
        }
    };

    return ( 
        <UserContext.Provider value={{ 
            user, posts, setUser, loading, setGlobalLoading, logout, 
            refreshUser: fetchUser, refreshPosts: fetchPosts 
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
