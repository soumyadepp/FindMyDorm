import React, { useEffect, useState } from "react";
import data from "../../Data/featuredData";
import { useLocation } from "react-router-dom";
import HouseCard from "../HouseCard/HouseCard";
import "./Explore.css";
function Explore() {
  const location = useLocation();
  const university =
    location.state !== null ? location.state.name : "Top colleges";
  const [matchingDorms, setMatchingDorms] = useState(
    data.filter((dorm) => dorm.colleges.includes(university))
  );

  const [filter, setFilter] = useState("");
  const [filteredDorms, setFilteredDorms] = useState(data);
  const [priceFilter, setPriceFilter] = useState(20000);
  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      window.location.href = "/login";
    }
    window.scrollTo(0, 0);
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
    <div className="explore-container" id="explore">
      <div className="sidebar">
        <h2 className="sidebar-header">
          Dorms near
          <br /> <span>{university}</span>
        </h2>
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

        <div className="price-range">
          <h2 className="sidebar-header">Price range</h2>
          <input
            className="price-range-input"
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
        <div className="explore-cards">
          {filteredDorms.length === 0 && (
            <h2>No places to display near {university}</h2>
          )}
          {filteredDorms.map((dorm, index) => (
            <HouseCard dorm={dorm} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Explore;
