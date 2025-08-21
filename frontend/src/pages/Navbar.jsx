import React from "react";
import { Link } from "react-router-dom";
import "../style.css"; // Import your CSS

const Navbar = () => {
  return (
    <nav>
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <img src="/images/Final_logo.png" alt="PaperPack Logo" />
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/feedback">Feedback</Link>
        </li>
      </ul>

      {/* Auth Buttons */}
      <div className="auth-buttons">
        <Link to="/sign-in" className="btn">
          Sign In
        </Link>
        <Link to="/sign-up" className="btn">
          Sign Up
        </Link>
        <Link to="/sign-up" className="btn">
          Log Out
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
