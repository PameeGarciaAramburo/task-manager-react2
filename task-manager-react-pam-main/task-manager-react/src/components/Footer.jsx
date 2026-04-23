function Footer({ remaining, onClearCompleted }) {
  return (
    <div className="footer">
      <span>{remaining} task{remaining !== 1 ? 's' : ''} left</span>
      <button className="footer-clear" onClick={onClearCompleted}>
        Clear completed
      </button>
    </div>
  );
}

export default Footer