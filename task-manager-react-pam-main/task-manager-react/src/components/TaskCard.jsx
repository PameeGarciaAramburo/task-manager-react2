function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-card-left" onClick={() => onToggle(task.id)}>
        <div className="task-checkbox">
          <span className="task-checkbox-check">✓</span>
        </div>
        <span className="task-title">{task.title}</span>
      </div>
      <button className="task-delete" onClick={() => onDelete(task.id)}>✕</button>
    </div>
  );
}

export default TaskCard