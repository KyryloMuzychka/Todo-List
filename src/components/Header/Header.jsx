import React from "react";
import { todo_header, header_status, icon } from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

export default function Header({ doneTasks, allTasks }) {
  return (
    <header className={todo_header}>
      <h1>
        <FontAwesomeIcon icon={faList} className={icon}/>
        Todo
      </h1>
      <h2 className={header_status}>
        Status: {doneTasks}/{allTasks}
      </h2>
    </header>
  );
}
