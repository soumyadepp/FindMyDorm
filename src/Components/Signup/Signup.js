import React, { useEffect } from "react";
import "./Signup11.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import image1 from '../../Assets/image1.svg';
import data from '../../Data/data';
import axios from "axios";
function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccupation] = useState("");
  const [organization, setOrganization] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [orgData,setOrgData] = useState(data);
  const validateForm = () => {
    if (password.length == 0) {
      setError("");
    }
    if (password !== confirmPassword) {
      setError("Passwords dont match");
    } else if (password.length > 0 && password.length < 6) {
      setError("Password must be at least 6 characters long");
    } else if (password.includes(" ")) {
      setError("Password must not contain spaces");
    } else {
      setError("");
    }
    if (error.length == 0) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      //redirect to the home page
      window.location.href = "/home";
    }

    validateForm();
  }, [firstName, lastName, email, password, confirmPassword]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        occupation: occupation,
        organization: organization,
        password: password,
      };
      axios
        .post("http://localhost:5000/register", data)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          window.location.href = "/verify";
        })
        .catch((err) => {
          setError(err.response.data.error);
        });
    }
  };
  return (
    <div className="signup-container">
    <div className="signup-left">
    <h1>Sign Up</h1>
    <img src={image1} className="signup-image" alt="image" />
    </div>
    <div className="signup-right">
    
    <form className="signup-form">
     
      <input
        type="text"
        style={{ marginRight: "5px" }}
        required="required"
        placeholder="First Name"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />
      <input
        type="text"
        required="required"
        placeholder="Last Name"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />
    <input
      type="text"
      required="required"
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
      value={email}
    />
    <select
      onChange={(e) => setOccupation(e.target.value)}
      value={occupation}
    >
      <option value="Occupation">Occupation</option>
      <option value="Student">Student</option>
      <option value="Faculty">Professor</option>
      <option value="Businessman">Businessman</option>
      <option value="Employed">Employed</option>
      <option value="Unemployed">Unemployed</option>
    </select>
    <select
      onChange={(e) => setOrganization(e.target.value)}
      value={organization}
    >
      <option value="Organization">Organization</option>
      {data.map(org=>{
        return(
          <option value={org.name}>{org.name}</option>
        )
      })}
    </select>
    
    <input
      type="password"
      required="required"
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
      value={password}
    />
    <input
      type="password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      required="required"
      placeholder="Confirm Password"
    />
    <input
      className="btn"
      type="submit"
      value="Sign Up"
      onClick={(e) => handleSubmit(e)}
    />
    <span>Already Registered?</span>
    <Link style={{ textDecoration: "none" }} to="/login">
      <h3>Login</h3>
    </Link>
    {error.length > 0 && <p className="error">{error}</p>}
  </form>
    </div>
     
    </div>
  );
}

export default Signup;
