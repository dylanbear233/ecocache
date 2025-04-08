import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  console.log("RequireAuth - token:", token);

  if (!token) {
    console.log("Redirecting to login...");
    return <Navigate to="/login" replace />;
  }

  return children;
}
