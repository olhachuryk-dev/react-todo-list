import React from "react";
import { useTranslation } from 'react-i18next';
import { useTodoContext } from "../../Context/todoContext";
import useTodoCRUD from "../../hooks/useTodoCRUD";
import "./ClearAction.css";

function ClearAction() {
  const { t } = useTranslation();
  const todoList = useTodoContext();
  const { deleteTodo } = useTodoCRUD();
  const completedTodo = todoList.filter((todo) => todo.completed === true);

  function clearComletedHandler() {
    completedTodo.forEach(item => {
      deleteTodo(item)
    });
  }
  
  return (
    <button 
      className="clear-completed" 
      onClick={clearComletedHandler}
      data-testid="clear-completed-button"
    >
      {t('todo.clearCompleted')}
    </button>
  );
}

export default ClearAction;
