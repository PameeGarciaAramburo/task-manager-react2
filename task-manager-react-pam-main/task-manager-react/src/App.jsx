import { useState, useEffect } from 'react'
import './index.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import TaskList from './components/TaskList.jsx';
import TaskInput from './components/TaskInput.jsx';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  // Load tasks from backend
  function loadTasks() {
    fetch("http://localhost:3000/tasks")
      .then(res => res.json())
      .then(data => setTasks(data));
  }

  useEffect(() => {
    loadTasks();
  }, []);

  // POST - Create new task
  function addTask() {
    if (!newTitle.trim()) return;
    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle })
    }).then(() => {
      setNewTitle("");
      loadTasks();
    });
  }

  // DELETE - Remove task
  function deleteTask(id) {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE"
    }).then(() => loadTasks());
  }

  // PUT - Toggle completed
  function toggleTask(id) {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PUT"
    }).then(() => loadTasks());
  }

  // Clear all completed tasks
  function clearCompleted() {
    const completed = tasks.filter(t => t.completed);
    Promise.all(
      completed.map(t =>
        fetch(`http://localhost:3000/tasks/${t.id}`, { method: "DELETE" })
      )
    ).then(() => loadTasks());
  }

  const completedCount = tasks.filter(t => t.completed).length;
  const remaining = tasks.filter(t => !t.completed).length;

  return (
    <>
      <div className="app-container">
        <Header total={tasks.length} completed={completedCount} />
        <TaskInput
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          onAdd={addTask}
        />
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
        <Footer remaining={remaining} onClearCompleted={clearCompleted} />
      </div>
    </>
  );
}

export default App