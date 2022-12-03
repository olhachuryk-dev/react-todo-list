import React from "react";
import TimesButton from "../UI/TimesButton";

function ClearAction(props) {
  const deleteCompleted = () => {
    props.callDeleteCompletedTodo();
  };
  return (
    <TimesButton onClick={deleteCompleted}>
      Clear Completed
    </TimesButton>
  );
}

export default ClearAction;
