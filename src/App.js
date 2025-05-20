import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

// Component imports
import Home from './components/Home';
import About from './components/About';
import StudyForm from './components/StudyForm';
import Testimonial from './components/Testimonial';
import Contact from './components/Contact';

const App = () => {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/message')
      .then(res => res.json())
      .then(data => setMsg(data.msg))
      .catch(err => console.error('Error fetching message:', err));
  }, []);

  return (
    <Router>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #6471e6, #74744e)',
        color: '#fcfbfb',
        fontFamily: 'Arial, sans-serif',
      }}>
        {/* Header/Nav */}
        <header style={{ padding: '20px', background: 'transparent' }}>
          <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e67e22' }}>Team SAGA</div>
            <ul style={{ display: 'flex', listStyle: 'none', gap: '30px', margin: 0, padding: 0 }}>
              {['/', '/about', '/studyplanner', '/testimonial', '/contact'].map((path, idx) => {
                const names = ['Home', 'About', 'Study Planner', 'Testimonial', 'Contact'];
                return (
                  <li key={idx}>
                    <NavLink
                      to={path}
                      style={({ isActive }) => ({
                        color: isActive ? '#e67e22' : '#fcf9f9',
                        fontWeight: '500',
                        textDecoration: 'none',
                      })}
                    >
                      {names[idx]}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </header>

        {/* Backend message just below header */}
        {msg && (
          <div style={{ textAlign: 'center', padding: '10px', backgroundColor: '#222', color: '#f1c40f', fontWeight: 'bold' }}>
            Backend says: {msg}
          </div>
        )}

        {/* Main content */}
        <main style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/studyplanner" element={<StudyForm />} />
            <Route path="/testimonial" element={<Testimonial />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer style={{ backgroundColor: '#333', color: '#fff', textAlign: 'center', padding: '20px 0' }}>
          <p style={{ margin: 0 }}>Made with ❤️ by Team SAGA</p>
          <p>&copy; 2025 Team SAGA. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
