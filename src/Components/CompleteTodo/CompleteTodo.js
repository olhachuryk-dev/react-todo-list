import React from "react";
import useTodoCRUD from "../../hooks/useTodoCRUD";
import iconCheck from "../assets/icon-check.svg";
import "./CompleteTodo.css";

function CompleteTodo({ todo }) {
  const { updateTodo } = useTodoCRUD();

  const checkMark = todo.completed && <img src={iconCheck} alt="Completed" />;

  function completeTodoHandler() {
    return updateTodo({ ...todo, completed: !todo.completed });
  }
  return (
    <div
      className={`border-wrap ${todo.completed && "completed-border-wrap"}`}
      onClick={completeTodoHandler}
    >
      <button className={`todo-icon ${todo.completed && "completed-todo"}`}>
        {checkMark}
      </button>
    </div>
  );
}

export default CompleteTodo;
