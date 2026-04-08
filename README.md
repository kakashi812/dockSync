# dockSync

A collaborative code editor built with React, Monaco Editor, Yjs, Socket.IO, and Express.

This repository contains:
- A Vite + React frontend for the editor UI and presence list.
- A Node.js + Express backend that serves static files and hosts the Socket.IO/Yjs collaboration server.
- A Dockerfile that builds the frontend and bundles it into the backend image for single-container deployment.
- Deployment-ready flow for Amazon ECR (image registry) and Amazon ECS (container orchestration).

## Repository Structure

```text
dockSync/
  dockerfile
  Backend/
    package.json
    server.js
  Frontend/
    package.json
    vite.config.js
    eslint.config.js
    index.html
    src/
      main.jsx
      app/
        App.jsx
        App.css
```

## How It Works

### Frontend (React + Monaco + Yjs)
- `Frontend/src/app/App.jsx`
  - Renders a username join screen.
  - Initializes Monaco editor.
  - Uses `yjs`, `y-monaco`, and `y-socket.io` to sync editor content across users in real time.
  - Tracks connected users through Yjs awareness state.
- `Frontend/src/main.jsx`
  - React app entry point.
- `Frontend/src/app/App.css`
  - Imports Tailwind CSS.
- `Frontend/vite.config.js`
  - Vite config with React and Tailwind plugins.

### Backend (Express + Socket.IO + y-socket.io)
- `Backend/server.js`
  - Serves static frontend assets from `public/`.
  - Creates HTTP server and Socket.IO server.
  - Starts `YSocketIO` for collaborative document syncing.
  - Exposes health endpoint at `GET /health`.
  - Listens on port `3000`.

### Docker Build
- `dockerfile`
  - Stage 1: Builds frontend (`npm run build` in `Frontend`).
  - Stage 2: Installs backend dependencies.
  - Copies frontend `dist/` into backend `public/`.
  - Starts app with `node server.js`.

This produces one container serving both API/socket and frontend UI.

## Tech Stack

- Frontend: React 19, Vite, Monaco Editor, Tailwind CSS
- Collaboration: Yjs, y-monaco, y-socket.io
- Backend: Node.js, Express 5, Socket.IO
- Deployment: Docker, Amazon ECR, Amazon ECS

## Local Development

### Prerequisites
- Node.js 20+
- npm

### 1) Run Backend

```bash
cd Backend
npm install
npm run dev
```

Backend runs on:
- `http://localhost:3000`
- Health check: `http://localhost:3000/health`

### 2) Run Frontend (Vite dev server)

Use a separate terminal:

```bash
cd Frontend
npm install
npm run dev
```

The Vite dev URL is typically `http://localhost:5173`.

Note:
- In development, frontend and backend run on different ports.
- `SocketIOProvider("/", "monaco", ...)` in `App.jsx` assumes same-origin in production. For local split-origin development, configure a proxy or set the socket server URL explicitly.

## Production Run with Docker

From repository root:

```bash
docker build -t docksync:latest -f dockerfile .
docker run -p 3000:3000 docksync:latest
```

Open:
- `http://localhost:3000`


## Important Endpoints

- App: `/`
- Health: `/health`
- Real-time collaboration: Socket.IO endpoint on same host/port

## Scripts

### Backend (`Backend/package.json`)
- `npm run dev`: starts backend with nodemon
- `npm run start`: starts backend with node

### Frontend (`Frontend/package.json`)
- `npm run dev`: starts Vite dev server
- `npm run build`: creates production bundle
- `npm run preview`: previews built frontend
- `npm run lint`: runs ESLint

## Notes

- Root `dockerfile` is lowercase. Ensure CI/CD commands reference the lowercase filename.
- Frontend's `README.md` is still the default Vite template; the root README is the primary project documentation.

