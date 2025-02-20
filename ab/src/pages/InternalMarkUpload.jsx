import React, { useState } from 'react'
 import axios from 'axios';
import './Internal.css'
const InternalMarkUpload = () => {
    const [marksData, setMarksData] = useState([{ rollNo: '', subject: '', marks: '' }]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
     

    const handleChange = (index,field,value) =>{
        const updatedData = [...marksData];
        updatedData[index][field] = value;
        setMarksData(updatedData);
    };

    const addRow = () =>{
        setMarksData([...marksData,{rollNo:'',subject:'',marks:''}]);
        };
       
        const removeRow = () =>{
            const updatedData = marksData.filter((_, i) => i !== index  );
            setMarksData(updatedData);
        }

        const handleSubmit = async (e) => {
            e.preventDefault();
            setMessage('');
            setError('');
            try {
              const token = localStorage.getItem('token');
              const res = await axios.post(
                "http://localhost:5000/api/internal-marks/upload",
                { marksData },
                {
                  headers: { Authorization: `Bearer ${token}` },
                  withCredentials: true,
                }
              );
              if (res.data.success) {
                setMessage("Internal marks uploaded successfully");
                setMarksData([{ rollNo: '', subject: '', marks: '' }]);
              } else {
                setError(res.data.message);
              }
            } catch (err) {
              console.error("Error uploading internal marks:", err);
              setError(err.message);
            }
        



    }
  
    return (
      <div className="marks-container">
      <h1>Upload Internal Marks</h1>
      {message && <p className="message-success">{message}</p>}
      {error && <p className="message-error">{error}</p>}
      <form onSubmit={handleSubmit} className="marks-form">
        {marksData.map((item, index) => (
          <div key={index} className="marks-row">
            <label className="marks-label">Roll No:</label>
            <input
              type="text"
              value={item.rollNo}
              onChange={(e) => handleChange(index, 'rollNo', e.target.value)}
              required
              className="marks-input"
            />
    
            <label className="marks-label">Subject:</label>
            <input
              type="text"
              value={item.subject}
              onChange={(e) => handleChange(index, 'subject', e.target.value)}
              required
              className="marks-input"
            />
    
            <label className="marks-label">Marks:</label>
            <input
              type="number"
              value={item.marks}
              onChange={(e) => handleChange(index, 'marks', e.target.value)}
              required
              className="marks-input"
            />
    
            {marksData.length > 1 && (
              <button type="button" className="remove-button" onClick={() => removeRow(index)}>Remove</button>
            )}
          </div>
        ))}
    
        <button type="button" className="marks-button" onClick={addRow}>Add Row</button>
        <br />
        <button type="submit" className="marks-button">Upload Marks</button>
      </form>
    </div>
    
  )
}

export default InternalMarkUpload
