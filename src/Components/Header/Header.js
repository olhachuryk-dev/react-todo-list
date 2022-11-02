import React from "react";
import { useTheme, useThemeUpdate } from "../ThemeContext/ThemeContext";
import "./Header.css";

function Header() {
  const isLightMode = useTheme();
  const toggleTheme = useThemeUpdate();
  const lightModeIcon = isLightMode ? "icon-moon.svg" : "icon-sun.svg";
  return (
    <header>
      <h1>T O D O</h1>
      <img
        src={`images/${lightModeIcon}`}
        alt="light-mode"
        onClick={toggleTheme}
      />
    </header>
  );
}

export default Header;
