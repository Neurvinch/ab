import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherTimetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // States for editing an existing entry
  const [editingEntry, setEditingEntry] = useState(null);
  const [editForm, setEditForm] = useState({
    day: '',
    period: '',
    classRoom: '',
    subject: ''
  });
  // States for creating a new entry
  const [createMode, setCreateMode] = useState(false);
  const [newEntry, setNewEntry] = useState({
    day: '',
    period: '',
    classRoom: '',
    subject: ''
  });




  const handleEditClick = (entry) => {
    setEditingEntry(entry._id);
    setEditForm({
      day: entry.day,
      period: entry.period,
      classRoom: entry.classRoom,
      subject: entry.subject,
    });
  };

  const handleEditChange = (field, value) => {
    setEditForm({ ...editForm, [field]: value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      // In this example, the update endpoint uses a PUT without ID.
      // If your update endpoint requires an ID, consider using an endpoint like `/api/updateTimetable/:id`
      const res = await axios.put(
        'http://localhost:5000/api/updateTimetable',
        {
          ...editForm,
          // You may include an identifier if your endpoint needs it
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        alert('Timetable updated successfully');
        setEditingEntry(null);
        
      } else {
        alert('Failed to update timetable');
      }
    } catch (err) {
      console.error('Error updating timetable:', err);
      alert('Error updating timetable');
    }
  };

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/api/createTimeTable',
        newEntry,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            client: 'not browser',
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        alert('Timetable entry created successfully');
        setCreateMode(false);
        setNewEntry({
          day: '',
          period: '',
          classRoom: '',
          subject: ''
        });
        
      } else {
        alert('Failed to create timetable entry');
      }
    } catch (err) {
      console.error('Error creating timetable:', err);
      alert('Error creating timetable');
    }
  };

  return (
    <div>
      <h1>Teacher / HOD Timetable Management</h1>
      {loading ? (
        <p>Loading timetable...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div>
          <h2>Current Timetable Entries</h2>
          {timetable.length > 0 ? (
            timetable.map((entry) => (
              <div key={entry._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                <p>
                  <strong>Day:</strong> {entry.day} | <strong>Period:</strong> {entry.period} | <strong>Subject:</strong> {entry.subject} | <strong>Classroom:</strong> {entry.classRoom}
                </p>
                <button onClick={() => handleEditClick(entry)}>Edit</button>
              </div>
            ))
          ) : (
            <p>No timetable entries found.</p>
          )}
          
          {editingEntry && (
            <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #000' }}>
              <h3>Edit Timetable Entry</h3>
              <label>Day: </label>
              <input
                type="text"
                value={editForm.day}
                onChange={(e) => handleEditChange('day', e.target.value)}
              />
              <br />
              <label>Period: </label>
              <input
                type="number"
                value={editForm.period}
                onChange={(e) => handleEditChange('period', e.target.value)}
              />
              <br />
              <label>Classroom: </label>
              <input
                type="text"
                value={editForm.classRoom}
                onChange={(e) => handleEditChange('classRoom', e.target.value)}
              />
              <br />
              <label>Subject: </label>
              <input
                type="text"
                value={editForm.subject}
                onChange={(e) => handleEditChange('subject', e.target.value)}
              />
              <br />
              <button onClick={handleUpdate}>Save Changes</button>
              <button onClick={() => setEditingEntry(null)}>Cancel</button>
            </div>
          )}

          {!createMode ? (
            <button onClick={() => setCreateMode(true)}>Create New Timetable Entry</button>
          ) : (
            <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #000' }}>
              <h3>Create Timetable Entry</h3>
              <label>Day: </label>
              <input
                type="text"
                value={newEntry.day}
                onChange={(e) => setNewEntry({ ...newEntry, day: e.target.value })}
              />
              <br />
              <label>Period: </label>
              <input
                type="number"
                value={newEntry.period}
                onChange={(e) => setNewEntry({ ...newEntry, period: e.target.value })}
              />
              <br />
              <label>Classroom: </label>
              <input
                type="text"
                value={newEntry.classRoom}
                onChange={(e) => setNewEntry({ ...newEntry, classRoom: e.target.value })}
              />
              <br />
              <label>Subject: </label>
              <input
                type="text"
                value={newEntry.subject}
                onChange={(e) => setNewEntry({ ...newEntry, subject: e.target.value })}
              />
              <br />
              <button onClick={handleCreate}>Create Entry</button>
              <button onClick={() => setCreateMode(false)}>Cancel</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherTimetable;
