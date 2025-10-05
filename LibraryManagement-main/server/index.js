// Import required modules
const express = require('express');
const cors = require('cors');
const logger = require('morgan')
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");

// Import routers
const authRouter = require("./routes/authRouter")
const bookRouter = require("./routes/bookRouter")
const authorRouter = require("./routes/authorRouter")
const borrowalRouter = require("./routes/borrowalRouter")
const genreRouter = require("./routes/genreRouter") 
const userRouter = require("./routes/userRouter") 
const reviewRouter = require("./routes/reviewRouter")

// Configure dotenv for environment variables in production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Setup express
const app = express();
const PORT = process.env.PORT || 8080

// Use morgan for logging
app.use(logger("dev"))

// Set middleware to process form data
app.use(express.urlencoded({extended: false}));

// Connect to DB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to DB on MongoDB Atlas')
  })
  .catch((err) => console.log('DB connection error', err));

// Use CORS for Cross Origin Resource Sharing - UPDATED FOR DEPLOYMENT
app.use(cors({
  origin: [
    "https://lms-frontend-liux.onrender.com",
    "http://localhost:3000",
    "https://lms-git-main-krish-guptas-projects-f5aa8b6e.vercel.app",
    "https://lms-krish-gupta123.vercel.app",
    "https://lms-*.vercel.app",
    "https://lms-*-krish-gupta123.vercel.app"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

// Set middleware to manage sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// Parse cookies used for session management
app.use(cookieParser(process.env.SESSION_SECRET));

// Parse JSON objects in request bodies
app.use(express.json())

// Use passport authentication middleware
app.use(passport.initialize());
app.use(passport.session());

// Initialise passport as authentication middleware
const initializePassport = require("./passport-config");
initializePassport(passport);

// Health Check Route - ADD THIS
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is healthy and running',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Implement routes for REST API
const borrowRequestRouter = require("./routes/borrowRequestRouter");
app.use("/api/auth", authRouter)
app.use("/api/book", bookRouter);
app.use("/api/author", authorRouter);
app.use("/api/borrowal", borrowalRouter);
app.use("/api/genre", genreRouter);
app.use("/api/user", userRouter); 
app.use("/api/review", reviewRouter);
app.use("/api/borrow-request", borrowRequestRouter);

app.get('/', (req, res) => res.json({ 
  message: '🚀 Welcome to Library Management System API',
  health: '/api/health',
  timestamp: new Date().toISOString()
}));

// --- SOCKET.IO SETUP ---
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "https://your-frontend-service.onrender.com",
      "http://localhost:3000",
      "https://lms-git-main-krish-guptas-projects-f5aa8b6e.vercel.app",
      "https://lms-krish-gupta123.vercel.app",
      "https://lms-*.vercel.app"
    ],
    credentials: true,
    methods: ['GET', 'POST']
  }
});

// Make io accessible in controllers
const { setSocketIO } = require('./socket');
setSocketIO(io);

// Store online users (for admin dashboard)
let onlineUsers = new Set();

io.on('connection', (socket) => {
  console.log(`🔌 User connected: ${socket.id}`);
  
  // Add user to online set
  onlineUsers.add(socket.id);
  io.emit('admin:onlineUsers', onlineUsers.size);

  // Listen for custom events (e.g., book issued/returned, reservation, etc.)
  socket.on('activity', (data) => {
    console.log('📊 Activity:', data);
    // Broadcast activity to admin dashboard
    io.emit('admin:activity', data);
  });

  // --- CHAT FEATURE ---
  socket.on('chat:message', (msg) => {
    console.log('💬 Chat message:', msg);
    // Broadcast message to all clients
    io.emit('chat:message', msg);
  });

  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);
    onlineUsers.delete(socket.id);
    io.emit('admin:onlineUsers', onlineUsers.size);
  });
});

// Error Handling Middleware - ADD THIS
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// 404 Handler - ADD THIS
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Replace app.listen with server.listen
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🎯 Server (with WebSocket) listening on port ${PORT}!`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Frontend URLs configured for CORS`);
});