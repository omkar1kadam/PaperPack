import React from "react";
import "../style.css"; // Import your CSS

const About = () => {
  return (
    <section className="about">
      {/* Black overlay */}
      <div className="overlay"></div>

      {/* Glass card */}
      <div className="about-box">
        <h1>About PaperPack</h1>
        <p>
          At PaperPack, cardboard isn’t just cardboard — it’s the backbone of sustainability, commerce, and
          creativity. We are a forward-thinking company dedicated to manufacturing high-quality cardboard, paper
          rolls, and packaging materials while embedding technology, innovation, and eco-consciousness at every
          step.
        </p>

        <h2>Our Story</h2>
        <p>
          What started as a humble idea — to make packaging smarter and greener — has grown into a mission-driven
          enterprise. PaperPack was founded on the belief that packaging should not only protect products but also
          protect the planet. By combining modern machinery, data-driven production, and sustainable raw
          materials, we’ve turned traditional cardboard into a future-ready material.
        </p>

        <h2>What We Do</h2>
        <ul className="about-list">
          <li>
            Eco-friendly Packaging: We design cardboard solutions that are recyclable, biodegradable, and
            environmentally safe.
          </li>
          <li>
            Custom Manufacturing: From paper rolls to specialized industrial packaging, we tailor products to meet
            diverse business needs.
          </li>
          <li>
            Tech-Integrated Processes: Our manufacturing lines are powered by automation and smart quality checks
            for precision and efficiency.
          </li>
          <li>
            Sustainability First: We’re committed to reducing waste, recycling resources, and lowering carbon
            footprints.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default About;
