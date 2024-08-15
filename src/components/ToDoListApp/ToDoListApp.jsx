import React, { useEffect, useState } from "react";
import { todo_list } from "./ToDoListApp.module.css";
import Header from "../Header/Header";
import AddItem from "../AddItem/AddItem";
import ListItems from "../ListItems/ListItems";
import SearchPanel from "../SearchPanel/SearchPanel";

export default function ToDoListApp() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "1", completed: true, important: true, editing: false },
    { id: 2, title: "2", completed: false, important: true, editing: false },
    { id: 3, title: "3", completed: true, important: false, editing: false },
    { id: 4, title: "4", completed: false, important: false, editing: false },
  ]);
  const [filterTasks, setFilterTasks] = useState([]);
  const [filtering, setFiltering] = useState(false);

  function addTask(newTask) {
    const maxId = tasks.reduce((max, task) => Math.max(max, task.id), 0);
    const newId = maxId + 1;
    const newTaskWithId = { ...newTask, id: newId };

    if (newTask.title.trim() !== "") {
      const index = tasks.findIndex((task) => task.title === newTask.title);
      if (index === -1) {
        setTasks((prevTasks) => [...prevTasks, newTaskWithId]);
      }
    }
  }

  function toggleProperty(tasksArray, id, key) {
    return tasksArray.map((task) =>
      task.id === id ? { ...task, [key]: !task[key] } : task
    );
  }

  function onToggleCompleted(id) {
    setTasks((tasks) => {
      return toggleProperty(tasks, id, "completed");
    });
  }

  function onToggleImportant(id) {
    setTasks((tasks) => {
      return toggleProperty(tasks, id, "important");
    });
  }

  function onToggleEdit(id) {
    setTasks((tasks) => {
      return toggleProperty(tasks, id, "editing");
    });
  }

  function getCompletedAmount() {
    return tasks.filter((task) => task.completed).length;
  }

  function searchTasks(searchTitle, filterStatus) {
    let filteredTasks = tasks;

    if (filterStatus === "completed") {
      filteredTasks = filteredTasks.filter((task) => task.completed);
    } else if (filterStatus === "important") {
      filteredTasks = filteredTasks.filter((task) => task.important);
    } else if (filterStatus === "todo") {
      filteredTasks = filteredTasks.filter((task) => !task.completed);
    }

    if (searchTitle.trim() !== "") {
      filteredTasks = filteredTasks.filter((task) =>
        task.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    setFilterTasks(filteredTasks);
  }

  useEffect(() => {
    getCompletedAmount;
    searchTasks;
  }, [tasks]);

  return (
    <div className={todo_list}>
      <Header doneTasks={getCompletedAmount()} allTasks={tasks.length} />
      <AddItem tasks={tasks} addTask={addTask} />
      <ListItems
        tasks={tasks}
        setTasks={setTasks}
        filterTasks={filterTasks}
        onToggleCompleted={onToggleCompleted}
        onToggleImportant={onToggleImportant}
        onToggleEdit={onToggleEdit}
        filtering={filtering}
      />
      <SearchPanel
        searchTasks={searchTasks}
        tasks={tasks}
        setFiltering={setFiltering}
      />
    </div>
  );
}
