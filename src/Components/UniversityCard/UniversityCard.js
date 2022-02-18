import React from "react";
import { Link } from "react-router-dom";
import "./UniversityCard.css";

function UniversityCard({ universityData }) {
  return (
    <div className="university-card">
      <div className="university-card-header">
        <img src={universityData.image} alt={universityData.name} />
        <h1>{universityData.name}</h1>
        <p>{universityData.location}</p>
      </div>
      <div className="btn-container">
        <Link
          to="/explore"
          state={{
            name: universityData.name,
            location: universityData.location,
          }}
        >
          <button className="btn">Explore</button>
        </Link>
      </div>
    </div>
  );
}

export default UniversityCard;
