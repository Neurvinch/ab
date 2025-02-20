import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentInternalMarks = () => {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMarks = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get("http://localhost:5000/api/internal-marks/student", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      if (res.data.success) {
        setMarks(res.data.data || []);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error("Error fetching internal marks:", err);
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMarks();
  }, []);

  return (
    <div>
      <h1>Your Internal Marks</h1>
      {loading ? (
        <p>Loading internal marks...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : marks.length === 0 ? (
        <p>No internal marks found.</p>
      ) : (
        marks.map((mark) => (
          <div key={mark._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
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
