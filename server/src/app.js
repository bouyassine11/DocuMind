import express from "express";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import passport from "./config/passport.js";
import connectDB from "./config/database.js";
import config from "./config/config.js";
import authRoutes from "./routes/auth.js";
import documentRoutes from "./routes/documents.js";
import chatRoutes from "./routes/chat.js";

const app = express();

// Connect to MongoDB
connectDB();

// CORS configuration
app.use(cors({
  origin: config.cors.origin,
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(morgan("dev"));

// Session configuration (required for Passport OAuth)
app.use(session({
  secret: config.jwt.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: config.nodeEnv === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/chat', chatRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'DocuMind API is running!' });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Global error:', err);
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors
    });
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Duplicate field value entered'
    });
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
  
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

export default app;
