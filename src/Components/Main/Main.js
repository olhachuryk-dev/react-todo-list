import React, { useMemo, useState } from "react";
import { TodoContext } from "../../Context/todoContext";
import Card from "../Card/Card";
import MainFooter from "../MainFooter/MainFooter";
import NewItem from "../NewItem/NewItem";
import TodoList from "../TodoList/TodoList";
import Loading from "../../UI/Loading";
import "./Main.css";
import useTodoFetch from "../../hooks/use-todo-fetch";

export const generateTodoObj = (todoAction, index, id) => {
  return { completed: false, key: id, action: todoAction, order: index };
};

function Main() {
  const { requestResult, useTodoList, updateTodo } = useTodoFetch();
  const { error, isLoading } = requestResult;
  const { todoList, setTodoList } = useTodoList;

  const [isCompletedFilter, setIsCompletedFilter] = useState(null);

  const filteredTodoList = useMemo(
    () =>
      todoList.filter((todoItem) => {
        if (isCompletedFilter === null) return true;
        else return todoItem["completed"] === isCompletedFilter;
      }),
    [todoList, isCompletedFilter]
  );

  function displayList() {
    if (isLoading) {
      return <Loading />;
    } else {
      return (
        <Card>
          <TodoList
            callUpdateTodo={updateTodo}
            callSetTodo={setTodoList}
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
              <NewItem callSetTodo={setTodoList} />
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
