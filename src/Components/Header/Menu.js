import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useTheme } from "../../Context/themeContext";
import Card from "../Card/Card";
import "./Menu.css";

export default function Menu() {
  const [menuClicked, setMenuClicked] = useState(false);
  const [error, setError] = useState("");

  const { currentUser, logout } = useAuth();
  const isLightMode = useTheme();

  function handleMenu() {
    setError("");
    setMenuClicked(!menuClicked);
  }

  async function handleLogout() {
    setError("");
    try {
      await logout();
    } catch (e) {
      setError(e.message);
    }
    setMenuClicked(false)
  }

  if (!currentUser) return;

  return (
    <>
      <button
        className="menu-icon"
        role={"menu"}
        onClick={handleMenu}
      >
        <div className={menuClicked ? "clicked-menu_part1" : ""} />
        <div className={menuClicked ? "clicked-menu_part2" : ""} />
        <div className={menuClicked ? "clicked-menu_part3" : ""} />
      </button>
      <Card>
        <nav className={menuClicked ? "nav_after" : ""}>
        {(error && menuClicked) ? (
          <div
            className={`logout-error ${!isLightMode && "logout-error__dark"}`}
          >
            {"error"}
          </div>
        ) : null}
          <ul>
            <li>
              <button onClick={handleLogout}>Log out</button>
            </li>
          </ul>
        </nav>
      </Card>
    </>
  );
}
