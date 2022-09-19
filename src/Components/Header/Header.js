import React from "react";
import "./Header.css";

function Header(props) {
  const changeLightMode = () => {
    props.changeLightMode();
  };
  const lightModeIcon = props.isLightMode ? "icon-moon.svg" : "icon-sun.svg";
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
