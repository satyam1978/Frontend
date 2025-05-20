import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('https://study-planner-r7qw.onrender.com/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });

    const data = await response.json();
    alert(data.msg); // Flask se message dikhana

    // Reset form
    setForm({ name: '', email: '', message: '' });
  } catch (error) {
    console.error('Error sending contact form:', error);
    alert('Something went wrong. Please try again later.');
  }
};


  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📬 Contact Us</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Name:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter your name"
          required
        />

        <label style={styles.label}>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter your email"
          required
        />

        <label style={styles.label}>Message:</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          style={{ ...styles.input, height: '100px', resize: 'vertical' }}
          placeholder="Write your message..."
          required
        />

        <button type="submit" style={styles.button}>Send Message</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
    color: '#fff',
    fontFamily: 'Arial, sans-serif'
  },
  heading: {
    textAlign: 'center',
    color: '#e67e22',
    marginBottom: '25px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '6px',
    fontWeight: 'bold',
    color: '#eee',
  },
  input: {
    marginBottom: '20px',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    outline: 'none',
  },
  button: {
    padding: '12px',
    backgroundColor: '#e67e22',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
  }
};

export default Contact;
