import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
function HomePage() {
  return (
    <div className="hero">
         <div className="content">
             <h1>Find the perfect Dorm</h1>
             <p className="search-text"> Search the largest Section of dorms , hostels & PGs. </p>
            <Link to ="/signup"> <button className="btn">Get Started</button></Link>
        </div>
        <div className="homepage-features">
          
        </div>
    </div>
   );
}

export default HomePage;
