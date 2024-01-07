import { Component } from "react";
import Navigation from "./components/navigation/Navigation";
import HeroSection from "./components/hero-section/HeroSection";
import DetectSection from "./components/detect-section/DetectSection";

class App extends Component {
  render() {
    return (
      <div className="w-full h-screen bg-slate-200">
        <Navigation />
        <div className="flex flex-col items-center gap-10">
          <HeroSection />
          <DetectSection />
        </div>
      </div>
    );
  }
}

export default App;
