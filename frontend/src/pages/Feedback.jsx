import React from "react";
import "../style.css"; // Import your CSS file

const Feedback = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted!");
    // Here you can handle the form data submission logic
  };

  return (
    <div className="feedback-container">
      {/* Feedback Box */}
      <div className="feedback-box">
        
        {/* Left Side: Form */}
        <div className="form-section">
          <h2>We value your feedback 💬</h2>
          <p>Help us improve by sharing your thoughts.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" placeholder="Enter your name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" placeholder="Enter your email" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Feedback</label>
              <textarea id="message" rows="5" placeholder="Write your feedback here..." required></textarea>
            </div>

            <button type="submit">Submit Feedback</button>
          </form>
        </div>

        {/* Right Side: Image */}
        <div className="image-section">
          <img src="/images/Feedbackimg2.webp" alt="PaperPack Feedback" />
        </div>
      </div>
    </div>
  );
};

export default Feedback;
