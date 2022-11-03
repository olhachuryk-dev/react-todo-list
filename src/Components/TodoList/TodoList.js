import React from "react";
import { useTheme } from "../ThemeContext/ThemeContext";
import { useTodo } from "../Main/Main";
import TodoItem from "../TodoItem/TodoItem";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import useHttp from "../../hooks/use-http";
import "./TodoList.css";

function TodoList(props) {
  const todoList = useTodo();
  const isLightMode = useTheme();
  const { sendRequest } = useHttp();

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

    props.callSetTodo(
      todoList
        .map((e) => {
          if (e.key === reorderedItem[0].key) {
            return {
              ...e,
              order: reorderedItem[0].order,
            };
          } else return e;
        })
        .sort((a, b) => a.order - b.order)
    );
    const requestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        order: reorderedItem[0].order,
      },
    };
    sendRequest(() => {}, reorderedItem[0].key, requestInit);
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
                callUpdateTodoItems={props.callUpdateTodo}
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
