import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token in Dashboard:", token); // ✅ 检查有没有 token
  
    if (!token) {
      navigate("/login");
      return;
    }
  
    fetch("https://ecocache-backend.onrender.com/api/userinfo/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log("userinfo status", res.status);
        if (res.status === 401) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        console.log("userinfo data", data);
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("userinfo fetch error", err);
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
