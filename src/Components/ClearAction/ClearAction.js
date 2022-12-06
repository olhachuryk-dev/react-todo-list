import React from "react";
import { useTodo } from "../../Context/todoContext";
import useTodoCRUD from "../../hooks/useTodoCRUD";
import "./ClearAction.css";

function ClearAction() {
  const todoList = useTodo();
  const { deleteTodo } = useTodoCRUD();
  const completedTodo = todoList.filter((todo) => todo.completed === true);

  function clearComletedHandler() {
    completedTodo.forEach(item => {
      deleteTodo(item)
    });
  }
  return (
    <button className="clear-completed" onClick={clearComletedHandler}>
      Clear Completed
    </button>
  );
}

export default ClearAction;
