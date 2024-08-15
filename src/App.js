import "./styles.css";
import TaskManager from "./TaskManager";
import data from "./data";

export default function App() {
  let tasks = [...data];

  const loadTasks = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(tasks);
        tasks = [
          {
            ...tasks[0],
            status:
              tasks[0].status === "In Progress" ? "Pending" : "In Progress",
          },
          ...tasks.slice(1),
        ];
      }, 2000);
    });
  };

  return (
    <div className="App">
      <TaskManager loadTasks={loadTasks} />
    </div>
  );
}
