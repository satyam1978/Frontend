import React from "react";

function About() {
  return (
    <div style={{ 
      padding: "40px", 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center", 
      alignItems: "center", 
      textAlign: "center", 
      minHeight: "100vh", 
        backgroundColor: "rgba(51, 51, 51, 0.3)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
         borderRadius: "12px",
         
      color: "#fff"
    }}>
      <h2 style={{ color: "#e67e22" }}>About SAGA</h2>
      
      <p style={{ maxWidth: "600px", fontSize: "1.2rem", marginTop: "20px",  lineHeight: "1.6" }}>
        " We are Satyam and Gaurav, a dedicated team named SAGA. Our goal is to
        create smart and efficient solutions to help students manage their time
        and studies better. For this hackathon, we developed a Study Planner
        that helps organize tasks, set reminders, and track progress to boost
        productivity and make learning easier. We believe in combining
        technology with simple design to make studying more effective and
        stress-free."
      </p>
    </div>
  );
}

export default About;

// This code defines a simple "About" page for a React application.

