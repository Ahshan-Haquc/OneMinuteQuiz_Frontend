import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined); // null = logged out, object = logged in

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // set upping this whole project for deployment on vercel
        const res = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
          method: "GET",
          credentials: "include", // it is must for sending cookie
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.userInfo);
        } else {
          setUser(null); // null means token invalid or not logged in
        }
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthUser = () => useContext(AuthContext);
