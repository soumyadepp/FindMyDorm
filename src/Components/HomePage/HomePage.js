import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
function HomePage() {
  return (
    <div className="homepage-container">
      <div className="homepage-wrapper">
        <h1>Find My Dorm </h1>
        <Link style={{ textDecoration: "none" }} to="/login">
          <button className="btn book">Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
