import { useEffect, useState } from 'react'
import axios from 'axios'
const FetchAnnoucements = () => {
    const [announcements, setAnnouncements] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchAnnoucements = async () =>{
        setLoading(true);
        try {
            const token = localStorage.getItem('token')
            const res = await axios.get('http://localhost:5000/announcements',{
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            } );

            if(res.data.success){
                setAnnouncements(res.data.data || [])
            } else{
                setError(res.data.message)
            }
            
        } catch (error) {
             setError(error.message)
        }
        setLoading(false);
    }
        

    useEffect( () =>{
         fetchAnnoucements()
    },[])
  return (
    <div><h1>Announcements</h1>
    {loading ? (
      <p>Loading announcements...</p>
    ) : error ? (
      <p style={{ color: 'red' }}>{error}</p>
    ) : announcements.length === 0 ? (
      <p>No announcements available.</p>
    ) : (
      announcements.map((announcement) => (
        <div key={announcement._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <h2>{announcement.title}</h2>
          <p>{announcement.content}</p>
          <p style={{ fontSize: '0.8em' }}>
            Posted on: {new Date(announcement.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))
    )}</div>
  )
}

export default FetchAnnoucements