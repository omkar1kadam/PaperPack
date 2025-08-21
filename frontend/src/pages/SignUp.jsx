import React from "react";
import { Link } from "react-router-dom";
import "../style.css"; // Import your CSS

const SignUp = () => {
  return (
    <div className="signup-page">
      {/* LEFT: Slideshow */}
      <div className="signup-slideshow-section">
        <div className="signup-slides">
          <img src="/images/Sign_in_img1.webp" alt="Slide 1" />
          <img src="/images/Sign_in_img2.webp" alt="Slide 2" />
          <img src="/images/Sign_in_img3.webp" alt="Slide 3" />
          <img src="/images/Sign_in_img4.webp" alt="Slide 4" />
          <img src="/images/Sign_in_img5.webp" alt="Slide 5" />
          <img src="/images/Sign_in_img6.webp" alt="Slide 6" />
          <img src="/images/Sign_in_img7.webp" alt="Slide 7" />
          <img src="/images/Sign_in_img8.webp" alt="Slide 8" />
        </div>
      </div>

      {/* RIGHT: Sign Up Form */}
      <div className="signup-form-section">
        <div className="signup-box">
          <div className="signup-header">
            <Link to="/home">
              <img
                src="/images/Final_logo.png"
                alt="PaperPack Logo"
                className="signup-logo"
              />
            </Link>
            <h2>Create an account with PaperPack</h2>
          </div>

          <form className="signup-form-group">
            <input
              type="text"
              className="signup-input"
              placeholder="Full Name"
              required
            />
            <input
              type="email"
              className="signup-input"
              placeholder="Email"
              required
            />

            <div className="signup-otp-row signup-form-group">
              <input
                type="text"
                className="signup-input"
                placeholder="Enter OTP"
              />
              <button type="button" className="signup-btn">
                Get OTP
              </button>
            </div>

            <input
              type="password"
              className="signup-input"
              placeholder="Password"
              required
            />
            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </form>

          <div className="signup-switch">
            Already have an account? <Link to="/sign-in">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
