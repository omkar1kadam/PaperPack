import React from "react";

import "../style.css";

const Home = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>
            Welcome to <span>PaperPack</span>
          </h1>
          <p>
            Innovating sustainable cardboard and packaging solutions with a
            modern tech touch.
          </p>
          <a href="/sign-in">Get Started</a>
        </div>
        <div className="hero-image">
          <img src="your-image.png" alt="Techy Packaging" />
        </div>
      </div>
    </section>
  );
};

export default Home;
