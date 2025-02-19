import React, { useState, useEffect } from 'react'
import axios from 'axios'

const LeaveApproval = () => {
    const [requests, setRequests] = useState([]);
    const [loading , setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRequests = async() =>{
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get("http://localhost:5000/api/leaveRequestadmin" , 
              {
                headers:{
                  Authorization : `Bearer ${token}` ,
                  client : "not browser"
                },
                withCredentials : true
              }
            )
            if(res.data.success){
                setRequests(res.data.requests);
            } else{
                setError(res.data.message);
            }
            
        } catch (error) {
            console.log(error);
            setError(error.message);
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchRequests();
    },[]);

      const handleUpdatedStatus = async ( status) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(`http://localhost:5000/api//leaverequest/{rollNo}`, 
                {status},
                {
                    headers: {
                        Authorization : `Bearer ${token}` ,
                        client : "not browser"
                    },
                    withCredentials : true
                    }
            )
            if(res.data.success){
                fetchRequests();
                alert("Status updated successfully");
            } else{ 
                alert("Failed to update status");
                setError(res.data.message);}
           
            
        } catch (error) {
            console.log(error);
            setError(error.message);
            alert("Failed to update status");

        }
      }

  return (
    <div>
         <h1>Leave/OD Approvals</h1>
      {loading ? (
        <p>Loading requests...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : requests.length === 0 ? (
        <p>No leave/OD requests found.</p>
      ) : (
        requests.map((req) => (
          <div key={req._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <p>
              <strong>Student:</strong> {req.studentId.rollNo} - {req.studentId.email}
            </p>
            <p>
              <strong>Type:</strong> {req.type} | <strong>Reason:</strong> {req.reason}
            </p>
            <p>
              <strong>Status:</strong> {req.status}
            </p>
            {req.status === "Pending" && (
              <div>
                <button onClick={() => handleUpdatedStatus(req.rollNo, "Approved")}>Approve</button>
                <button onClick={() => handleUpdatedStatus(req.rollNo, "Rejected")}>Reject</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default LeaveApproval