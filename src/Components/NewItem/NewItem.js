import React from "react";
import "./NewItem.css";

function NewItem(props) {
  const addNewTodoAction = () => {
    const actionValue = document.querySelector(".new-todo__input").value;
    props.callSubmitNewTodo(actionValue.trim());
    document.querySelector(".new-todo__input").value = "";
  };
  return (
    <div className="new-todo__container">
      <div
        className={`submit-btn__wrap ${
          !props.isLightMode && "submit-btn__wrap__dark"
        }`}
        onClick={addNewTodoAction}
      >
        <div
          className={`submit-btn ${!props.isLightMode && "submit-btn__dark"}`}
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
