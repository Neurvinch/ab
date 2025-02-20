import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Navbar = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.roles); // Ensure your token payload has a "roles" property
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const renderLinks = () => {
    if (role === 'student') {
      return (
        <>
          <Link to="/dashboard" style={styles.link}>Dashboard</Link>
          <Link to="/profile" style={styles.link}>Profile</Link>
          <Link to="/Annoucements" style={styles.link}>Announcements</Link>
          <Link to="/MarksView" style={styles.link}>Internal Marks</Link>
          <Link to="/leaveRequest" style={styles.link}>Leave/OD Request</Link>
        </>
      );
    } else if (role === 'staff') {
      return (
        <>
          <Link to="/dashboard" style={styles.link}>Dashboard</Link>
          <Link to="/profile" style={styles.link}>Profile</Link>
          <Link to="/announcements" style={styles.link}>Announcements</Link>
          <Link to="/uploadMarks" style={styles.link}>Internal Marks Upload</Link>
          <Link to="/leaveRequestAdmin" style={styles.link}>Leave/OD Approvals</Link>
        </>
      );
    } else if (role === 'hod') {
      return (
        <>
          <Link to="/dashboard" style={styles.link}>Dashboard</Link>
          <Link to="/profile" style={styles.link}>Profile</Link>
          <Link to="/AnnoucementsCreation" style={styles.link}>Announcements</Link>
          <Link to="/timetable-management" style={styles.link}>Timetable Management</Link>
          <Link to="/leaveRequestAdmin" style={styles.link}>Leave/OD Approvals</Link>
        </>
      );
    } else {
      // If role isn't loaded or token is missing
      return (
        <>
          <Link to="/dashboard" style={styles.link}>Dashboard</Link>
          <Link to="/profile" style={styles.link}>Profile</Link>
        </>
      );
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.leftSection}>
        {renderLinks()}
      </div>
      <div style={styles.rightSection}>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#333',
    padding: '1rem',
    color: 'white'
  },
  leftSection: {
    display: 'flex',
    gap: '1rem'
  },
  rightSection: {},
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  logoutButton: {
    background: 'red',
    border: 'none',
    color: 'white',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontSize: '1rem'
  }
};

export default Navbar;
