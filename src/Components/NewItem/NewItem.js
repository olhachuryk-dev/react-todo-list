import React, { useRef } from "react";
import { useTheme } from "../../Context/themeContext";
import { useTodo } from "../../Context/todoContext";
import useTodoCRUD from "../../hooks/useTodoCRUD";
import { generateTodoObj } from "../Main/Main";
import "./NewItem.css";

function NewItem() {
  const isLightMode = useTheme();
  const newTodoActinRef = useRef();
  const todoList = useTodo();

  const { writeNewTodo, error, loading } = useTodoCRUD();

  function addTodo() {
    const listItem = addNewTodoAction();
    if (!listItem) return;
    if (error) {
      console.log(error);
      return;
    }
    writeNewTodo(listItem);
    newTodoActinRef.current.value = "";
  }

  function addNewTodoAction() {
    const todoAction = newTodoActinRef.current.value.trim();
    if (todoAction) {
      const todoNewItem = generateTodoObj(
        todoAction,
        todoList.length ? todoList[0].order - 1 : 0
      );
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
        <button
          disabled={loading}
          className={`submit-btn ${!isLightMode && "submit-btn__dark"}`}
        >
          <label>add</label>
        </button>
      </div>
      <input
        type="text"
        className={`new-todo_input ${!isLightMode && "new-todo_input__dark"}`}
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
