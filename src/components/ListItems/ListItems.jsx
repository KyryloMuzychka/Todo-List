import React from "react";
import ToDoItem from "../ToDoItem/ToDoItem";
import "./ListItems.module.css";
import EditItem from "../EditItem/EditItem";

export default function ListItems({
  tasks,
  setTasks,
  onToggleCompleted,
  onToggleImportant,
  onToggleEdit,
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

  function updateTask(index, updatedTask) {
    const updatedTasks = [...tasks];
    if (updatedTask.title.trim() !== "") {
      const position = updatedTasks.findIndex(
        (task) => task.title === updatedTask.title
      );
      if (position === -1) {
        updatedTasks[index] = updatedTask;
        setTasks(updatedTasks);
      }
    }
  }

  return (
    <ol>
      {tasks.map((task, index) => (
        <li key={index}>
          {task.editing && (
            <EditItem
              task={task}
              index={index}
              onToggleEdit={() => onToggleEdit(index)}
              updateTask={updateTask}
            />
          )}
          {!task.editing && (
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
              onToggleEdit={() => onToggleEdit(index)}
            />
          )}
        </li>
      ))}
    </ol>
  );
}
