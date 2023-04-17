import React from "react";
import styles from "./Card.module.css";

function Card({style, showShadow, children }) {
  return (
    <div className={`${styles.card} ${showShadow && styles.shadow}`} style={style}>
      {children}
    </div>
  );
}

export default Card;
