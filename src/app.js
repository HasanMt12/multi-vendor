const express = require('express');
const applyMiddleware = require('./middlewares');

// express app
const app = express();
applyMiddleware(app);

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Ok' });
});

app.get('/health', (_req, res) => {
  res.status(200).json({ message: 'Server health Ok' });
});

module.exports = app;
