import React from "react";
import ClearAction from "../ClearAction/ClearAction";
import Filters from "../Filters/Filters";
import ItemsCounter from "../ItemsCounter/ItemsCounter";
import "./MainFooter.css";

function MainFooter(props) {
  const activeItems = props.todoList.filter((todo) => {
    return todo.completed === false;
  });
  return (
    <div className="main-footer__container">
      <ItemsCounter amount={activeItems.length} />
      <Filters />
      <ClearAction />
    </div>
  );
}

export default MainFooter;
