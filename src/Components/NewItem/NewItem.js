import React, { useRef } from "react";
import { useTheme } from "../../Context/themeContext";
import { useTodo } from "../../Context/todoContext";
import { generateTodoObj } from "../Main/Main";
import useHttp from "../../hooks/use-http";
import "./NewItem.css";

function NewItem(props) {
  const isLightMode = useTheme();
  const newTodoActinRef = useRef();
  const todoList = useTodo();
  const { sendRequest } = useHttp();

  function addTodo() {
    const listItem = addNewTodoAction();
    if (!listItem) return;
    sendRequest(
      (todoItemKey) =>
        props.callSetTodo([
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
    newTodoActinRef.current.value = "";
  }

  function addNewTodoAction() {
    const todoAction = newTodoActinRef.current.value.trim();
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
        <button className={`submit-btn ${!isLightMode && "submit-btn__dark"}`}>
          <label>add</label>
        </button>
      </div>
      <input
        type="text"
        className="new-todo__input"
        autoFocus
        ref={newTodoActinRef}
        placeholder="Start typing here"
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            addTodo();
          }
        }}
      />
    </div>
  );
}

export default NewItem;
