// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const { Server } = require("socket.io");
const io = new Server(server);
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Create express instance
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL,
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((e) => console.log('Connexion à MongoDB échouée !'));

// Set CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Import routes
const userRoutes = require('./routes/user')
const messageRoutes = require('./routes/message')

// Use routes
app.use(express.json())
app.use('/message', messageRoutes)
app.use('/auth', userRoutes)

io.on('connection', (socket) => {
  console.log('a user connected');
});

module.exports = app;
