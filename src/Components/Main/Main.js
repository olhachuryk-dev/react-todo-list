import React, { useContext, useState } from "react";
import Card from "../Card/Card";
import MainFooter from "../MainFooter/MainFooter";
import NewItem from "../NewItem/NewItem";
import TodoList from "../TodoList/TodoList";
import "./Main.css";

const DUMMY_TODO_ACTIONS = [
  "Complete online JS course",
  "Jog around the park 3x",
  "10 minutes meditation",
  "Read for 1 hour",
  "Pick up groceries",
  "Complete Todo App",
];
export const generateTodoObj = (todoAction) => {
  return { completed: false, key: Math.random(), action: todoAction };
};
const DUMMY_TODO_LIST = DUMMY_TODO_ACTIONS.map((todoAction) => {
  return generateTodoObj(todoAction);
});

const TodoContext = React.createContext();

export const useTodo = () => {
  return useContext(TodoContext);
};

function Main() {
  const [todoList, setTodoList] = useState(DUMMY_TODO_LIST);
  const [filteredTodoList, setFilteredTodoList] = useState({
    list: todoList,
    is_completed: null,
  });

  function updateTodo (newTodo) {
    setTodoList(newTodo);
    setFilteredTodoList((prevFilter) =>
      getFilteredTodoList(prevFilter.is_completed, newTodo)
    );
  };

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

  return (
    <TodoContext.Provider value={todoList}>
      <main>
        <Card>
          <NewItem callUpdateTodo={updateTodo} />
        </Card>
        <Card>
          <TodoList
            filteredTodoList={filteredTodoList.list}
            callUpdateTodo={updateTodo}
            callReorderList={(reorderedList) => setFilteredTodoList((prevFilter) =>
              getFilteredTodoList(prevFilter.is_completed, reorderedList)
            )}
          />
          <MainFooter
            callUpdateTodo={updateTodo}
            callFilterTodoList={applyFilterOnTodoList}
          />
        </Card>
      </main>
    </TodoContext.Provider>
  );
}

export default Main;
