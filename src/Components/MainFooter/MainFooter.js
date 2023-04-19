import React from "react";
import ClearAction from "../ClearAction/ClearAction";
import Filters from "../Filters/Filters";
import ItemsCounter from "../ItemsCounter/ItemsCounter";
import { useTodoContext } from "../../Context/todoContext";
import "./MainFooter.css";

function MainFooter(props) {
  const todoList = useTodoContext();
  const activeItems = todoList.filter((todo) => {
    return todo.completed === false;
  });
  function filterByStatus(isCompleted) {
    props.callFilterTodoList(isCompleted);
  }
  return (
    <div className="main-footer__container">
      <ItemsCounter amount={activeItems.length} />
      <Filters callFilterByStatus={filterByStatus} />
      <ClearAction />
    </div>
  );
}

export default MainFooter;
