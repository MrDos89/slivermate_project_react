import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function PrivateRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();

  // 아직 로그인 여부 판단 중이면 아무것도 렌더링하지 않음
  if (loading) return null;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
