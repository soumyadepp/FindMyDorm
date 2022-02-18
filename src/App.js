import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import HeroSection from "./Components/HeroSection/HeroSection";
import Featured from "./Components/Featured/Featured";
import featuredData from "./Data/featuredData";
import Footer from "./Components/Footer/Footer";
function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      {featuredData.map((house) => (
        <Featured house={house} />
      ))}
      <Footer />
    </div>
  );
}

export default App;
