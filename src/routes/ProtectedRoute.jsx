import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Get authentication state

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
