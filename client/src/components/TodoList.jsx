function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return <div className="empty-message">No todos yet. Add one to get started!</div>
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id, todo.completed)}
          />
          <span className="todo-text">{todo.title}</span>
          <button 
            className="btn-delete" 
            onClick={() => onDelete(todo.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TodoList
