import React, { useContext } from "react";
import { ThemeContext } from "../../App";
import TodoItem from "../TodoItem/TodoItem";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import "./TodoList.css";

function TodoList(props) {
  const isLightMode = useContext(ThemeContext);

  function updateTodoItemStatus(status, key) {
    props.callSaveNewItemStatus(status, key);
  }

  function removeTodoItem(key) {
    props.callClearTodoItem(key);
  }

  const handleOnDragEnd = (result) => {
    if(!result.destination) return; //to avoid errors when dropping outside our dropzone
    const reorderedItem = props.todoList.splice(result.source.index, 1);
    props.todoList.splice(
      result.destination.index,
      0,
      ...reorderedItem
    );
    props.callReorderList(props.todoList);
  };

  return (
    //https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <ul
            className={`todo-list ${!isLightMode && "todo-list__dark"}`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {props.todoList.map((todo, index) => (
              <TodoItem
                todo={todo}
                index={index}
                key={todo.key}
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
