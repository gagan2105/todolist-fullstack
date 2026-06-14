# Full-Stack To-Do App

A simple to-do application demonstrating full-stack deployment with React frontend and Node.js/Express backend.

## Features

- ✅ Add, edit, and delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Real-time API integration
- ✅ Fully responsive design
- ✅ Ready for production deployment

## Project Structure

```
todo-app/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json        # Vercel config for SPA routing
│   └── .env.example
├── server/                # Node.js/Express backend
│   ├── src/
│   │   └── index.js       # Server entry point
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md
```

## Getting Started Locally

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:
```
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Start the backend:
```bash
npm run dev
```

Backend will run at `http://localhost:5000`

### Setup Frontend

In a new terminal:

```bash
cd client
npm install
```

Create a `.env` file in the `client` folder:
```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

Frontend will open at `http://localhost:5173`

## Building for Production

### Backend
```bash
cd server
npm install
npm run build  # If needed
```

### Frontend
```bash
cd client
npm run build
```

This creates a `dist/` folder with optimized production files.

## Deployment Guide

### Deploy Backend to Render

1. Push backend to GitHub (see guide below)
2. Go to [render.com](https://render.com)
3. Create a new Web Service
4. Connect your GitHub repository
5. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `NODE_ENV`: production
     - `PORT`: 5000
     - `CLIENT_URL`: https://your-frontend-url.vercel.app (update after deploying frontend)

### Deploy Frontend to Vercel

1. Push frontend to GitHub (see guide below)
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Configure:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variable**:
     - `VITE_API_URL`: https://your-backend-url.onrender.com/api (get this after deploying backend)

### Push to GitHub

#### Backend
```bash
cd server
git init
git add .
git commit -m "Initial commit - backend"
git remote add origin https://github.com/YOUR_USERNAME/todo-backend.git
git branch -M main
git push -u origin main
```

#### Frontend
```bash
cd client
git init
git add .
git commit -m "Initial commit - frontend"
git remote add origin https://github.com/YOUR_USERNAME/todo-frontend.git
git branch -M main
git push -u origin main
```

## API Endpoints

All endpoints are prefixed with `/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/todos` | Get all todos |
| GET | `/todos/:id` | Get specific todo |
| POST | `/todos` | Create new todo |
| PUT | `/todos/:id` | Update todo |
| DELETE | `/todos/:id` | Delete todo |

### Example Requests

**Create a todo:**
```bash
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn deployment"}'
```

**Get all todos:**
```bash
curl http://localhost:5000/api/todos
```

**Update a todo:**
```bash
curl -X PUT http://localhost:5000/api/todos/todo-id \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

**Delete a todo:**
```bash
curl -X DELETE http://localhost:5000/api/todos/todo-id
```

## Environment Variables

### Backend (server/.env)
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment mode (development/production)
- `CLIENT_URL` - Frontend URL for CORS configuration

### Frontend (client/.env)
- `VITE_API_URL` - Backend API URL

## Troubleshooting

### "Cannot connect to backend"
- Make sure backend is running (`npm run dev` in server folder)
- Check that `VITE_API_URL` environment variable is set correctly
- Verify CORS configuration in backend

### "Port 5000 already in use"
- Either stop the process using port 5000, or change the PORT in `.env`

### "Module not found errors"
- Run `npm install` in both client and server folders
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## Live Demo

Once deployed:
- Frontend: https://your-app.vercel.app
- Backend: https://your-api.onrender.com/api/health

## Additional Resources

- [Deployment Guide](./DEPLOYMENT.md)
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Vite Guide](https://vitejs.dev)
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://docs.render.com)

## License

MIT
