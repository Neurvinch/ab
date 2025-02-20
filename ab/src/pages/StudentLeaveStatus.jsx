import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentLeaveStatus.css'
const StudentLeaveStatus = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch leave requests for the student
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/leaveRequest/student', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      if (res.data.success) {
        setRequests(res.data.data || []);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error("Error fetching leave requests:", err);
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <p>Loading your leave requests...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="leave-requests-container">
  <h1>Your Leave/OD Requests</h1>
  {requests.length === 0 ? (
    <p className="leave-empty-message">You have not submitted any leave/OD requests.</p>
  ) : (
    requests.map((req) => (
      <div key={req._id} className="leave-request-card">
        <p><strong>Type:</strong> {req.type}</p>
        <p><strong>Reason:</strong> {req.reason}</p>
        <p>
          <strong>Status:</strong> 
          <span className={`leave-status ${req.status.toLowerCase()}`}> {req.status}</span>
        </p>
        <p><strong>Submitted on:</strong> {new Date(req.createdAt).toLocaleDateString()}</p>
      </div>
    ))
  )}
</div>
  );
};

export default StudentLeaveStatus;
