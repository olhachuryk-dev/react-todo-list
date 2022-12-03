import React from "react";
import { useTheme, useThemeUpdate } from "../../Context/themeContext";
import Menu from "./Menu";
import "./Header.css";

function Header() {
  const isLightMode = useTheme();
  const toggleTheme = useThemeUpdate();
  const lightModeIcon = isLightMode ? "icon-moon.svg" : "icon-sun.svg";
  return (
    <header>
      <div className="menu-logo_container">
        <Menu/>
        <h1>T O D O</h1>
      </div>
      <img
        src={`./images/${lightModeIcon}`}
        alt="light-mode"
        onClick={toggleTheme}
      />
    </header>
  );
}

export default Header;
