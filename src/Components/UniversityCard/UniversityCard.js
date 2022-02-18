import React, { useEffect, useState } from "react";
import data from "../../Data/data";
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
        <button className="btn">Explore</button>
      </div>
    </div>
  );
}

export default UniversityCard;
