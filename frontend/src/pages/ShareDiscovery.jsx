import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ShareDiscovery() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please login first.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      const res = await fetch("https://ecocache-backend.onrender.com/api/discoveries/create/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Discovery shared successfully!");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMessage(data.message || "Failed to share discovery.");
      }
    } catch (error) {
      setMessage("Network error.");
    }
  };

  return (
    <div className="form-container">
      <h2>Share Your Discovery</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="What did you find?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={4}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Share</button>
        <p>{message}</p>
      </form>
      <button onClick={() => navigate("/dashboard")} className="nav-button">
        Back to Dashboard
      </button>
    </div>
  );
}
