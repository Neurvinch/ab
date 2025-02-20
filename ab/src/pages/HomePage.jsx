import { useState } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import logo from '../assets/logo.png';
import hi1 from '../assets/highsc1.png';

function HomePage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    
    return (
        <div className="homepage">
            <header>
                <img src={logo} alt="Logo" />
                
                <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>
                
                <nav className={menuOpen ? "open" : ""}>
                    <button onClick={() => navigate('/')}>Home</button>
                    <button onClick={() => navigate('/about')}>About</button>
                    <button onClick={() => navigate('/contact')}>Contact</button>
                    <a href="https://facebook.com"><FaFacebook size={20} /></a>
                    <a href="https://instagram.com"><FaInstagram size={20} /></a>
                    <a href="https://linkedin.com"><FaLinkedin size={20} /></a>
                </nav>
            </header>
            
            <main>
                <div className="text-container">
                    <h1>Welcome to AttendEase!</h1>
                    <p>Your friendly college attendance tracker</p>
                    <p>Say hello to stress-free tracking and organizing attendance is quick, easy, and fun.
                        Whether youre a student or a professor, we got you covered with smart tools and a delightful experience.
                    </p>
                    <button className="signin-button" onClick={() => navigate('/signup')}>Sign In</button>
                </div>
                <img src={hi1} alt="Illustration" className="main-image" />
            </main>
        </div>
    );
}

export default HomePage;
