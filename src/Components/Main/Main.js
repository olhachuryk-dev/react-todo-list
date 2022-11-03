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
  const [isCompletedFilter, setIsCompletedFilter] = useState(null);
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

  function displayList() {
    if (isLoading) {
      return <Loading />;
    } else {
      return (
        <Card>
          <TodoList
            callUpdateTodo={updateTodo}
            callSetTodo={setTodoList}
            filteredTodoList={todoList.filter((todoItem) => {
              if (isCompletedFilter === null) return true;
              else return todoItem["completed"] === isCompletedFilter;
            })}
          />
          <MainFooter
            callUpdateTodo={updateTodo}
            callFilterTodoList={(isCompleted) =>
              setIsCompletedFilter(isCompleted)
            }
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
            <NewItem callSetTodo={setTodoList} />
          </Card>
          {displayList()}
        </main>
      )}
    </TodoContext.Provider>
  );
}

export default Main;
