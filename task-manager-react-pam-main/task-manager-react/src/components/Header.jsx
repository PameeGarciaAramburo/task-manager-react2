function Header({ total, completed }) {
  return (
    <div className="header">
      <h1>Task <span>Manager</span></h1>
      <p className="header-counter">{completed} of {total} tasks completed</p>
    </div>
  );
}

export default Header