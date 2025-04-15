// context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 사용자 정보
  const [loading, setLoading] = useState(true);

  const API_USER_SESSION_URL = `http://${import.meta.env.VITE_API_ADDRESS}:${
    import.meta.env.VITE_API_PORT
  }/api/user/session`;

  // context/AuthContext.jsx 내부
  const logout = async () => {
    await fetch("/api/user/logout", { method: "GET", credentials: "include" });
    setUser(null);
  };

  const refreshSession = async () => {
    try {
      const res = await fetch(API_USER_SESSION_URL, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setUser(data);
    } catch {
      setUser(null);
    }
  };

  const isLoggedIn = !!user;

  useEffect(() => {
    // 세션으로 유저 정보 확인
    fetch(API_USER_SESSION_URL, {
      method: "GET",
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setUser(data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, logout, refreshSession, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
