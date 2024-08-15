import {useState, useEffect, useMemo} from "react";

import TaskCard from "./TaskCard";

const TaskManager = ({loadTasks}) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState();

  const users = useMemo(() => [...new Set(tasks.reduce((acc, task) => {
    acc.push(task.assignee);
    return acc;
  }, []))], [tasks]);

  const statuses = useMemo(() => [...new Set(tasks.reduce((acc, task) => {
    acc.push(task.status);
    return acc;
  }, []))], [tasks]);

  const refreshTasks = () => {
    loadTasks().then((o) => setTasks(o));
  };

  useEffect(() => {
    loadTasks().then((o) => setTasks(o));
  }, [loadTasks]);

  return (
    <div className="p-4 flex gap-4">
      <div className="flex-1">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <input
            type="text"
            placeholder="Search tasks..."
            className="border rounded px-2 py-1"
          />
          <div className="flex-none flex gap-4">
            <button
              data-testid="refresh-button"
              onClick={refreshTasks}
              className="h-10 w-10 rounded border border-gray-300 hover:border-gray-800 text-gray-500 hover:text-gray-800"
            >
              <svg
                data-spaceweb="icon"
                viewBox="0 0 14 14"
                data-testid="refresh-icon"
                data-icon-name="SolidRefresh"
                className="animate-spin w-4 h-4 fill-current inline-block"
              >
                <path
                  d="M11.73 2.265A6.665 6.665 0 006.296.328a6.707 6.707 0 106.74 9.557.84.84 0 00-.754-1.207.816.816 0 00-.738.444 5.026 5.026 0 11-4.552-7.15 4.958 4.958 0 013.538 1.492L9.265 4.729a.838.838 0 00.587 1.434h3.01a.84.84 0 00.837-.838v-3.01a.84.84 0 00-1.433-.595z"></path>
              </svg>
            </button>
            <button className="hidden bg-blue-500 text-white px-4 py-2 rounded">
              Add Task
            </button>
          </div>
        </header>
        <table className="min-w-full bg-white border">
          <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Assignee</th>
            <th className="py-2 px-4 border-b">Due Date</th>
          </tr>
          </thead>
          <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              data-testid={`task-row-${task.id}`}
              className="hover:bg-gray-200 cursor-pointer"
              onClick={() => setSelectedTask(task)}
            >
              <td className="py-2 px-4 border-b" data-cell-type="id">{task.id}</td>
              <td className="py-2 px-4 border-b" data-cell-type="title">{task.title}</td>
              <td className="py-2 px-4 border-b" data-cell-type="status">{task.status}</td>
              <td className="py-2 px-4 border-b" data-cell-type="assignee">{task.assignee}</td>
              <td className="py-2 px-4 border-b" data-cell-type="dueDate">{task.dueDate}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      <div
        className="flex-none transition-all"
        style={{width: selectedTask ? 400 : 0}}
      >
        {selectedTask ? (
          <TaskCard
            task={selectedTask}
            users={users}
            statuses={statuses}
            onSave={console.log}
            onClose={() => setSelectedTask(undefined)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default TaskManager;
