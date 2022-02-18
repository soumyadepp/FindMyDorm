import React from "react";

import "./Featured.css";

const Featured = ({ house }) => {
  return (
    <div className="featured">
      <h1 className="featured-header">Featured House</h1>

      <div className="container">
        <img className="span-3 image-grid-row-2" src={house.image1} alt="" />
        <img src={house.image2} alt="" />
        <img src={house.image3} alt="" />
        <img src={house.image4} alt="" />
        <img src={house.image5} alt="" />
        <div className="span-3 img-details">
          <div className="top">
            <h2>{house.name}</h2>
            <p>{house.tagline}</p>
            <p className="price">Rs.{house.rent}/month</p>
          </div>
          <div className="info-grid">
            <div>
              <div className="info">
                <p className="bold">Bedrooms:</p>
                <p>{house.bedrooms}</p>
              </div>
              <div className="info">
                <p className="bold">Bathrooms:</p>
                <p>{house.bathrooms}</p>
              </div>
            </div>
            <div>
              <div className="info">
                <p className="bold">Square Feet:</p>
                <p>4200</p>
              </div>
            </div>
          </div>
        </div>
        <div className="span-2 right-img-details">
          <button className="btn">View Contact Details</button>
          <button className="btn">Explore Dorm</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
