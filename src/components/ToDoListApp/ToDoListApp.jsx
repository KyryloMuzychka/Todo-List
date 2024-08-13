import React, { useEffect, useState } from "react";
import { todo_list } from "./ToDoListApp.module.css";
import Header from "../Header/Header";
import AddItem from "../AddItem/AddItem";
import ListItems from "../ListItems/ListItems";

export default function ToDoListApp() {
  const [tasks, setTasks] = useState([
    { title: "1", completed: true, important: true, editing: false },
    { title: "2", completed: false, important: true, editing: false },
    { title: "3", completed: true, important: false, editing: false },
    { title: "4", completed: false, important: false, editing: false },
  ]);

  function addTask(newTask) {
    if (newTask.title.trim() !== "") {
      const index = tasks.findIndex((task) => task.title === newTask.title);
      if (index === -1) {
        setTasks((prevTasks) => [...prevTasks, newTask]);
      }
    }
  }

  function toggleProperty(tasksArray, position, key) {
    const oldTask = tasksArray[position];
    const value = !oldTask[key];

    const updatedTask = { ...tasksArray[position], [key]: value };

    return [
      ...tasksArray.slice(0, position),
      updatedTask,
      ...tasksArray.slice(position + 1),
    ];
  }

  function onToggleCompleted(index) {
    setTasks((tasks) => {
      return toggleProperty(tasks, index, "completed");
    });
  }

  function onToggleImportant(index) {
    setTasks((tasks) => {
      return toggleProperty(tasks, index, "important");
    });
  }

  function onToggleEdit(index) {
    setTasks((tasks) => {
      return toggleProperty(tasks, index, "editing");
    });
  }

  function getCompletedAmount() {
    return Object.values(tasks).reduce((a, task) => a + task.completed, 0);
  }

  useEffect(() => {
    getCompletedAmount;
  }, [tasks]);

  return (
    <div className={todo_list}>
      <Header doneTasks={getCompletedAmount()} allTasks={tasks.length} />
      <AddItem addTask={addTask} />
      <ListItems
        tasks={tasks}
        setTasks={setTasks}
        onToggleCompleted={onToggleCompleted}
        onToggleImportant={onToggleImportant}
        onToggleEdit={onToggleEdit}
      />
    </div>
  );
}
