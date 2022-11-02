import React from "react";
import { useTheme } from "../ThemeContext/ThemeContext";
import { Draggable } from "@hello-pangea/dnd";
import { useTodo } from "../Main/Main";
import CompleteTodo from "../CompleteTodo/CompleteTodo";
import useHttp from "../../hooks/use-http";
import "./TodoItem.css";

function TodoItem(props) {
  const todoList = useTodo();
  const { todo, index } = props;
  const action = todo.completed ? <s>{todo.action}</s> : todo.action;
  const isLightMode = useTheme();
  const { sendRequest } = useHttp();

  function updateTodoStatus(status) {
    return props.callUpdateTodoItems({...todo, completed: status});
  }
  const deleteTodoItem = () => {
    const cleanedTodo = todoList.filter(
      (existingTodoItem) => existingTodoItem.key !== todo.key
    );
    sendRequest(
      props.callSetTodo(cleanedTodo),
      todo.key,
      {
        method: "DELETE"
      }
    )
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
