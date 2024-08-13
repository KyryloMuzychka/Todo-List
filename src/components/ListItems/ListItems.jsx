import React from "react";
import ToDoItem from "../ToDoItem/ToDoItem";
import "./ListItems.module.css";

export default function ListItems({
  tasks,
  setTasks,
  onToggleCompleted,
  onToggleImportant,
}) {
  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  return (
    <ol>
      {tasks.map((task, index) => (
        <li key={index}>
          <ToDoItem
            tasks={tasks}
            task={task}
            deleteTask={() => deleteTask(index)}
            onToggleCompleted={() => onToggleCompleted(index)}
            onToggleImportant={() => onToggleImportant(index)}
            moveTaskDown={() => {
              moveTaskDown(index);
            }}
            moveTaskUp={() => moveTaskUp(index)}
          />
        </li>
      ))}
    </ol>
  );
}
