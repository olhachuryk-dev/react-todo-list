import React, { useState } from "react";
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
const generateTodoObj = (todoAction) => {
  return { completed: false, key: Math.random(), action: todoAction};
};
const DUMMY_TODO_LIST = DUMMY_TODO_ACTIONS.map((todoAction) => {
  return generateTodoObj(todoAction);
});

function Main(props) {
  const [todoList, setTodoList] = useState(DUMMY_TODO_LIST);
  const [filteredTodoList, setFilteredTodoList] = useState({
    list: todoList,
    is_completed: null,
  });
  function submitNewTodo(todoAction) {
    if (todoAction) {
      setTodoList((existingTodoList) => {
        const todoListWithNewItem = [
          generateTodoObj(todoAction),
          ...existingTodoList,
        ];
        setFilteredTodoList((prevFilter) =>
          getFilteredTodoList(prevFilter.is_completed, todoListWithNewItem)
        );
        return todoListWithNewItem;
      });
    }
    return;
  }

  function saveNewItemStatus(status, key) {
    setTodoList((existingTodoList) => {
      const updatedTodo = existingTodoList.map((existingTodoItem) => {
        if (existingTodoItem.key === key) {
          return { ...existingTodoItem, completed: status };
        }
        return existingTodoItem;
      });
      setFilteredTodoList((prevFilter) =>
        getFilteredTodoList(prevFilter.is_completed, updatedTodo)
      );
      return updatedTodo;
    });
  }

  function clearTodoItem(key) {
    setTodoList((existingTodoList) => {
      const cleanedTodo = existingTodoList.filter(
        (existingTodoItem) => existingTodoItem.key !== key
      );
      setFilteredTodoList((prevFilter) =>
        getFilteredTodoList(prevFilter.is_completed, cleanedTodo)
      );
      return cleanedTodo;
    });
  }
  function deleteCompletedAll() {
    setTodoList((existingTodoList) => {
      const activeTodo = existingTodoList.filter(
        (existingTodoItem) => !existingTodoItem.completed
      );
      setFilteredTodoList((prevFilter) =>
        getFilteredTodoList(prevFilter.is_completed, activeTodo)
      );
      return activeTodo;
    });
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

  function reorderList(reorderedList) {
    setTodoList(reorderedList);
  }

  return (
    <main>
      <Card>
        <NewItem
          callSubmitNewTodo={submitNewTodo}
        />
      </Card>
      <Card>
        <TodoList
          todoList={filteredTodoList.list}
          callSaveNewItemStatus={saveNewItemStatus}
          callClearTodoItem={clearTodoItem}
          callReorderList={reorderList}
        />
        <MainFooter
          todoList={todoList}
          callDeleteCompletedAll={deleteCompletedAll}
          callFilterTodoList={applyFilterOnTodoList}
        />
      </Card>
    </main>
  );
}

export default Main;
