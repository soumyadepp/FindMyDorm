import React, { useEffect, useState } from "react";
import data from "../../Data/featuredData";
import { useLocation } from "react-router-dom";
import "./Explore.css";
function Explore() {
  const location = useLocation();
  const university = location.state.name;
  const [matchingDorms, setMatchingDorms] = useState(
    data.filter((dorm) => dorm.colleges.includes(university))
  );
  const [filter, setFilter] = useState("");
  const [filteredDorms, setFilteredDorms] = useState(data);
  const [priceFilter, setPriceFilter] = useState(20000);
  useEffect(() => {
    setFilteredDorms(matchingDorms);
  }, [matchingDorms]);
  const changePriceFilter = (e) => {
    setPriceFilter(e.target.value);
    const newDorms = matchingDorms.filter(
      (dorm) => dorm.rent <= e.target.value
    );
    setFilteredDorms(newDorms);
  };
  const changeFilter = (filter) => {
    setFilter(filter);
    if (filter === "") {
      setFilteredDorms(matchingDorms);
    } else if (filter === "dorm") {
      const dormclass = document.getElementById("dorm");
      dormclass.classList.add("active");
      const hostelclass = document.getElementById("hostel");
      hostelclass.classList.remove("active");
      const pgclass = document.getElementById("pg");
      pgclass.classList.remove("active");
      const allClass = document.getElementById("all");
      allClass.classList.remove("active");
      setFilteredDorms(
        matchingDorms.filter((dorm) => dorm.types.includes("dorm"))
      );
    } else if (filter === "hostel") {
      const hostelclass = document.getElementById("hostel");
      hostelclass.classList.add("active");
      const dormclass = document.getElementById("dorm");
      dormclass.classList.remove("active");
      const pgclass = document.getElementById("pg");
      pgclass.classList.remove("active");
      const allClass = document.getElementById("all");
      allClass.classList.remove("active");
      setFilteredDorms(
        matchingDorms.filter((hostel) => hostel.types.includes("hostel"))
      );
    } else if (filter === "pg") {
      const pgclass = document.getElementById("pg");
      pgclass.classList.add("active");
      const hostelclass = document.getElementById("hostel");
      hostelclass.classList.remove("active");
      const dormclass = document.getElementById("dorm");
      dormclass.classList.remove("active");
      const allClass = document.getElementById("all");
      allClass.classList.remove("active");
      setFilteredDorms(matchingDorms.filter((pg) => pg.types.includes("pg")));
    } else if (filter == "all") {
      const allclass = document.getElementById("all");
      allclass.classList.add("active");
      const hostelclass = document.getElementById("hostel");
      hostelclass.classList.remove("active");
      const pgclass = document.getElementById("pg");
      pgclass.classList.remove("active");
      const dormclass = document.getElementById("dorm");
      dormclass.classList.remove("active");
      setFilteredDorms(matchingDorms);
    }
  };

  return (
    <div className="explore-container">
      <div className="sidebar">
        <h2 className="sidebar-header">Service types</h2>
        <ul className="filter-list">
          <li onClick={(e) => changeFilter("all")} id="all">
            All
          </li>
          <li onClick={(e) => changeFilter("dorm")} id="dorm">
            Dorms
          </li>
          <li onClick={(e) => changeFilter("pg")} id="pg">
            PGs
          </li>
          <li onClick={(e) => changeFilter("hostel")} id="hostel">
            Hostels
          </li>
        </ul>
        <h2 className="sidebar-header">Price range</h2>
        <div className="price-range">
          <input
            list="prices"
            type="range"
            min="2000"
            max="20000"
            onChange={(e) => changePriceFilter(e)}
            step={2000}
            value={priceFilter}
          />
          <output>{priceFilter}</output>
          <datalist id="prices">
            <option value="2000" label="2000">
              2000
            </option>
            <option value="4000"></option>
            <option value="6000"></option>
            <option value="8000"></option>
            <option value="10000" label="10000">
              10000
            </option>
            <option value="12000"></option>
            <option value="14000"></option>
            <option value="16000"></option>
            <option value="18000"></option>
            <option value="20000" label="20000">
              20000
            </option>
          </datalist>
        </div>
      </div>
      <div className="explore-main">
        <div className="explore-head">
          <p>Displaying places to stay near {university}</p>
        </div>
        <div className="explore-cards">
          {filteredDorms.map((dorm, index) => (
            <div className="explore-card">
              <img src={dorm.image1} alt={dorm.name} />
              <div className="explore-card-info">
                <h1 className="explore-card-header">{dorm.name}</h1>
                <h2 className="explore-card-subheader">{dorm.location}</h2>
                <p className="explore-card-cost">Rs. {dorm.rent}/per month</p>
                <p className="explore-card-desc">
                  {dorm.bedrooms}BHK {dorm.tagline}
                </p>
                <div className="explore-card-btn-container">
                  <button className="btn">Contact Owner</button>
                </div>
              </div>
              <div className="explore-card-content"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Explore;
