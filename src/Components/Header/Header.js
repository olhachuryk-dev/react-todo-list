import React, { useContext } from "react";
import { ThemeContext } from "../../App";
import "./Header.css";

function Header(props) {
  const isLightMode = useContext(ThemeContext);
  const changeLightMode = () => {
    props.changeLightMode();
  };
  const lightModeIcon = isLightMode ? "icon-moon.svg" : "icon-sun.svg";
  return (
    <header>
      <label>T O D O</label>
      <img
        src={`/images/${lightModeIcon}`}
        alt="light-mode"
        onClick={changeLightMode}
      />
    </header>
  );
}

export default Header;
