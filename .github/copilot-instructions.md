# Full-Stack To-Do App - Development Guide

## Project Overview
This is a full-stack to-do application with React frontend and Node.js/Express backend, ready for deployment to Vercel and Render.

## Project Structure
- **client/** - React + Vite frontend
- **server/** - Node.js + Express backend
- Monorepo structure for easy deployment

## Installation & Setup

### Backend
```bash
cd server
npm install
npm run dev
```
Runs on `http://localhost:5000`

### Frontend
```bash
cd client
npm install
npm run dev
```
Runs on `http://localhost:5173`

## Environment Variables

### Server (.env)
```
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Client (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Build for Production

**Backend:**
```bash
npm install  # In server folder
```

**Frontend:**
```bash
npm run build  # In client folder (creates dist/)
```

## Deployment
- **Frontend**: Deploy to Vercel
- **Backend**: Deploy to Render
- See [README.md](../README.md) for detailed deployment steps

## Key Files
- [README.md](../README.md) - Main documentation
- [client/vercel.json](../client/vercel.json) - SPA routing config
- [server/src/index.js](../server/src/index.js) - API server
- [client/src/App.jsx](../client/src/App.jsx) - Frontend app

## Git Ignore
Ensure `.env`, `node_modules/`, and `dist/` are not committed.
