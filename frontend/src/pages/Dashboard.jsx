import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

console.log("Dashboard mounted");


export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found");
      navigate("/login");
      return;
    }
  
    console.log("Fetching userinfo...");
    fetch("https://ecocache-backend.onrender.com/api/userinfo/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched user:", data);
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("User fetch error:", err);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);
  
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      {loading ? (
        <p>Loading user info...</p>
      ) : user ? (
        <>
          <p>Welcome, <strong>{user.username}</strong>!</p>
          <p>Email: {user.email}</p>
          <button onClick={() => navigate("/share")} className="nav-button">
            Share a Discovery
          </button>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Failed to load user information.</p>
      )}
    </div>
  );
}
