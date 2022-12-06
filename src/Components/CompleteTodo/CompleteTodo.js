import React from "react";
import { useTheme } from "../../Context/themeContext";
import useTodoCRUD from "../../hooks/useTodoCRUD";
import "./CompleteTodo.css";

function CompleteTodo({todo}) {
  const { updateTodo } = useTodoCRUD();
  const isLightMode = useTheme();
  
  const checkMark = todo.completed && (
    <img src="./images/icon-check.svg" alt="Completed" />
  );

  function completeTodoHandler() {
    return updateTodo({...todo, completed: !todo.completed});
  }
  return (
    <div
      className={`border-wrap ${!isLightMode && "border-wrap__dark"} ${
        todo.completed && "completed-border-wrap"
      }`}
      onClick={completeTodoHandler}
    >
      <button className={`todo-icon ${todo.completed && "completed-todo"}`}>
        {checkMark}
      </button>
    </div>
  );
}

export default CompleteTodo;
