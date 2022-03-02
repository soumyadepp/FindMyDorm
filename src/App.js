import "./App.css";
import { useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import HeroSection from "./Components/HeroSection/HeroSection";
import Featured from "./Components/Featured/Featured";
import featuredData from "./Data/featuredData";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./Components/Explore/Explore";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import HomePage from "./Components/HomePage/HomePage";
import Verify from "./Components/Verify/Verify";
function App() {
  useEffect(() => {
    const loginTime = localStorage.getItem("loginTime");
    const newDate = new Date(loginTime);
    var currentDate = new Date();
    if (loginTime != null) {
      const k = currentDate.getDate() - newDate.getDate();
      console.log(k);
      if (k >= 1) {
        localStorage.clear();
      }
    }
  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
              <Navbar/>
                <HomePage />
              </>
            }
          />
          <Route
            path="/home"
            exact
            element={
              <div>
                <Navbar />
                <HeroSection />
                {featuredData.map((house, index) => (
                  <Featured house={house} key={index} />
                ))}
                <Footer />
              </div>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
