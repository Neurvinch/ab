import React, { useState } from 'react'
 import axios from 'axios';

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
    <div>
      <h1>Upload Internal Marks</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {marksData.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
            <label>Roll No:</label>
            <input
              type="text"
              value={item.rollNo}
              onChange={(e) => handleChange(index, 'rollNo', e.target.value)}
              required
            />
            <label>Subject:</label>
            <input
              type="text"
              value={item.subject}
              onChange={(e) => handleChange(index, 'subject', e.target.value)}
              required
            />
            <label>Marks:</label>
            <input
              type="number"
              value={item.marks}
              onChange={(e) => handleChange(index, 'marks', e.target.value)}
              required
            />
            {marksData.length > 1 && (
              <button type="button" onClick={() => removeRow(index)}>Remove</button>
            )}
          </div>
        ))}
        <button type="button" onClick={addRow}>Add Row</button>
        <br />
        <button type="submit">Upload Marks</button>
      </form>
    </div>
  )
}

export default InternalMarkUpload
