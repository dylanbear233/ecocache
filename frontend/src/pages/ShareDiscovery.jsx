import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ShareDiscovery() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

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

        // empty the form fields
        setTitle("");
        setContent("");
        setImage(null);

        // jump to the dashboard page after 1 second
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
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
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button type="submit">Submit</button>
        <p>{message}</p>
      </form>
    </div>
  );
}
