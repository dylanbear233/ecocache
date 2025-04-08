import { useEffect, useState } from "react";

export default function DiscoveryList() {
  const [discoveries, setDiscoveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("https://ecocache-backend.onrender.com/api/discoveries/my/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setDiscoveries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching discoveries:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="discovery-list">
      <h3>Your Shared Discoveries</h3>
      {loading ? (
        <p>Loading...</p>
      ) : discoveries.length === 0 ? (
        <p>No discoveries shared yet.</p>
      ) : (
        discoveries.map((item) => (
          <div key={item.id} className="discovery-item">
            <h4>{item.title}</h4>
            <p>{item.content}</p>
            {item.image_url && (
              <img src={item.image_url} alt={item.title} className="discovery-image" />
            )}
            <p className="meta">Published at: {new Date(item.created_at).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}
