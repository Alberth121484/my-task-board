# My Task Board - Frontend

React + Vite + TailwindCSS frontend for the My Task Board application.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Zustand** - State management
- **React Router** - Routing

## Project Structure

```
client/
├── public/
│   └── icons/           # SVG icons
├── src/
│   ├── components/      # Reusable components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── store/           # Zustand stores
│   ├── styles/          # CSS files
│   ├── App.jsx          # Main app with routes
│   └── main.jsx         # Entry point
├── .env.example         # Environment template
├── netlify.toml         # Netlify config
├── tailwind.config.js   # Tailwind config
└── vite.config.js       # Vite config
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://api.example.com/api` |

## Deployment

### Netlify (Recommended)

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Set base directory to `client`

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Set Environment Variables**
   - Go to Site settings → Environment variables
   - Add `VITE_API_URL` with your backend URL:
     ```
     VITE_API_URL=https://your-backend.railway.app/api
     ```

4. **Deploy!**

### Vercel

1. Import your repository on [Vercel](https://vercel.com)
2. Set root directory to `client`
3. Add environment variable `VITE_API_URL`
4. Deploy

### Manual Build

```bash
# Install dependencies
npm install

# Set API URL for production
export VITE_API_URL=https://your-backend-url.com/api

# Build for production
npm run build

# Preview the build locally
npm run preview
```

The built files will be in the `dist` folder. Upload these to any static hosting.

## Development

### API Proxy

During development, API requests to `/api` are proxied to `http://localhost:3001` via Vite's dev server. Make sure the backend is running.

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Features

- ✅ Create and manage task boards
- ✅ Add, edit, delete tasks
- ✅ Task status tracking (Todo, In Progress, Completed, Won't Do)
- ✅ Custom task icons
- ✅ Inline editing for board name/description
- ✅ Share boards via URL
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations
- ✅ Toast notifications
- ✅ Persistent board storage
