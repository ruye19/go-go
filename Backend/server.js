require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require('./config/database');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/accommodations', require('./Routes/accommodationRoutes'));
app.use('/api/explore', require('./Routes/exploreItemRoutes'));
app.use('/api/travel-agencies', require('./Routes/travelAgencyRoutes'));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
