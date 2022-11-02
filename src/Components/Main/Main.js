import React, { useCallback, useContext, useEffect, useState } from "react";
import Card from "../Card/Card";
import MainFooter from "../MainFooter/MainFooter";
import NewItem from "../NewItem/NewItem";
import TodoList from "../TodoList/TodoList";
import useHttp from "../../hooks/use-http";
import "./Main.css";
import Loading from "../../UI/Loading";

export const generateTodoObj = (todoAction, index, id) => {
  return { completed: false, key: id, action: todoAction, order: index };
};

const TodoContext = React.createContext();

export const useTodo = () => {
  return useContext(TodoContext);
};

function Main() {
  const [todoList, setTodoList] = useState([]);
  const [filteredTodoList, setFilteredTodoList] = useState({
    list: [],
    is_completed: null,
  });
  const { sendRequest, error, isLoading } = useHttp();
  const transformTodo = useCallback((todoData) => {
    setTodoList(todoData);
    setFilteredTodoList((prevFilter) => {
      return {
        list: todoData,
        is_completed: prevFilter ? prevFilter.is_completed : null,
      };
    });
  }, []);

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
      transformTodo(result);
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


  function getFilteredTodoList(isCompleted, listToFilter = todoList) {
    if (isCompleted !== null) {
      const filteredList = listToFilter.filter(
        (todoItem) => todoItem["completed"] === isCompleted
      );
      return { list: filteredList, is_completed: isCompleted };
    } else {
      return { list: listToFilter, is_completed: null };
    }
  }

  function applyFilterOnTodoList(isCompleted) {
    setFilteredTodoList(getFilteredTodoList(isCompleted));
  }

  function displayList() {
    if (isLoading) {
      return <Loading />;
    } else {
      return (
        <Card>
          <TodoList
            filteredTodoList={filteredTodoList.list}
            callUpdateTodo={updateTodo}
            callSetTodo={transformTodo}
            callReorderList={(reorderedList) => setFilteredTodoList((prevFilter) =>
              getFilteredTodoList(prevFilter.is_completed, reorderedList)
            )}
          />
          <MainFooter
            callUpdateTodo={updateTodo}
            callFilterTodoList={applyFilterOnTodoList}
          />
        </Card>
      );
    }
  }

  return (
    <TodoContext.Provider value={todoList}>
      {error ? (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      ) : (
        <main>
          <Card>
            <NewItem callSetTodo={transformTodo} />
          </Card>
          {displayList()}
        </main>
      )}
    </TodoContext.Provider>
  );
}

export default Main;
