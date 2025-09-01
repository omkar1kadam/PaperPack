import React from "react";
import "../style.css"; // Import your CSS
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token
    localStorage.removeItem("token");

    // Redirect to home
    navigate("/");
  };
  const handlesignin = () => {
    navigate("/sign-in");
  };
  const handlesignup = () => {
    navigate("sign-up");
  };

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
        {/* <Link to="/sign-in" className="btn">
          Sign In
        </Link>
        <Link to="/sign-up" className="btn">
          Sign Up
        </Link> */}
        <button onClick={handlesignin} className="btn">
          Sign In
        </button>
        <button onClick={handlesignup} className="btn">
          Sign Up
        </button>

        {/* Proper Log Out button */}
        <button onClick={handleLogout} className="btn">
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
