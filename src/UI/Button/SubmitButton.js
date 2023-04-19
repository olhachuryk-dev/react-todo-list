import React from "react";
import styles from "./Button.module.css";

const SubmitButton = ({ name, disabled }) => {
  return (
    <button type="submit" className={styles.btn} disabled={disabled}>
      {name}
    </button>
  );
};

export default SubmitButton;
