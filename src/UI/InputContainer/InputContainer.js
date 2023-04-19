import React from "react";
import styles from "./InputContainer.module.css";

const InputContainer = ({ children }) => {
  return <div className={styles.input_container}>{children}</div>;
};

export default InputContainer;
