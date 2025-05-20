import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Aisha Khan",
    role: "Student",
    message: "Team SAGA's Study Planner helped me organize my study schedule perfectly!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Raj Patel",
    role: "Software Engineer",
    message: "Love the clean design and easy-to-use features. Highly recommend SAGA!",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
  },
  {
    id: 3,
    name: "Meera Singh",
    role: "College Student",
    message: "The reminders and notes keep me on track. Great job and thank you, Team SAGA!",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const Testimonial = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const { name, role, message, image } = testimonials[index];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>What People Say</h2>

      <div style={{ ...styles.card, animation: 'fadeIn 0.6s ease-in-out' }}>
        <img src={image} alt={name} style={styles.image} />
        <div>
          <h3 style={styles.name}>{name}</h3>
          <p style={styles.role}>{role}</p>
          <p style={styles.message}>"{message}"</p>
        </div>
      </div>

      <div style={styles.dots}>
        {testimonials.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            style={{
              ...styles.dot,
              backgroundColor: i === index ? '#e67e22' : '#ccc',
            }}
          />
        ))}
      </div>

      {/* Fade animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '700px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  heading: {
    color: '#e67e22',
    marginBottom: '30px',
    fontSize: '1.8rem',
  },
  card: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    transition: 'opacity 0.5s ease-in-out',
  },
  image: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  name: {
    margin: '0 0 5px 0',
    fontSize: '1.2rem',
  },
  role: {
    margin: '0 0 10px 0',
    fontSize: '0.95rem',
    fontStyle: 'italic',
    color: '#ddd',
  },
  message: {
    fontSize: '1rem',
    lineHeight: 1.5,
    margin: '0 auto',
    maxWidth: '500px',
  },
  dots: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  dot: {
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    backgroundColor: '#ccc',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Testimonial;
