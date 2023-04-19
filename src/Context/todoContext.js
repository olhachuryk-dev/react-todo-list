import React, { useContext } from "react";

export const TodoContext = React.createContext();

export const useTodoContext = () => {
  return useContext(TodoContext);
};