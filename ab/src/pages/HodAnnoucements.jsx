import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AnnouncementCreation = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/api/annoucementsadmin',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setMessage("Announcement created successfully");
        // Optionally, redirect to the announcements page
        // navigate('/announcements');
      } else {
        setError(res.data.message || "Failed to create announcement");
      }
    } catch (err) {
      console.error("Error creating announcement:", err);
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h1>Create Announcement</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea 
            name="content" 
            value={formData.content} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit">Create Announcement</button>
      </form>
    </div>
  );
};

export default AnnouncementCreation;
