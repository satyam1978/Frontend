import React from 'react';
import './Home.css'; // Move styles to a CSS file
import studyImg from './assets/study.png'; // Make sure the image is placed in the correct folder

const Home = () => {
  return (
    <>
      <header>
        <div className="container">
          {/* <nav>
            <div className="logo">Team SAGA</div>
            <ul className="menu">
              <li><a href="#">Home</a></li>
              <li><a href="About.js">About</a></li>
              <li><a href="#">Study Planner</a></li>
              <li><a href="#">Testimonial</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </nav> */}
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h2 className="welcome-title">Welcome to Study Planner 📚</h2>
            <p className="welcome-text">
              Organize your study routine, track your subjects and topics, and manage your daily study hours efficiently. Your academic success starts here!
            </p>
            <div className="buttons">
              <a href="./StudyPlanner" className="btn btn-primary">Get Started</a>
            </div>
            <div className="stats">
              <div className="stat-item">
                <div className="stat-number">5+</div>
                <div className="stat-text">Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">20+</div>
                <div className="stat-text">User Registered</div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="circle-outline"></div>
          <img src={studyImg} alt="Study" />
        </div>
      </section>

      <footer>
        {/* <div className="foot">
          <p>&copy; 2025 Team SAGA. All rights reserved.</p>
        </div> */}
      </footer>
    </>
  );
};

export default Home;
