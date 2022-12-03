import React from "react";
import { useTheme } from "../../Context/themeContext";
import "./CompleteTodo.css";

function CompleteTodo(props) {
  const isLightMode = useTheme();
  const checkMark = props.completed && (
    <img src="./images/icon-check.svg" alt="Completed" />
  );
  const toggleTodoStatus = () => {
    props.callUpdateTodoStatus(!props.completed);
  };
  return (
    <div
      className={`border-wrap ${!isLightMode && "border-wrap__dark"} ${
        props.completed && "completed-border-wrap"
      }`}
      onClick={toggleTodoStatus}
    >
      <button className={`todo-icon ${props.completed && "completed-todo"}`}>
        {checkMark}
      </button>
    </div>
  );
}

export default CompleteTodo;
