# My Task Board

A full-stack task management application built with React and Express.js.

![Task Board Preview](https://github.com/user-attachments/assets/86d1ed0f-a273-4824-91f9-45d2136a7503)
![Task Board Form Preview](https://github.com/user-attachments/assets/99ed36e8-d9ab-4874-a81a-4f029bf08fb5)


## Features

- ✅ Create and manage task boards
- ✅ Add, edit, and delete tasks
- ✅ Customize task icons and status
- ✅ Edit board name and description
- ✅ Unique board URLs for sharing
- ✅ Responsive design (mobile, tablet, desktop)

## Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Zustand** - State management
- **React Router** - Routing

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **SQLite** - Database
- **better-sqlite3** - SQLite driver

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-task-board
```

2. Install all dependencies:
```bash
npm run install:all
```

3. Set up environment variables:
```bash
# Copy example env files
cp server/.env.example server/.env
cp client/.env.example client/.env
```

4. Start development servers:
```bash
npm run dev
```

This will start:
- Frontend at `http://localhost:5173`
- Backend at `http://localhost:3001`

## Project Structure

```
my-task-board/
├── client/                 # React frontend
│   ├── public/
│   │   └── icons/         # Task and UI icons
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── store/         # Zustand store
│   │   ├── pages/         # Page components
│   │   └── styles/        # CSS files
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Route handlers
│   │   ├── models/        # Database models
│   │   └── database/      # SQLite setup
│   └── package.json
└── package.json           # Root package.json
```

## API Endpoints

### Boards

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/boards/:id` | Get board by ID |
| POST | `/api/boards` | Create new board |
| PUT | `/api/boards/:id` | Update board |
| DELETE | `/api/boards/:id` | Delete board |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

## Deployment

### Frontend
Deploy to Netlify or Vercel.

### Backend
Deploy to Railway, Render, or Vercel.

## License

MIT
