import React from "react";
import CompleteTodo from "../CompleteTodo/CompleteTodo";
import "./TodoItem.css";

function TodoItem(props) {
  const action = props.todo.completed ? (
    <s>{props.todo.action}</s>
  ) : (
    props.todo.action
  );
  return (
    <li className={`todo-item ${!props.isLightMode && "todo-item__dark"}`}>
      <CompleteTodo
        completed={props.todo.completed}
        isLightMode={props.isLightMode}
      />
      <p>{action}</p>
      <img alt="delete" src="/images/icon-cross.svg" className="todo-delete" />
    </li>
  );
}

export default TodoItem;
