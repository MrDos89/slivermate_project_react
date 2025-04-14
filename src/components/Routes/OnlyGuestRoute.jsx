import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function OnlyGuestRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}
