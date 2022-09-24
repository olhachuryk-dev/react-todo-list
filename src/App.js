import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";
import "./App.css";

export const ThemeContext = React.createContext()

function App() {
  const [isLightMode, setIsLightMode] = useState(true);
  function toggleTheme() {
    setIsLightMode((curMode) => {
      return !curMode;
    });
  }
  return (
    <>
    <ThemeContext.Provider value={isLightMode}>
    <div className={`app-container ${!isLightMode && "dark-mode"}`}>
      <Header changeLightMode={toggleTheme} />
      <Main />
      <Footer />
    </div>
    </ThemeContext.Provider>
    </>
  );
}

export default App;
