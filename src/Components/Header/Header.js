import React from "react";
import Menu from "./Menu";
import "./Header.css";

const Header = React.forwardRef(({ menuClicked, setMenuClicked, toggleTheme, isLightMode }, ref) => {
  const onClickThemeHandler = () => {toggleTheme()};
  const lightModeIcon = isLightMode ? "icon-moon.svg" : "icon-sun.svg";
  return (
    <header>
      <div className="menu-logo_container">
        <Menu
          menuClicked={menuClicked}
          setMenuClicked={setMenuClicked}
          ref={ref}
        />
        <h1>T O D O</h1>
      </div>
      <img
        src={`./images/${lightModeIcon}`}
        alt="light-mode"
        onClick={onClickThemeHandler}
      />
    </header>
  );
});

export default Header;
