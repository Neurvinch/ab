import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import'./Profile.css'
const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
        email: '',
        roles: '',
        department: '',
        classRoom: '',
        rollNo: '' // Added rollNo to match API call
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // Set initial loading state

    useEffect(() => {
      const fetchData = async () => {
          try {
              const token = localStorage.getItem('token');
              if (!token) {
                  setError("No authentication token found. Please log in.");
                  setLoading(false);
                  return;
              }
  
              const res = await axios.get("http://localhost:5000/api/profile", {
                  headers: {
                      Authorization: `Bearer ${token}`,
                      client: "not browser"
                  },
                  withCredentials: true
              });
  
              console.log("API Response:", res.data);
  
              if (res.data.success && res.data.data) {
                  setUser(res.data.data);
                  setFormData({
                      email: res.data.data.email || '',
                      roles: Array.isArray(res.data.data.roles) ? res.data.data.roles.join(', ') : res.data.data.roles || '',
                      department: res.data.data.department || '',
                      classRoom: res.data.data.classRoom || '',
                      rollNo: Number(res.data.data.rollNo) || 0
                  });
              } else {
                  setError(res.data?.message || "User data not found");
              }
          } catch (error) {
              console.log("Fetch Error:", error);
              setError(error.message);
          } finally {
              setLoading(false);
          }
      };
  
      fetchData();
  }, []);
  
  

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.patch(`http://localhost:5000/api/updateprofile/${formData.rollNo}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    client: "not browser"
                },
                withCredentials: true
            });

            if (res.data.success) {
                alert("Profile updated successfully");
                navigate("/dashboard");
            } else {
                setError(res.data.message);
                alert("Failed to update profile");
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
            alert("Profile not updated");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="profile-container">
  <h1>Profile</h1>
  <form onSubmit={handleSubmit} className="profile-form">
    <div className="profile-field">
      <label className="profile-label">Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="profile-input"
      />
    </div>

    <div className="profile-field">
      <label className="profile-label">Role:</label>
      <input
        type="text"
        name="roles"
        value={formData.roles}
        onChange={handleChange}
        required
        className="profile-input"
      />
    </div>

    <div className="profile-field">
      <label className="profile-label">Department:</label>
      <input
        type="text"
        name="department"
        value={formData.department}
        onChange={handleChange}
        className="profile-input"
      />
    </div>

    <div className="profile-field">
      <label className="profile-label">Class Room:</label>
      <input
        type="text"
        name="classRoom"
        value={formData.classRoom}
        onChange={handleChange}
        className="profile-input"
      />
    </div>

    <button type="submit" className="profile-button">Update Profile</button>
  </form>
</div>

    );
};

export default Profile;
