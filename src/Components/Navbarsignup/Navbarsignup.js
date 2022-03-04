
//Navbar for Signup and Login Pages

import React, { useState, useEffect } from "react";
import { BsFillHouseFill } from "react-icons/bs";

function Navbarsignup() {
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

        
      </div>
    </div>
  );
}

export default Navbarsignup;
