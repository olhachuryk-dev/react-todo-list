import React from "react";
import "./ClearAction.css";

function ClearAction(props) {
  const deleteCompleted = () => {
    props.callDeleteCompletedTodo();
  };
  return (
    <button className="clear-completed" onClick={deleteCompleted}>
      Clear Completed
    </button>
  );
}

export default ClearAction;
