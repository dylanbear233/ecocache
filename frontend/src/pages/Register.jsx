import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); 
  

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://ecocache-backend.onrender.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Registration successful!");
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      setMessage("Network error.");
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        <p>{message}</p>
      </form>
      <button onClick={() => navigate("/")}>Back to Home</button>
      <button onClick={() => navigate("/login")}>Already have an account? Login</button>
    </div>
  );
}