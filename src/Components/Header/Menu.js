import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import Card from "../../UI/Card/Card";
import "./Menu.css";

const Menu = React.forwardRef(({ menuClicked, setMenuClicked }, ref) => {
  const [error, setError] = useState("");

  const { currentUser, logout } = useAuth();

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
    setMenuClicked(false);
  }

  if (!currentUser) return;

  return (
    <div id="menu" ref={ref}>
      <button className="menu-icon" role={"menu"} onClick={handleMenu}>
        <div className={menuClicked ? "clicked-menu_part1" : ""} />
        <div className={menuClicked ? "clicked-menu_part2" : ""} />
        <div className={menuClicked ? "clicked-menu_part3" : ""} />
      </button>
      <Card>
        <nav className={menuClicked ? "nav_active" : ""}>
          {error && menuClicked ? (
            <div className="logout-error">{"error"}</div>
          ) : null}
          <ul>
            <li>👤 {currentUser.email}</li>
            <li>
              <button onClick={handleLogout}>Log out</button>
            </li>
          </ul>
        </nav>
      </Card>
    </div>
  );
});

export default Menu;
