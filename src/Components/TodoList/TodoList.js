import React from "react";
import { useTheme } from "../ThemeContext/ThemeContext";
import TodoItem from "../TodoItem/TodoItem";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import "./TodoList.css";

function TodoList(props) {
  const isLightMode = useTheme();
  function updateTodoItems(updated) {
    props.callUpdateTodo(updated);
  }

  const handleOnDragEnd = (result) => {
    if(!result.destination) return; //to avoid errors when dropping outside our dropzone
    const reorderedItem = props.filteredTodoList.splice(result.source.index, 1);
    props.filteredTodoList.splice(
      result.destination.index,
      0,
      ...reorderedItem
    );
    props.callReorderList(props.filteredTodoList);
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
            {props.filteredTodoList.map((todo, index) => (
              <TodoItem
                todo={todo}
                index={index}
                key={todo.key}
                callUpdateTodoItems={updateTodoItems}
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
