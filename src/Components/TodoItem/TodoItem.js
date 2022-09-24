import React, { useContext } from "react";
import { ThemeContext } from "../../App";
import { Draggable } from "@hello-pangea/dnd";
import CompleteTodo from "../CompleteTodo/CompleteTodo";
import "./TodoItem.css";

function TodoItem(props) {
  const { todo, index } = props;
  const action = todo.completed ? <s>{todo.action}</s> : todo.action;
  const isLightMode = useContext(ThemeContext);

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
