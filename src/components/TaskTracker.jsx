import { useState, useEffect } from 'react';
import { FaTasks } from "react-icons/fa";

function TaskTracker() {
  const [taskInput, setTaskInput] = useState("");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("dailyTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("dailyTasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask() {
    if (taskInput.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: taskInput,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskInput("");
  }

  function handleDeleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  function handleToggleTask(id) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  return (
    <div className="flex flex-col gap-6 mb-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="bg-orange-600 p-3 rounded-2xl">
          <FaTasks className="text-white text-2xl" />
        </div>

        <div>
          <h2 className="text-white text-2xl font-bold">Daily Tasks</h2>
          <p className="text-gray-400">Stay productive daily</p>
        </div>
      </div>

      {/* Input + Add Button */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add task..."
          className="flex-1 bg-[#0F172A] text-white p-3 rounded-xl outline-none"
        />
        <button
          onClick={handleAddTask}
          className="bg-green-500 px-5 rounded-xl text-white font-semibold"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-[#0F172A] p-4 rounded-xl flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task.id)}
              />
              <p
                className={`text-white ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.text}
              </p>
            </div>

            <button
              onClick={() => handleDeleteTask(task.id)}
              className="bg-red-500 px-3 py-1 rounded-lg text-white"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskTracker;
