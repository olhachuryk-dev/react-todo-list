import React from "react";
import { useTranslation } from "react-i18next";
import Menu from "./Menu";
import iconMoon from "../assets/icon-moon.svg";
import iconSun from "../assets/icon-sun.svg";
import "./Header.css";

const Header = React.forwardRef(
  ({ menuClicked, setMenuClicked, toggleTheme, isLightMode }, ref) => {
    const { t } = useTranslation();

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
          <h1>{t("header.title")}</h1>
        </div>
        <img
          src={themeModeIcon}
          alt={t("header.themeToggle")}
          onClick={onClickThemeHandler}
          type="button"
          data-testid="theme-toggle"
        />
      </header>
    );
  }
);

export default Header;
