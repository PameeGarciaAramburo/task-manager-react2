
function TaskInput({ value, onChange, onAdd }) {
  function handleKey(e) {
    if (e.key === 'Enter') onAdd();
  }
  return (
    <div className="task-input">
      <input
        value={value}
        onChange={onChange}
        onKeyDown={handleKey}
        placeholder="Add a new task..."
      />
      <button onClick={onAdd}>+ Add</button>
    </div>
  );
}

export default TaskInput