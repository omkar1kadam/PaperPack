const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db/db'); // adjust if your db.js is in ./config/db
require('dotenv').config();

connectDB();

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/devices', require('./routes/devices'));
app.use('/api/sensor', require('./routes/sensor'));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Data Logger Backend Running 🚀' });
});

module.exports = app;
