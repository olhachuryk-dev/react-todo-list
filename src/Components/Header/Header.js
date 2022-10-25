import React from "react";
import { useTheme, useThemeUpdate } from "../ThemeContext/ThemeContext";
import "./Header.css";

function Header(props) {
  const isLightMode = useTheme();
  const toggleTheme = useThemeUpdate();
  const lightModeIcon = isLightMode ? "icon-moon.svg" : "icon-sun.svg";
  return (
    <header>
      <label>T O D O</label>
      <img
        src={`/images/${lightModeIcon}`}
        alt="light-mode"
        onClick={toggleTheme}
      />
    </header>
  );
}

export default Header;
