import { useState, useEffect } from 'react'
import TodoList from './components/TodoList'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newTodoTitle, setNewTodoTitle] = useState('')

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`${API_URL}/todos`)
      if (!response.ok) throw new Error('Failed to fetch todos')
      const data = await response.json()
      setTodos(data)
    } catch (err) {
      setError(err.message)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const addTodo = async (e) => {
    e.preventDefault()
    if (!newTodoTitle.trim()) return

    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTodoTitle }),
      })
      if (!response.ok) throw new Error('Failed to add todo')
      const newTodo = await response.json()
      setTodos([...todos, newTodo])
      setNewTodoTitle('')
    } catch (err) {
      setError(err.message)
      console.error(err)
    }
  }

  const toggleTodo = async (id, completed) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      })
      if (!response.ok) throw new Error('Failed to update todo')
      const updated = await response.json()
      setTodos(todos.map(t => (t.id === id ? updated : t)))
    } catch (err) {
      setError(err.message)
      console.error(err)
    }
  }

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete todo')
      setTodos(todos.filter(t => t.id !== id))
    } catch (err) {
      setError(err.message)
      console.error(err)
    }
  }

  return (
    <div className="app">
      <div className="container">
        <h1>My To-Do App</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={addTodo} className="add-todo-form">
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="Add a new todo..."
          />
          <button type="submit" className="btn-add">Add</button>
        </form>

        {loading ? (
          <div className="loading">Loading todos...</div>
        ) : (
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        )}
      </div>
    </div>
  )
}

export default App
