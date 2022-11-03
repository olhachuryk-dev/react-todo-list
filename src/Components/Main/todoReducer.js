function todoReducer(todoList, action) {
  switch (action.type) {
    case "show all": {
      return todoList;
    }
    case "show active": {
      return todoList.filter((todoItem) => todoItem["completed"] === false);
    }
    case "show completed": {
      return todoList.filter((todoItem) => todoItem["completed"] === true);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export default todoReducer;