import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskItem from "./components/TaskItem/TaskItem";
import TaskInfo from "./components/TaskInfo/TaskInfo";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isAllTasksDone, setIsAllTasksDone] = useState(false);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    setTasks(tasks || []);
  }, []);

  const addTaskHandler = (name) => {
    if (name.trim().length === 0) return;

    setTasks((previous) => {
      return [
        ...previous,
        {
          name: name,
          done: false,
        },
      ];
    });
  };

  const updateTaskDone = (newIndex, newDone) => {
    setTasks((previous) => {
      const newTasks = [...previous];
      newTasks[newIndex].done = newDone;
      return newTasks;
    });
  };

  const deleteTaskHandler = (indexTaskToDelete) => {
    setTasks((previous) => {
      return previous.filter((task, index) => {
        return index !== indexTaskToDelete;
      });
    });
  };

  const renameTaskHandler = (index, newName) => {
    setTasks((previous) => {
      const newTasks = [...previous];
      newTasks[index].name = newName;
      return newTasks;
    });
  };

  const chooseAllTasksHandler = (event) => {
    event.preventDefault();
    setIsAllTasksDone(!isAllTasksDone);

    if (tasks.length > 0) {
      const updatedTasks = tasks.map((task) => ({
        ...task,
        done: !isAllTasksDone,
      }));

      setTasks(updatedTasks);
    }
  };

  const deleteAllTasksHandler = (event) => {
    event.preventDefault();
    setTasks([]);
    localStorage.clear();
  };

  return (
    <div>
      <div className="background"></div>
      <h1 className="title">TODO</h1>

      <main>
        <TaskInfo tasks={tasks} />
        <TaskForm
          onAdd={addTaskHandler}
          onChooseAllTasks={chooseAllTasksHandler}
          onDeleteAllTasks={deleteAllTasksHandler}
        />
        {tasks.map((task, index) => (
          <TaskItem
            {...task}
            key={index}
            onDeleteTask={() => deleteTaskHandler(index)}
            onToggle={(done) => updateTaskDone(index, done)}
            onRenameTask={(newName) => renameTaskHandler(index, newName)}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
