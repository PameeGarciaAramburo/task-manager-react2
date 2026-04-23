import TaskCard from './TaskCard.jsx';
import EmptyState from './EmptyState.jsx';

function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) return <EmptyState />;
  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default TaskList