import React from "react";
import "./TimesButton.css";

function TimesButton(props) {
  return (
    <button className="clear-completed" onClick={props.onCLick}>
      {props.children}
    </button>
  );
}

export default TimesButton;
