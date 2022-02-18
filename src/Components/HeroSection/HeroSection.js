import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./HeroSection.css";
import universityData from "../../Data/data";
import UniversityCard from "../UniversityCard/UniversityCard";
const HeroSection = () => {
  const [search, setSearch] = useState("");
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
      <div className="hero">
        <div className="content">
          <h1>Find the perfect Dorm</h1>
          <p className="search-text">
            {" "}
            Search the largest Section of dorms , hostels & PGs.{" "}
          </p>
          <button className="btn">Get Started</button>
        </div>
      </div>
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
