
//NavbarHome for Home page

import React, { useState, useEffect } from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaRegTimesCircle } from "react-icons/fa";
import { BsFillHouseFill } from "react-icons/bs";
import {Link} from 'react-router-dom';

function Navbarhome() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const handleClose = () => setClick(false);

 
  return (
    <div className="navbar">
      <div className="container">
        <h1>
          <span>
            <BsFillHouseFill />F
          </span>
          ind<span>M</span>y<span>D</span>orm
        </h1>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li>
            <a href="#" onClick={handleClose}>
              Properties
            </a>
          </li>
          <li>
            <a href="#" onClick={handleClose}>
              Pricing
            </a>
          </li>
          <li>
            <a href="#" onClick={handleClose}>
              Contact
            </a>
          </li>
          <li>  
          <a>
          <Link to="/signup"><button className="btn">Sign Up</button></Link>
          </a>
          </li>
          <li>
          <a>
          <Link to="/login"><button className="btn">Log In</button></Link>
          </a>
          </li>
        </ul>

        <div className="hamburger" onClick={handleClick}>
          {click ? (
            <FaRegTimesCircle className="icon" />
          ) : (
            <HiOutlineMenuAlt4 className="icon" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbarhome;
