import {
  child,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import database from "../firebase";

export default function useTodoCRUD() {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuthContext();

  function transformTodoList(data) {
    if (!data) return [];
    const todoData = Object.entries(data).map((todoItem) => {
      return { ...todoItem[1], key: todoItem[0] };
    });
    todoData.sort((a, b) => a.order - b.order);
    return todoData;
  }

  function readTodo() {
    setLoading(true);
    setError("");
    //https://firebase.google.com/docs/database/web/read-and-write#web_value_events
    const todoData = ref(database, `users/${currentUser.uid}/todos`);
    onValue(
      todoData,
      (snapshot) => {
        const data = snapshot.val();
        setTodoList(transformTodoList(data));
        setLoading(false);
      },
      (error) => setError(error.message)
    );
  }

  function updateTodo(todo) {
    setLoading(true);
    setError("");
    //https://firebase.google.com/docs/database/web/read-and-write#basic_write
    set(ref(database, `users/${currentUser.uid}/todos/${todo.key}`), {
      action: todo.action,
      completed: todo.completed,
      order: todo.order,
    })
      .then(setLoading(false))
      .catch((error) => setError(error.message));
  }

  function deleteTodo(todo) {
    setLoading(true);
    setError("");
    //https://firebase.google.com/docs/database/web/read-and-write#basic_write
    remove(ref(database, `users/${currentUser.uid}/todos/${todo.key}`))
      .then(setLoading(false))
      .catch((error) => setError(error.message));
  }

  function writeNewTodo(todoItem) {
    setLoading(true);
    setError("");
    // Get a key for a new Post.
    const newTodoKey = push(
      child(ref(database), `users/${currentUser.uid}/todos`)
    ).key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates[`/users/${currentUser.uid}/todos/${newTodoKey}`] = todoItem;

    return update(ref(database), updates)
      .then(setLoading(false))
      .catch((error) => setError(error.message));
  }

  return {
    readTodo,
    writeNewTodo,
    updateTodo,
    deleteTodo,
    todoList,
    error,
    loading,
  };
}
