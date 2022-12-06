import React from "react";
import { useTheme } from "../../Context/themeContext";
import { Draggable } from "@hello-pangea/dnd";
import CompleteTodo from "../CompleteTodo/CompleteTodo";
import "./TodoItem.css";
import useTodoCRUD from "../../hooks/useTodoCRUD";

function TodoItem(props) {
  const { deleteTodo } = useTodoCRUD();
  const { todo, index } = props;
  const action = todo.completed ? <s>{todo.action}</s> : todo.action;
  const isLightMode = useTheme();

  const deleteTodoHandler = () => {
    deleteTodo(props.todo)
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
          <CompleteTodo todo={todo} />
          <p>{action}</p>
          <img
            alt="delete"
            src="./images/icon-cross.svg"
            className="todo-delete"
            onClick={deleteTodoHandler}
          />
        </li>
      )}
    </Draggable>
  );
}

export default TodoItem;
