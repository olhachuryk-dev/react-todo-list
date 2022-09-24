import React, { useContext } from "react";
import { ThemeContext } from "../../App";
import "./Card.css";

function Card(props) {
  const isLightMode = useContext(ThemeContext);
  return (
    <div className={isLightMode ? "card-light" : "card-dark"}>
      {props.children}
    </div>
  );
}

export default Card;
