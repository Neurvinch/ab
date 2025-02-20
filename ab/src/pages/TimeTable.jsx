import axios from 'axios';
import React, { useState } from 'react'
   
const TimeTable = () => {
  const [timeTable, setTimeTable] = useState([]);
      
  const fetchTimeTable = async () =>{
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get("http://localhost:5000/api/getTimeTable" , 
        {
          headers:{
            Authorization : `Bearer ${token}`,
            client : "not browser"
          },
          withCredentials : true
        }
      )
      
      if(res.data.success){
 setTimeTable(res.data.timeTable);
      }else{
        console.log(res.data.message);
      }
      
    } catch (error) {
      console.log(error);

    }
    
  }
return (
  <div>
    {timeTable.length > 0 ? (
      timeTable.map((entry) => (
        <div key={entry._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <p>
            <strong>Day:</strong> {entry.day} | 
            <strong>Period:</strong> {entry.period} | 
            <strong>Subject:</strong> {entry.subject} | 
            <strong>Classroom:</strong> {entry.classRoom}
          </p>
        </div>
      ))
    ) : (
      <p>No timetable entries found.</p>
    )}
  </div>
)
