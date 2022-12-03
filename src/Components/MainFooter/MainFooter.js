import React from "react";
import ClearAction from "../ClearAction/ClearAction";
import Filters from "../Filters/Filters";
import ItemsCounter from "../ItemsCounter/ItemsCounter";
import { useTodo } from "../../Context/todoContext";
import "./MainFooter.css";

function MainFooter(props) {
  const todoList = useTodo();
  const activeItems = todoList.filter((todo) => {
    return todo.completed === false;
  });
  function deleteCompletedTodo() {
    return
  }
  function filterByStatus(isCompleted) {
    props.callFilterTodoList(isCompleted);
  }
  return (
    <div className="main-footer__container">
      <ItemsCounter amount={activeItems.length} />
      <Filters callFilterByStatus={filterByStatus} />
      <ClearAction callDeleteCompletedTodo={deleteCompletedTodo} />
    </div>
  );
}

export default MainFooter;
