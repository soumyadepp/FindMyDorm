import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import HeroSection from "./Components/HeroSection/HeroSection";
import Featured from "./Components/Featured/Featured";
import featuredData from "./Data/featuredData";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./Components/Explore/Explore";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            exact
            element={
              <div>
                <Navbar />
                <HeroSection />
                {featuredData.map((house, index) => (
                  <Featured house={house} key={index} />
                ))}
              </div>
            }
          />
          <Route path="/explore" element={<Explore />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
