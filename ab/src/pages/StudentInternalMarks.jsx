import React, { useState, useEffect } from 'react';
import axios from 'axios';
import'./InternalMarks.css'
const StudentInternalMarks = () => {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMarks = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      console.log("Fetching marks with token:", token);
      const res = await axios.get("http://localhost:5000/api/internal-marks/student", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      console.log("Response from internal marks endpoint:", res.data);
      if (res.data.success) {
        setMarks(res.data.data || []);
      } else {
        setError(res.data.message || "Unknown error occurred.");
      }
    } catch (err) {
      console.error("Error fetching internal marks:", err);
      setError(err.response?.data?.message || err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMarks();
  }, []);

  return (
    <div className="internal-marks-container">
  <h1>Your Internal Marks</h1>
  {loading ? (
    <p className="internal-loading">Loading internal marks...</p>
  ) : error ? (
    <p className="internal-error">{error}</p>
  ) : marks.length === 0 ? (
    <p className="internal-empty">No internal marks found.</p>
  ) : (
    marks.map((mark) => (
      <div key={mark._id} className="internal-marks-card">
        <p><strong>Subject:</strong> {mark.subject}</p>
        <p><strong>Marks:</strong> {mark.marks}</p>
        <p><strong>Exam Date:</strong> {new Date(mark.examDate).toLocaleDateString()}</p>
      </div>
    ))
  )}
</div>

  );
};

export default StudentInternalMarks;
