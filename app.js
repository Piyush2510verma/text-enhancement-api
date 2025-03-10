const express = require('express');
const morgan = require('morgan');
const { PORT } = require('./config/env');
const enhanceRoutes = require('./routes/enhanceRoutes');
const modifyRoutes = require('./routes/modifyRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api', enhanceRoutes);
app.use('/api', modifyRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Service is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
