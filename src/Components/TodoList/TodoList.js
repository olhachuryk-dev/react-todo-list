import React from "react";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css";

function TodoList(props) {
  return (
    <ul className={`todo-list ${!props.isLightMode && "todo-list__dark"}`}>
      {props.todoList.map((todo) => (
        <TodoItem todo={todo} key={todo.key} isLightMode = {props.isLightMode}/>
      ))}
    </ul>
  );
}

export default TodoList;
