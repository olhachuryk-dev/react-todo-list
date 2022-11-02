import React from "react";
import { useTheme } from "../ThemeContext/ThemeContext";
import { useTodo, generateTodoObj } from "../Main/Main";
import useHttp from "../../hooks/use-http";
import "./NewItem.css";

function NewItem(props) {
  const isLightMode = useTheme();
  const todoList = useTodo();
  const { sendRequest } = useHttp();

  function addTodo() {
    const listItem = addNewTodoAction();
    sendRequest(
      (todoItemKey)=>props.callSetTodo([
        {
          ...listItem,
          key: todoItemKey,
        },
        ...todoList,
      ]),
      "",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: listItem,
      }
    );
    document.querySelector(".new-todo__input").value = "";
  }

  function addNewTodoAction() {
    const todoAction = document.querySelector(".new-todo__input").value.trim();
    if (todoAction) {
      const todoNewItem = generateTodoObj(todoAction, todoList.length);
      return todoNewItem;
    }
    return;
  }

  return (
    <div className="new-todo__container">
      <div
        className={`submit-btn__wrap ${
          !isLightMode && "submit-btn__wrap__dark"
        }`}
        onClick={addTodo}
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
            addTodo();
          }
        }}
      ></input>
    </div>
  );
}

export default NewItem;
