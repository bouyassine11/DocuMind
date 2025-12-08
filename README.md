# DocuMind

A full-stack web application with React frontend, Node.js/Express backend, MongoDB database, and professional authentication system including Google OAuth.

## Project Structure

```
documind/
├── client/          # React frontend (Vite)
├── server/          # Node.js/Express backend
└── README.md
```

## Prerequisites

- Node.js 18+
- MongoDB (local installation or cloud instance)
- npm or yarn

## Quick Start

1. **Install MongoDB locally** (if not already installed):
   - Download from https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud)

2. **Start MongoDB service:**
   ```bash
   # On Linux/Mac
   sudo systemctl start mongod
   # Or brew services start mongodb-community (Mac with Homebrew)
   ```

3. **Install server dependencies and start:**
   ```bash
   cd server
   npm install
   npm run start
   ```

4. **Install client dependencies and start (in a new terminal):**
   ```bash
   cd client
   npm install
   npm run dev
   ```

5. **Access the application:**
   - **Landing Page:** http://localhost:5173 (for new visitors)
   - **Login:** http://localhost:5173/login
   - **Register:** http://localhost:5173/register
   - **Backend API:** http://localhost:5000

## Features

### Authentication System
- **Local Authentication:** Email/password registration and login
- **Google OAuth:** One-click sign-in with Google accounts
- **JWT Tokens:** Secure token-based authentication
- **Password Security:** Bcrypt hashing with salt rounds
- **Session Management:** Proper login/logout handling

### Server (Backend)
- **Technology:** Node.js + Express
- **Port:** 5000
- **Features:**
  - REST API with authentication middleware
  - JWT Authentication with Passport.js
  - MongoDB integration with Mongoose
  - Google OAuth 2.0 integration
  - CORS enabled
  - Session management

### Client (Frontend)
- **Technology:** React + Vite + Tailwind CSS
- **Port:** 5173
- **Features:**
  - Modern React with hooks
  - React Router for navigation
  - Tailwind CSS for styling
  - Beautiful landing page for new users
  - Professional authentication UI
  - Protected routes with authentication checks
  - API proxy to backend
  - Responsive design

## Environment Variables

The server uses the following environment variables (configured in `server/.env`):

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/documind
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
CORS_ORIGIN=http://localhost:5173

# Google OAuth (Required for Google sign-in)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
BASE_URL=http://localhost:5000
```

### Google OAuth Setup

To enable Google sign-in, follow these steps:

1. **Go to Google Cloud Console:** https://console.cloud.google.com/
2. **Create a new project** or select an existing one
3. **Enable Google+ API:** Go to "APIs & Services" > "Library" > Search for "Google+ API" > Enable
4. **Create OAuth 2.0 credentials:**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:5000/api/auth/google/callback` (development)
     - Your production URL + `/api/auth/google/callback`
   - Add authorized JavaScript origins:
     - `http://localhost:5173` (development)
     - Your production frontend URL
5. **Copy credentials** to your `.env` file:
   - Client ID → `GOOGLE_CLIENT_ID`
   - Client Secret → `GOOGLE_CLIENT_SECRET`

## Application Routes

### Public Routes (No Authentication Required)
- `/` - Landing page (beautiful marketing page for new visitors)
- `/login` - User login page
- `/register` - User registration page
- `/auth/callback` - Google OAuth callback

### Protected Routes (Authentication Required)
- `/profile` - User profile page (main landing page for logged-in users)
- `/dashboard` - User dashboard

### Routing Logic
- **Unauthenticated users** visiting `/` see the landing page
- **Authenticated users** visiting `/` are redirected to `/profile`
- **Accessing protected routes** without authentication redirects to `/login`
- **Authenticated users** cannot access `/login` or `/register` (redirected to `/profile`)
- **All authentication** redirects users to `/profile` after success

## API Endpoints

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `PUT /api/auth/profile` - Update user profile
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - Google OAuth callback
- `GET /api/auth/me` - Get current user info (requires auth)

### General Endpoints
- `GET /` - Welcome message
- `GET /api/health` - Health check

## Development Commands

### Server
```bash
cd server
npm install          # Install dependencies
npm run start        # Start development server with nodemon
```

### Client
```bash
cd client
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### MongoDB
```bash
# Check MongoDB status
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod

# Stop MongoDB
sudo systemctl stop mongod

# Connect to MongoDB shell
mongosh
```

## Troubleshooting

1. **MongoDB connection issues:**
   - Ensure MongoDB is running: `sudo systemctl status mongod`
   - Check if MongoDB is listening on port 27017
   - Verify `MONGODB_URI` in `server/.env`

2. **Port conflicts:**
   - Ensure ports 5000 and 5173 are available
   - Change ports in `.env` or `vite.config.js` if needed

3. **CORS issues:**
   - Check `CORS_ORIGIN` in `server/.env` matches your frontend URL

4. **Dependencies issues:**
   - Delete `node_modules` and run `npm install` again
   - Clear npm cache: `npm cache clean --force`

## Production Deployment

For production deployment:

1. Update environment variables in `server/.env`
2. Change JWT secret to a secure random string
3. Configure proper CORS origins
4. Set up MongoDB authentication
5. Use a process manager like PM2 for the Node.js server
6. Configure reverse proxy (nginx) for production

## Scripts

### Server Scripts
- `npm run start` - Start server with nodemon (development)

### Client Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## License

ISC
