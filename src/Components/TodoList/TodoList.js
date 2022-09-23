import React from "react";
import TodoItem from "../TodoItem/TodoItem";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import "./TodoList.css";

function TodoList(props) {
  function updateTodoItemStatus(status, key) {
    props.callSaveNewItemStatus(status, key);
  }

  function removeTodoItem(key) {
    props.callClearTodoItem(key);
  }

  return (
    //https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/
    <DragDropContext>
      <Droppable droppableId="todos">
        {(provided) => (
          <ul
            className={`todo-list ${!props.isLightMode && "todo-list__dark"}`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {props.todoList.map((todo, index) => (
              <TodoItem
                todo={todo}
                index={index}
                key={todo.key}
                isLightMode={props.isLightMode}
                callUpdateTodoItemStatus={updateTodoItemStatus}
                callRemoveTodoItem={removeTodoItem}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TodoList;
