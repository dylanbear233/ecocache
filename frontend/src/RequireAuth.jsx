import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // Jump to login page if no token
    return <Navigate to="/login" replace />;
  }

  // Loading the page if token exists
  return children;
}
