import React from "react";
import CompleteTodo from "../CompleteTodo/CompleteTodo";
import "./TodoItem.css";

function TodoItem(props) {
  const action = props.todo.completed ? (
    <s>{props.todo.action}</s>
  ) : (
    props.todo.action
  );
  function updateTodoStatus(newStatus) {
    props.callUpdateTodoItemStatus(newStatus, props.todo.key);
  }
  const deleteTodoItem = () => {
    props.callRemoveTodoItem(props.todo.key);
  };
  return (
    <li className={`todo-item ${!props.isLightMode && "todo-item__dark"}`}>
      <CompleteTodo
        completed={props.todo.completed}
        isLightMode={props.isLightMode}
        callUpdateTodoStatus={updateTodoStatus}
      />
      <p>{action}</p>
      <img
        alt="delete"
        src="/images/icon-cross.svg"
        className="todo-delete"
        onClick={deleteTodoItem}
      />
    </li>
  );
}

export default TodoItem;
