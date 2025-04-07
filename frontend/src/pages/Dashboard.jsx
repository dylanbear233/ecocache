import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // delete token
    localStorage.removeItem("token");

    // return to login page
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <p>Welcome! You are logged in.</p>

      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
