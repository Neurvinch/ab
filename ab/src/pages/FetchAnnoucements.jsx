import { useEffect, useState } from 'react';
import axios from 'axios';
import './FetchAnno.css'
const FetchAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      // Updated URL to match your backend route
      const res = await axios.get('http://localhost:5000/api/announcements', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (res.data.success) {
        setAnnouncements(res.data.data || []);
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="announcements-container">
  <h1>Announcements</h1>
  {loading ? (
    <p>Loading announcements...</p>
  ) : error ? (
    <p style={{ color: 'red' }}>{error}</p>
  ) : announcements.length === 0 ? (
    <p>No announcements available.</p>
  ) : (
    announcements.map((announcement) => (
      <div key={announcement._id} className="announcement-box">
        <h2>{announcement.title}</h2>
        <p>{announcement.content}</p>
        <p className="announcement-date">
          Posted on: {new Date(announcement.createdAt).toLocaleDateString()}
        </p>
      </div>
    ))
  )}
</div>

  );
};

export default FetchAnnouncements;
