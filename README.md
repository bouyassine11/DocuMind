<div align="center">

# 🧠 DocuMind

### AI-Powered Document Intelligence Platform

*Transform your documents into interactive conversations with advanced AI*

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6+-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [API Reference](#-api-reference)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Configuration](#-configuration)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Development](#-development)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

---

## 🌟 Overview

**DocuMind** is a full-stack AI-powered document intelligence platform that enables users to upload documents and engage in intelligent conversations about their content. Built with modern web technologies and powered by OpenAI's GPT models, DocuMind transforms static documents into interactive knowledge bases.

### Why DocuMind?

- 🤖 **AI-Powered Analysis** - Leverage GPT-3.5-turbo for intelligent document understanding
- 📄 **Multi-Format Support** - Upload PDF and text documents seamlessly
- 💬 **Interactive Chat** - Ask questions, get summaries, and extract insights
- 🔐 **Secure Authentication** - JWT-based auth with Google OAuth integration
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 💾 **Persistent History** - Never lose your conversation context

---

## ✨ Features

### 🎯 Core Capabilities

| Feature | Description |
|---------|-------------|
| **Document Upload** | Support for PDF and text file formats with automatic text extraction |
| **AI Conversations** | Natural language interactions powered by OpenAI GPT-3.5-turbo |
| **Smart Analysis** | Ask questions, generate summaries, and extract key insights |
| **Chat History** | Persistent conversation storage for each document |
| **Document Management** | Organize, view, and delete your uploaded documents |

### 🔒 Authentication & Security

- **Local Authentication** - Secure email/password registration with bcrypt hashing
- **Google OAuth 2.0** - One-click sign-in with Google accounts
- **JWT Tokens** - Stateless authentication with secure token management
- **Protected Routes** - Role-based access control for sensitive endpoints
- **Session Management** - Proper login/logout flow with token refresh

### 🎨 User Experience

- **Modern Landing Page** - Professional marketing page for new visitors
- **Intuitive Dashboard** - Clean interface for document management
- **Real-time Chat UI** - Responsive chat interface with typing indicators
- **Mobile Responsive** - Optimized for desktop, tablet, and mobile devices
- **Dark Mode Ready** - Tailwind CSS with customizable themes

---

## 🛠 Tech Stack

### Frontend
```
React 18          - UI library
Vite              - Build tool & dev server
Tailwind CSS      - Utility-first CSS framework
React Router      - Client-side routing
Axios             - HTTP client
```

### Backend
```
Node.js           - Runtime environment
Express           - Web application framework
MongoDB           - NoSQL database
Mongoose          - MongoDB ODM
Passport.js       - Authentication middleware
JWT               - Token-based authentication
OpenAI API        - AI/ML capabilities
```

### DevOps & Tools
```
Nodemon           - Development auto-reload
ESLint            - Code linting
PDF-Parse         - PDF text extraction
Bcrypt            - Password hashing
CORS              - Cross-origin resource sharing
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** `18.x` or higher ([Download](https://nodejs.org/))
- **MongoDB** `6.x` or higher ([Download](https://www.mongodb.com/try/download/community))
- **npm** or **yarn** package manager
- **OpenAI API Key** ([Get one here](https://platform.openai.com/api-keys))
- **Google OAuth Credentials** (optional, for Google sign-in)

---

## 🚀 Quick Start

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/documind.git
cd documind
```

### 2️⃣ Set Up MongoDB

**Option A: Local Installation**
```bash
# Linux/Ubuntu
sudo systemctl start mongod

# macOS (with Homebrew)
brew services start mongodb-community

# Windows
net start MongoDB
```

**Option B: MongoDB Atlas (Cloud)**
- Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get your connection string

### 3️⃣ Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cd server
cp .env.example .env  # If example exists, otherwise create new file
```

Edit `server/.env` with your credentials:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
CORS_ORIGIN=http://localhost:5173

# Database
MONGODB_URI=mongodb://localhost:27017/documind

# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
BASE_URL=http://localhost:5000

# OpenAI
OPENAI_API_KEY=your_openai_api_key_here
```

### 4️⃣ Install Dependencies & Start

**Terminal 1 - Backend:**
```bash
cd server
npm install
npm run start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm install
npm run dev
```

### 5️⃣ Access the Application

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000](http://localhost:5000)
- **API Health Check:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## ⚙️ Configuration

### 🔑 Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Google+ API**:
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google+ API" → Enable
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - **Authorized redirect URIs:**
     - `http://localhost:5000/api/auth/google/callback`
   - **Authorized JavaScript origins:**
     - `http://localhost:5173`
5. Copy Client ID and Client Secret to your `.env` file

### 🤖 OpenAI API Setup

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account and add billing information
3. Generate a new API key
4. Add the key to your `.env` file as `OPENAI_API_KEY`

> **Note:** DocuMind uses GPT-3.5-turbo for cost efficiency. You can modify the model in the chat service.

---

## 📁 Project Structure

```
documind/
├── client/                      # React Frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API service layer
│   │   ├── context/            # React context providers
│   │   ├── hooks/              # Custom React hooks
│   │   ├── utils/              # Utility functions
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # Entry point
│   ├── public/                 # Static assets
│   ├── package.json
│   └── vite.config.js          # Vite configuration
│
├── server/                      # Node.js Backend
│   ├── src/
│   │   ├── config/             # Configuration files
│   │   ├── controllers/        # Route controllers
│   │   ├── middleware/         # Express middleware
│   │   ├── models/             # Mongoose models
│   │   ├── routes/             # API routes
│   │   ├── services/           # Business logic
│   │   ├── utils/              # Utility functions
│   │   └── server.js           # Entry point
│   ├── uploads/                # Document storage
│   ├── package.json
│   └── .env                    # Environment variables
│
└── README.md                    # This file
```

---

## 🌐 API Reference

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register new user | ❌ |
| `POST` | `/api/auth/login` | Login user | ❌ |
| `POST` | `/api/auth/logout` | Logout user | ✅ |
| `GET` | `/api/auth/me` | Get current user | ✅ |
| `PUT` | `/api/auth/profile` | Update profile | ✅ |
| `GET` | `/api/auth/google` | Initiate Google OAuth | ❌ |
| `GET` | `/api/auth/google/callback` | Google OAuth callback | ❌ |

### Document Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/documents/upload` | Upload document | ✅ |
| `GET` | `/api/documents` | Get all user documents | ✅ |
| `GET` | `/api/documents/:id` | Get specific document | ✅ |
| `DELETE` | `/api/documents/:id` | Delete document | ✅ |

### Chat Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/chat/:documentId/message` | Send message to AI | ✅ |
| `GET` | `/api/chat/:documentId/history` | Get chat history | ✅ |
| `DELETE` | `/api/chat/:documentId/history` | Clear chat history | ✅ |

### General Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/` | Welcome message | ❌ |
| `GET` | `/api/health` | Health check | ❌ |

---

## 🔄 Application Routes

### Public Routes (No Authentication)

- `/` - Landing page with marketing content
- `/login` - User login page
- `/register` - User registration page
- `/auth/callback` - OAuth callback handler

### Protected Routes (Authentication Required)

- `/profile` - User profile and settings
- `/dashboard` - Main user dashboard
- `/documents` - Document management interface
- `/chat/:documentId` - AI chat interface for specific document

### Routing Logic

```
Unauthenticated User → / → Landing Page
Authenticated User → / → Redirect to /profile
Protected Route Access → Redirect to /login
Login/Register (Authenticated) → Redirect to /profile
```

---

## 💻 Development

### Available Scripts

#### Server Commands

```bash
npm run start          # Start with nodemon (auto-reload)
npm run dev            # Development mode
npm run prod           # Production mode
```

#### Client Commands

```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run preview        # Preview production build
npm run lint           # Run ESLint
```

#### MongoDB Commands

```bash
# Check status
sudo systemctl status mongod

# Start service
sudo systemctl start mongod

# Stop service
sudo systemctl stop mongod

# Restart service
sudo systemctl restart mongod

# Connect to shell
mongosh
```

### Development Workflow

1. **Start MongoDB** service
2. **Run backend** in one terminal: `cd server && npm run start`
3. **Run frontend** in another terminal: `cd client && npm run dev`
4. **Access application** at `http://localhost:5173`
5. **Make changes** - both servers auto-reload on file changes

---

## 🚢 Deployment

### Production Checklist

- [ ] Update `JWT_SECRET` to a strong random string
- [ ] Configure production `MONGODB_URI` with authentication
- [ ] Set `NODE_ENV=production`
- [ ] Update `CORS_ORIGIN` to production frontend URL
- [ ] Configure Google OAuth with production callback URLs
- [ ] Set up SSL/TLS certificates
- [ ] Configure reverse proxy (nginx/Apache)
- [ ] Set up process manager (PM2)
- [ ] Enable MongoDB authentication
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy

### Deployment Example (PM2)

```bash
# Install PM2 globally
npm install -g pm2

# Start backend
cd server
pm2 start src/server.js --name documind-api

# Build frontend
cd ../client
npm run build

# Serve with nginx or PM2
pm2 serve dist 5173 --name documind-frontend

# Save PM2 configuration
pm2 save
pm2 startup
```

### Environment Variables (Production)

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/documind
JWT_SECRET=<generate-strong-secret>
CORS_ORIGIN=https://yourdomain.com
GOOGLE_CLIENT_ID=<production-client-id>
GOOGLE_CLIENT_SECRET=<production-client-secret>
BASE_URL=https://api.yourdomain.com
OPENAI_API_KEY=<your-api-key>
```

---

## 🔧 Troubleshooting

### Common Issues

#### MongoDB Connection Failed

```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log

# Verify connection string in .env
MONGODB_URI=mongodb://localhost:27017/documind
```

#### Port Already in Use

```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change port in .env
PORT=5001
```

#### CORS Errors

- Ensure `CORS_ORIGIN` in `server/.env` matches your frontend URL
- Check that both servers are running
- Clear browser cache and cookies

#### Google OAuth Not Working

- Verify redirect URIs in Google Cloud Console
- Check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`
- Ensure `BASE_URL` is correct

#### OpenAI API Errors

- Verify API key is valid and has credits
- Check API rate limits
- Ensure billing is set up on OpenAI account

#### Dependencies Issues

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">

### 🌟 Star this repo if you find it helpful!

Made with ❤️ by the DocuMind Team

[Report Bug](https://github.com/yourusername/documind/issues) • [Request Feature](https://github.com/yourusername/documind/issues)

</div>
