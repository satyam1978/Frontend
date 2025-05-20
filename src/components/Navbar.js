import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-amber-500 text-3xl font-bold">Portfolio</Link>
        
        <div className="hidden md:flex space-x-6">
          {/* <Link to="/" className="text-white hover:text-amber-500 transition duration-300">
            Home
          </Link>
          <Link to="/about" className="text-white hover:text-amber-500 transition duration-300">
            About
          </Link>
          <Link to="/services" className="text-white hover:text-amber-500 transition duration-300">
            Service
          </Link>
          <Link to="/project" className="text-white hover:text-amber-500 transition duration-300">
            Project
          </Link>
          <Link to="/testimonial" className="text-white hover:text-amber-500 transition duration-300">
            Testimonial
          </Link>
          <Link to="/contact" className="text-white hover:text-amber-500 transition duration-300">
            Contact Us
          </Link>
          <Link to="/study-planner" className="text-amber-500 hover:text-amber-400 transition duration-300">
            Study Planner
          </Link> */}
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;