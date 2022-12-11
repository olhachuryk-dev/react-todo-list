import React, { useContext, useState } from "react";
import "../App.css";

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeUpdate() {
  return useContext(ThemeUpdateContext);
}

export function ThemeProvider({ children }) {
  const [isLightMode, setIsLightMode] = useState(true);
  const toggleTheme = () => {
    setIsLightMode((currMode) => !currMode);
  };
  return (
    <ThemeContext.Provider value={isLightMode}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        <div className={`app-container ${!isLightMode && "dark-mode"}`}>
          {children}
        </div>
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}
