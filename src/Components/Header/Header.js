import React from "react";
import Menu from "./Menu";
import iconMoon from "../assets/icon-moon.svg";
import iconSun from "../assets/icon-sun.svg";
import "./Header.css";

const Header = React.forwardRef(
  ({ menuClicked, setMenuClicked, toggleTheme, isLightMode }, ref) => {
    const onClickThemeHandler = () => {
      toggleTheme();
    };
    const themeModeIcon = isLightMode ? iconMoon : iconSun;
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
          src={themeModeIcon}
          alt="light-mode"
          onClick={onClickThemeHandler}
          type="button"
        />
      </header>
    );
  }
);

export default Header;
