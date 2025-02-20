import axios from 'axios';
import React, { useState } from 'react'
import './StudentLeaveRequest.css'
const StudentLeaveRequest = () => {
    const [type, setType] = useState("Leave");
    const [reason ,setReason] = useState("");
    const[rollNo , setRollNo] = useState("");
    const [message , setMessage] = useState("");
         
    const handlesubmit = async(e) =>{
        e.preventDefault();
        try {const token = localStorage.getItem('token');
          if (!token) {
              setError("No authentication token found. Please log in.");
              setLoading(false);
              return;
          }
            const res = await axios.post("http://localhost:5000/api/leaveRequest",
                {rollNo,type,reason ,},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        client: "not browser"
                    },
                    withCredentials: true
                }
            )
            console.log("API Response:", res.data);

            if(res.data.success){
                setMessage("Leave request submitted successfully");
                setReason("");
            } else{
                setMessage("Error submitting leave request");
            }

            
        } catch (error) {
            console.log(error);
            setMessage("Error submitting leave request");
        }
    }


  return (
    <div className="leave-request-container">
  <h1> Leave/OD Request </h1>
  {message && <p>{message}</p>}
  <form onSubmit={handlesubmit}>
    <input
      type="number"
      value={rollNo}
      placeholder="Roll No"
      onChange={(e) => setRollNo(e.target.value)}
      required
    />
    <div>
      <label>Type:</label>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Leave">Leave</option>
        <option value="OD">OD</option>
      </select>
    </div>
    <div>
      <label>Reason:</label>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        required
      />
    </div>
    <button type="submit">Submit Request</button>
  </form>
  <a href='/leaveStatus'>Know your Status</a>
</div>

  )
}

export default StudentLeaveRequest