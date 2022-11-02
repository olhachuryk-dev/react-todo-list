import React from "react";
import { useTheme } from "../ThemeContext/ThemeContext";
import "./CompleteTodo.css";

function CompleteTodo(props) {
  const isLightMode = useTheme();
  const checkMark = props.completed && (
    <img src="/images/icon-check.svg" alt="Completed" />
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
      <div className={`todo-icon ${props.completed && "completed-todo"}`}>
        {checkMark}
      </div>
    </div>
  );
}

export default CompleteTodo;
