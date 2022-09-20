import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";
import "./App.css";

function App() {
  const [isLightMode, setIsLightMode] = useState(true);
  function toggleLightMode() {
    setIsLightMode((curMode) => {
      return !curMode;
    });
  }
  return (
    <div className={`app-container ${!isLightMode && "dark-mode"}`}>
      <Header changeLightMode={toggleLightMode} isLightMode={isLightMode} />
      <Main isLightMode={isLightMode} />
      <Footer />
    </div>
  );
}

export default App;
