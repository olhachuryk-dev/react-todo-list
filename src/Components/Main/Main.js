import React, { useEffect, useMemo, useState } from "react";
import { TodoContext } from "../../Context/todoContext";
import Card from "../../UI/Card/Card";
import MainFooter from "../MainFooter/MainFooter";
import NewItem from "../NewItem/NewItem";
import TodoList from "../TodoList/TodoList";
import Loading from "../../UI/Loading/Loading";
import useTodoCRUD from "../../hooks/useTodoCRUD";
import "./Main.css";

export const generateTodoObj = (todoAction, index) => {
  return { completed: false, action: todoAction, order: index };
};
function Main() {
  const { readTodo, updateTodo, todoList, error, loading } = useTodoCRUD();
  const [isCompletedFilter, setIsCompletedFilter] = useState(null);

  useEffect(
    () => {
      readTodo();
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const filteredTodoList = useMemo(
    () =>
      todoList.filter((todoItem) => {
        if (isCompletedFilter === null) return true;
        else return todoItem["completed"] === isCompletedFilter;
      }),
    [todoList, isCompletedFilter]
  );

  function displayList() {
    if (loading) {
      return <Loading />;
    } else {
      return (
        <Card>
          <TodoList
            callUpdateTodo={updateTodo}
            filteredTodoList={filteredTodoList}
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
    <>
      <TodoContext.Provider value={todoList}>
        {error ? (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        ) : (
          <main>
            <Card>
              <NewItem />
            </Card>
            {displayList()}
          </main>
        )}
      </TodoContext.Provider>
      <p className="list-instructions"> Drag and drop to reorder list </p>
    </>
  );
}

export default Main;
