import React, { useContext } from "react";
import { ThemeContext } from "../../App";
import "./NewItem.css";

function NewItem(props) {
  const isLightMode = useContext(ThemeContext);
  const addNewTodoAction = () => {
    const actionValue = document.querySelector(".new-todo__input").value;
    props.callSubmitNewTodo(actionValue.trim());
    document.querySelector(".new-todo__input").value = "";
  };
  return (
    <div className="new-todo__container">
      <div
        className={`submit-btn__wrap ${
          !isLightMode && "submit-btn__wrap__dark"
        }`}
        onClick={addNewTodoAction}
      >
        <div
          className={`submit-btn ${!isLightMode && "submit-btn__dark"}`}
        >
          <label>add</label>
        </div>
      </div>
      <input
        type="text"
        className="new-todo__input"
        autoFocus
        placeholder="Start typing here"
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            addNewTodoAction();
          }
        }}
      ></input>
    </div>
  );
}

export default NewItem;
