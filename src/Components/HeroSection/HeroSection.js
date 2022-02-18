import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./HeroSection.css";
import universityData from "../../Data/data";
import UniversityCard from "../UniversityCard/UniversityCard";
const HeroSection = () => {
  const [universities, setUniversities] = useState(universityData);
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
          <form className="search">
            <div>
              <input
                type="text"
                id="search-input"
                placeholder="Enter University"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="university-cards">
        {filteredUniversities.map((university) => (
          <UniversityCard universityData={university} />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
