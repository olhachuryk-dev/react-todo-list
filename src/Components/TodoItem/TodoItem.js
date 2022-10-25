import React from "react";
import { useTheme } from "../ThemeContext/ThemeContext";
import { Draggable } from "@hello-pangea/dnd";
import { useTodo } from "../Main/Main";
import CompleteTodo from "../CompleteTodo/CompleteTodo";
import "./TodoItem.css";

function TodoItem(props) {
  const todoList = useTodo();
  const { todo, index } = props;
  const action = todo.completed ? <s>{todo.action}</s> : todo.action;
  const isLightMode = useTheme();

  function updateTodoStatus(status) {
    const updated = todoList.map((existingTodoItem) => {
      if (existingTodoItem.key === todo.key) {
        return { ...existingTodoItem, completed: status };
      }
      return existingTodoItem;
    });
    return props.callUpdateTodoItems(updated);
  }
  const deleteTodoItem = () => {
    const cleanedTodo = todoList.filter(
      (existingTodoItem) => existingTodoItem.key !== todo.key
    );
    return props.callUpdateTodoItems(cleanedTodo);
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
