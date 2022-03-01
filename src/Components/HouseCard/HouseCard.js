import React from "react";
import "./HouseCard.css";
function HouseCard({ dorm }) {
  return (
    <div className="explore-card">
      <div className="explore-image">
        <img src={dorm.image1} alt={dorm.name} />
      </div>
      <div className="explore-card-info">
        <h1 className="explore-card-header">{dorm.name}</h1>
        <h2 className="explore-card-subheader">{dorm.location}</h2>
        <p className="explore-card-cost">Rs. {dorm.rent}/per month</p>
        <p className="explore-card-desc">
          {dorm.bedrooms}BHK {dorm.tagline}
        </p>
        <div className="explore-card-btn-container">
          <button className="btn">Explore</button>
          <button className="btn book">Book Now</button>
        </div>
      </div>
      <div className="explore-card-content">
        <div className="ratings">
          <h2>
            <span>{dorm.rating}</span>/5
          </h2>
        </div>
      </div>
    </div>
  );
}

export default HouseCard;
