import React from "react";
import "./NewItem.css";

function NewItem(props) {
  return (
    <div className="new-todo__container">
      <div
        className={`submit-btn__wrap ${
          !props.isLightMode && "submit-btn__wrap__dark"
        }`}
      >
        <div
          className={`submit-btn ${!props.isLightMode && "submit-btn__dark"}`}
        >
          <label>add</label>
        </div>
      </div>
      <input
        className="new-todo__input"
        autoFocus
        placeholder="Start typing here"
      ></input>
    </div>
  );
}

export default NewItem;
