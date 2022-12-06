import React from "react";
import { useTheme } from "../../Context/themeContext";
import TodoItem from "../TodoItem/TodoItem";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import "./TodoList.css";
import useTodoCRUD from "../../hooks/useTodoCRUD";

function TodoList(props) {
  const isLightMode = useTheme();
  const {updateTodo} = useTodoCRUD();

  const handleOnDragEnd = (result) => {
    if (!result.destination) return; //to avoid errors when dropping outside our dropzone
    const newIndex = result.destination.index;
    const prevIndex = newIndex - 1;
    const nextIndex = newIndex + 1;
    const reorderedItem = props.filteredTodoList.splice(result.source.index, 1);

    props.filteredTodoList.splice(newIndex, 0, ...reorderedItem);

    const newOrder = () => {
      if (nextIndex === props.filteredTodoList.length) {
        return props.filteredTodoList[prevIndex].order + 1;
      } else {
        if (newIndex > 0) {
          return (
            (props.filteredTodoList[nextIndex].order +
              props.filteredTodoList[prevIndex].order) /
            2
          );
        } else {
          return props.filteredTodoList[1].order - 1;
        }
      }
    };
    reorderedItem[0].order = newOrder();

    updateTodo(reorderedItem[0])
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
                callSetTodo={props.callSetTodo}
                todo={todo}
                index={index}
                key={todo.key}
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
