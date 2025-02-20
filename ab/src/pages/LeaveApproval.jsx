import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaveApproval = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get("http://localhost:5000/api/leaveRequestadmin", {
        headers: {
          Authorization: `Bearer ${token}`,
          client: "not browser"
        },
        withCredentials: true
      });
      console.log("Response from leaveRequestadmin:", res.data);
      if (res.data.success) {
        // Use res.data.data (not res.data.requests) as per our backend response
        setRequests(res.data.data || []);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleUpdatedStatus = async (rollNo, status) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.patch(
        `http://localhost:5000/api/leaverequest/${rollNo}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            client: "not browser"
          },
          withCredentials: true
        }
      );
      if (res.data.success) {
        alert("Status updated successfully");
        fetchRequests();
      } else {
        alert("Failed to update status");
        setError(res.data.message);
      }
    } catch (err) {
      console.error("Error updating request:", err);
      setError(err.message);
      alert("Failed to update status");
    }
  };

  return (
    <div>
      <h1>Leave/OD Approvals</h1>
      {loading ? (
        <p>Loading requests...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (requests.length === 0) ? (
        <p>No leave/OD requests found.</p>
      ) : (
        requests.map((req) => (
          <div key={req._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <p>
              <strong>Student Roll No:</strong> {req.rollNo}
            </p>
            <p>
              <strong>Type:</strong> {req.type} | <strong>Reason:</strong> {req.reason}
            </p>
            <p>
              <strong>Status:</strong> {req.status}
            </p>
            {req.status === "Pending" && (
              <div>
                <button onClick={() => handleUpdatedStatus(req.rollNo, "approved")}>Approve</button>
<button onClick={() => handleUpdatedStatus(req.rollNo, "rejected")}>Reject</button>

              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default LeaveApproval;
