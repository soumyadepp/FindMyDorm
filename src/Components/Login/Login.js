import React, { useEffect } from "react";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      window.location.href = "/home";
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:5000/token/${email}`)
      .then((res) => {
        if (res.data.token != null) setToken(res.data.token);
        else {
          setError(res.data.error);
        }
        console.log(res.data.token);
      })
      .catch((err) => {
        setError(err.response.data.error);
      });

    const data = {
      email: email,
      password: password,
      token: token,
    };
    axios
      .post("http://localhost:5000/login", data)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        var d = new Date();
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("firstName", res.data.firstName);
        localStorage.setItem("lastName", res.data.lastName);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("organization", res.data.organization);
        localStorage.setItem("occupation", res.data.occupation);
        localStorage.setItem("loginTime", d);
        console.log(localStorage.getItem("firstName"));
        console.log(localStorage.getItem("loginTime"));
        window.location.href = "/home";
      })
      .catch((err) => {
        if (err.status == 403) {
          setError("Token initialized. Click again to login");
        }
        setError(err.response.data.error);
      });
  };
  return (
    <div className="login-container">
      <form className="login-form">
        <h1>Sign In</h1>
        <input
          type="text"
          required="required"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          required="required"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          value={password}
        />
        <input
          className="submit-btn"
          type="submit"
          value="Double Click to Sign in"
          onClick={(e) => handleSubmit(e)}
        />
        <span>New user?</span>
        <Link style={{ textDecoration: "none" }} to="/signup">
          <h3>Sign Up</h3>
        </Link>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
