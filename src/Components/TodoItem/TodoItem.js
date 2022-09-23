import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import CompleteTodo from "../CompleteTodo/CompleteTodo";
import "./TodoItem.css";

function TodoItem(props) {
  const { todo, index, isLightMode } = props;
  const action = todo.completed ? <s>{todo.action}</s> : todo.action;
  function updateTodoStatus(newStatus) {
    props.callUpdateTodoItemStatus(newStatus, todo.key);
  }
  const deleteTodoItem = () => {
    props.callRemoveTodoItem(todo.key);
  };

  return (
    <Draggable draggableId={todo.key.toString()} index={index} key={todo.key}>
      {(provided) => (
        <li
          id={todo.key.toString()}
          className={`todo-item ${!isLightMode && "todo-item__dark"}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CompleteTodo
            completed={todo.completed}
            isLightMode={isLightMode}
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
      )}
    </Draggable>
  );
}

export default TodoItem;
