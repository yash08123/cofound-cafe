const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoute.js");
const ideaRoutes = require("./routes/ideaRoutes.js");
const applicationRoutes = require("./routes/applicationRoutes.js");
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS configuration for both development and production
const allowedOrigins = [
  'http://localhost:3000',
  'https://cofound-cafe.vercel.app',
  'http://cofound-cafe.vercel.app'
];

// Apply CORS before any routes
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type', 
    'Accept', 
    'Authorization', 
    'user-id', 
    'Origin',
    'Access-Control-Allow-Origin'
  ]
}));

// Add OPTIONS handling for preflight requests
app.options('*', cors()); // Enable pre-flight for all routes

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ideas", ideaRoutes);
app.use("/api/applications", applicationRoutes);

// Error handling
app.use(errorHandler);

// Handle 404
app.use((req, res) => {
  res.status(404).json({ 
    status: 'error',
    message: 'Route not found' 
  });
});

// Test route to verify CORS
app.get('/api/test-cors', (req, res) => {
  res.json({ 
    message: 'CORS is working',
    origin: req.headers.origin 
  });
});

const startServer = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API URL: http://localhost:${PORT}/api`);
    });

    // Handle server errors
    server.on('error', (error) => {
      console.error('Server error:', error);
      process.exit(1);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
