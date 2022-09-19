import React from "react";
import Card from "../Card/Card";
import MainFooter from "../MainFooter/MainFooter";
import NewItem from "../NewItem/NewItem";
import TodoList from "../TodoList/TodoList";
import "./Main.css";

function Main(props) {
  return (
    <main>
      <Card isLightMode = {props.isLightMode}>
        <NewItem isLightMode = {props.isLightMode}/>
      </Card>
      <Card isLightMode = {props.isLightMode}>
        <TodoList todoList={props.todoList} isLightMode = {props.isLightMode}/>
        <MainFooter todoList={props.todoList} isLightMode = {props.isLightMode}/>
      </Card>
    </main>
  );
}

export default Main;
