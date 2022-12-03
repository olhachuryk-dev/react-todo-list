import React from "react";
import { useTheme } from "../../Context/themeContext";
import "./Card.css";

function Card({style, children }) {
  const isLightMode = useTheme();
  return (
    <div className={isLightMode ? "card-light" : "card-dark"} style={style}>
      {children}
    </div>
  );
}

export default Card;
