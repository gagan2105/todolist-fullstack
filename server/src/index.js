import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
}));

// In-memory storage (replace with database in production)
let todos = [
  { id: uuidv4(), title: 'Learn Node.js', completed: false, createdAt: new Date() },
  { id: uuidv4(), title: 'Build an API', completed: false, createdAt: new Date() },
  { id: uuidv4(), title: 'Deploy to production', completed: false, createdAt: new Date() },
];

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// GET all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// GET single todo by ID
app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.json(todo);
});

// POST create a new todo
app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTodo = {
    id: uuidv4(),
    title: title.trim(),
    completed: false,
    createdAt: new Date(),
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT update a todo
app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);
  
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  const { title, completed } = req.body;

  if (title !== undefined) {
    todo.title = title.trim();
  }
  if (completed !== undefined) {
    todo.completed = completed;
  }

  res.json(todo);
});

// DELETE a todo
app.delete('/api/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  const deletedTodo = todos.splice(index, 1);
  res.json(deletedTodo[0]);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
