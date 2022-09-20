import React from "react";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css";

function TodoList(props) {
  function updateTodoItemStatus(status, key) {
    props.callSaveNewItemStatus(status, key);
  }

  function removeTodoItem(key) {
    props.callClearTodoItem(key);
  }

  return (
    <ul className={`todo-list ${!props.isLightMode && "todo-list__dark"}`}>
      {props.todoList.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.key}
          isLightMode={props.isLightMode}
          callUpdateTodoItemStatus={updateTodoItemStatus}
          callRemoveTodoItem={removeTodoItem}
        />
      ))}
    </ul>
  );
}

export default TodoList;
