const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const noteRoutes = require('./routes/noteRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// 1. Connect to Database
connectDB();

const app = express();

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Mount Routes
app.use('/api/notes', noteRoutes);

// 4. Attach Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 [Server Listening]: http://localhost:${PORT}`);
});