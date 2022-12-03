import { useCallback, useEffect, useState } from "react";
import useHttp from "./use-http";

function useTodoFetch() {
  const [todoList, setTodoList] = useState([]);

  const { sendRequest, error, isLoading } = useHttp();
  const transformTodo = useCallback((todoData) => setTodoList(todoData), []);

  useEffect(() => {
    sendRequest(transformTodo, "", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: null,
    });
  }, [sendRequest, transformTodo]);

  function updateTodo(updatedItem) {
    const updateListStates = () => {
      const result = todoList.map((existingTodoItem) => {
        if (existingTodoItem.key === updatedItem.key) {
          return updatedItem;
        }
        return existingTodoItem;
      });
      setTodoList(result);
    };
    const requestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        completed: updatedItem.completed,
        order: updatedItem.order,
      },
    };
    sendRequest(updateListStates, updatedItem.key, requestInit);
  }

  return {
    requestResult: {error, isLoading},
    useTodoList: {todoList, setTodoList},
    updateTodo: updateTodo
  }
}

export default useTodoFetch;