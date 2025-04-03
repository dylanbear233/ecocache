import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState(""); // ← 改这里
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); 
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://ecocache-backend.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }) // ← 改这里
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Login successful!");
        setTimeout(() => {
          navigate("/dashboard"); // ← 跳转
        }, 500);
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      setMessage("Network error.");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username" // ← 改这里
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>{message}</p>
      </form>
    </div>
  );
}
