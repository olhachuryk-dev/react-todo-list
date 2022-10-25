import React from "react";
import { useTheme } from "../ThemeContext/ThemeContext";
import { useTodo, generateTodoObj } from "../Main/Main";
import "./NewItem.css";

function NewItem(props) {
  const isLightMode = useTheme();
  const todoList = useTodo();
  const addNewTodoAction = () => {
    const todoAction = document.querySelector(".new-todo__input").value.trim();
    if (todoAction) {
      const todoListWithNewItem = [generateTodoObj(todoAction), ...todoList];
      props.callUpdateTodo(todoListWithNewItem);
    }
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
        <div className={`submit-btn ${!isLightMode && "submit-btn__dark"}`}>
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
