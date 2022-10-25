import React from "react";
import { useTheme } from "../ThemeContext/ThemeContext";
import "./Card.css";

function Card({children}) {
  const isLightMode = useTheme();
  return (
    <div className={isLightMode ? "card-light" : "card-dark"}>
      {children}
    </div>
  );
}

export default Card;
