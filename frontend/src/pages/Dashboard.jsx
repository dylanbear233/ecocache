import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

console.log("Dashboard mounted");


export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("useEffect triggered. Token:", token);
  
    if (!token) {
      console.warn("No token found, redirecting to login...");
      navigate("/login");
      return;
    }
  
    console.log("Token exists. Proceeding to fetch user info...");
  
    fetch("https://ecocache-backend.onrender.com/api/userinfo/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("Response status:", res.status);
        if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("User data received:", data);
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error occurred:", err);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);
   

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  console.log("Dashboard rendering...", { loading, user });

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

      <button onClick={() => {
        const token = localStorage.getItem("token");
        console.log("Manual fetch token:", token);
        fetch("https://ecocache-backend.onrender.com/api/userinfo/", {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(res => res.json())
          .then(data => console.log("Manual fetch user:", data))
          .catch(err => console.error("Manual fetch failed", err));
      }}>Test Fetch</button>

    </div>
  );
}
