import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const checkLoginStatus = useCallback(async () => {
    try {
      const response = await fetch(
        `http://${import.meta.env.VITE_API_ADDRESS}:${
          import.meta.env.VITE_API_PORT
        }/api/user/session`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        setUser(data);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error("로그인 상태 확인 중 오류:", error);
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const logout = async () => {
    try {
      const response = await fetch(
        `http://${import.meta.env.VITE_API_ADDRESS}:${
          import.meta.env.VITE_API_PORT
        }/api/user/logout`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (err) {
      console.error("로그아웃 오류:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
