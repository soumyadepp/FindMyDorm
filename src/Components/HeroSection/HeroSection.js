import React, { useEffect, useState } from "react";
import data from "../../Data/featuredData";
import "./HeroSection.css";
import universityData from "../../Data/data";
import UniversityCard from "../UniversityCard/UniversityCard";
import HouseCard from "../HouseCard/HouseCard";
import { Link } from "react-router-dom";
const HeroSection = () => {
  const token = localStorage.getItem("token");
  const [search, setSearch] = useState("");
  const university = localStorage.getItem("organization");
  const [houses, setHouses] = useState(
    data.filter((house) => house.colleges.includes(university))
  );

  const [filteredUniversities, setFilteredUniversities] =
    useState(universityData);
  const handleChange = (e) => {
    setSearch(e.target.value);
    const newUniversities = universityData.filter((university) => {
      return university.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setFilteredUniversities(newUniversities);
  };
  return (
    <div className="hero-section">
      {houses && (
        <div className="personalized-info">
          <div className="personalized-data">
            <h1>
              {" "}
              Looking for <span>Dorms</span> near{" "}
              <span>{localStorage.getItem("organization")}</span>?
            </h1>
            <p className="subtitle">
              Since you are{" "}
              {localStorage.getItem("occupation") == "Student" ||
              localStorage.getItem("occupation") == "Businessman" ||
              localStorage.getItem("occupation") == "Faculty"
                ? `a ${localStorage.getItem("occupation")}`
                : localStorage.getItem("occupation")}
              , we have curated top available properties near you.
            </p>
            <div className="houses-near">
              {houses.splice(0, 2).map((house, index) => (
                <HouseCard dorm={house} />
              ))}
            </div>
            <Link
              className="link-router"
              style={{ textDecoration: "none" }}
              to="/explore"
              state={{
                name: university,
                location: "all",
              }}
            >
              <span>See more</span>
            </Link>
          </div>
        </div>
      )}
      <div id="search"></div>
      <div className="university-cards-upper">
        <h1 className="university-cards-header">
          Find dorms near top colleges
        </h1>
        <div className="search">
          <datalist id="university-list">
            {universityData.map((university, index) => (
              <option key={index} value={university.name} />
            ))}
          </datalist>
          <input
            list="university-list"
            autoComplete="on"
            type="text"
            id="search-input"
            placeholder="Enter University"
            onChange={(e) => handleChange(e)}
          />
        </div>
        {filteredUniversities.length < universityData.length && (
          <div className="no-of-results">
            {filteredUniversities.length}{" "}
            {filteredUniversities.length > 1 ? "results" : "result"} found for "
            {search}"
          </div>
        )}
      </div>
      <div className="university-cards">
        {filteredUniversities.map((university, index) => (
          <UniversityCard universityData={university} key={index} />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
