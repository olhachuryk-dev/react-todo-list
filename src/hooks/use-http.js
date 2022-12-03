import { useCallback, useState } from "react";
import { useAuth } from "../Context/AuthContext";

function useHttp() {
  const {currentUser} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = useCallback((setDataFn, urlExtension, requestInit) => {
    fetch(
      `https://todo-app-1719e-default-rtdb.europe-west1.firebasedatabase.app/user/${currentUser.uid}/${
        urlExtension ? urlExtension : ""
      }.json`,
      {
        method: requestInit.method ? requestInit.method : "GET",
        headers: requestInit.headers ? requestInit.headers : {},
        body: requestInit.body ? JSON.stringify(requestInit.body) : null,
      }
    )
      .then((response) => {
        if (!response) {
          throw new Error("Failed to fetch");
        }
        if (requestInit.method === "GET") {
          setIsLoading(true);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          if (requestInit.method === "GET") {
            const todoData = Object.entries(data).map((todoItem) => {
              return { ...todoItem[1], key: todoItem[0] };
            });
            todoData.sort((a, b) => a.order - b.order);
            setDataFn(todoData);
          } else {
            setDataFn(data.name);
          }
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message || "Something went wrong :(");
      });
  }, [currentUser]);
  return {
    sendRequest,
    error,
    isLoading,
  };
}

export default useHttp;
