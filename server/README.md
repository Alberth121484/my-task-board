# My Task Board - Backend API

Express.js + SQLite backend for the My Task Board application.

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/boards/:id` | Get board with tasks |
| POST | `/api/boards` | Create new board |
| PUT | `/api/boards/:id` | Update board |
| DELETE | `/api/boards/:id` | Delete board |
| POST | `/api/boards/:id/tasks` | Add task to board |
| GET | `/api/tasks/:id` | Get single task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `HOST` | Server host | `0.0.0.0` |
| `NODE_ENV` | Environment | `development` |
| `DATABASE_PATH` | SQLite database path | `./database.sqlite` |
| `ALLOWED_ORIGINS` | CORS allowed origins (comma-separated) | `http://localhost:5173` |

## Deployment

### Railway

1. Create a new project on [Railway](https://railway.app)
2. Connect your GitHub repository
3. Set environment variables:
   - `NODE_ENV=production`
   - `ALLOWED_ORIGINS=https://your-frontend-url.netlify.app`
4. Deploy!

### Render

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Set:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variables in the dashboard
5. Deploy!

### Manual Deployment

```bash
# Install production dependencies
npm install --production

# Set environment variables
export NODE_ENV=production
export PORT=3001
export ALLOWED_ORIGINS=https://your-frontend-url.com

# Start server
npm start
```

## Database

The application uses SQLite with `better-sqlite3`. The database file is created automatically on first run.

**Note:** On cloud platforms with ephemeral filesystems (like Railway free tier), the database will reset on each deployment. For production, consider using a managed database service.

## Project Structure

```
server/
├── src/
│   ├── database/
│   │   └── init.js       # Database initialization
│   ├── models/
│   │   ├── Board.js      # Board model
│   │   ├── Task.js       # Task model
│   │   └── index.js
│   ├── routes/
│   │   ├── boards.js     # Board routes
│   │   └── tasks.js      # Task routes
│   └── index.js          # Entry point
├── .env.example
├── package.json
├── Procfile              # Heroku/Railway
├── railway.json          # Railway config
└── render.yaml           # Render config
```
