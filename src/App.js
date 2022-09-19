import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";
import "./App.css";

const DUMMY_TODO_LIST = [
  {
    completed: true,
    action: "Complete online JS course",
    key: Math.random(),
  },
  {
    completed: false,
    action: "Jog around the park 3x",
    key: Math.random(),
  },
  {
    completed: false,
    action: "10 minutes meditation",
    key: Math.random(),
  },
  {
    completed: false,
    action: "Read for 1 hour",
    key: Math.random(),
  },
  {
    completed: false,
    action: "Pick up groceries",
    key: Math.random(),
  },
  {
    completed: false,
    action: "Complete Todo App",
    key: Math.random(),
  },
];

function App() {
  let [isLightMode, setIsLightMode] = useState(true);
  function toggleLightMode(){
    setIsLightMode((curMode) => {
      return !curMode;
    });
  };
  return (
    <div className={`app-container ${!isLightMode && 'dark-mode'}`}>
      <Header changeLightMode={toggleLightMode} isLightMode={isLightMode} />
      <Main todoList={DUMMY_TODO_LIST} isLightMode={isLightMode} />
      <Footer />
    </div>
  );
}

export default App;
