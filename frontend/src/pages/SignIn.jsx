import React, { useState } from "react";
import "../style.css"; // Import your CSS file

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:2402/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Store token or user info in localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // alert("Login successful!");
      // ✅ Redirect to dashboard or homepage
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      {/* Left Side (Form Section) */}
      <div className="signup-form-section">
        <div className="signup-box">
          <div className="signup-header">
            <a href="/home">
              <img
                src="/images/Final_logo.png"
                alt="PaperPack Logo"
                className="signup-logo"
              />
            </a>
            <h2>Sign In to PaperPack</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="signup-form-group">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="signup-form-group">
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="signup-switch">
            Don’t have an account? <a href="/sign-up">Sign Up</a>
          </div>
        </div>
      </div>

      {/* Right Side (Slideshow Section) */}
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
    </div>
  );
};

export default SignIn;
