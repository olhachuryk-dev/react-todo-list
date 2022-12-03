import React, { useContext } from "react";

export const TodoContext = React.createContext();

export const useTodo = () => {
  return useContext(TodoContext);
};