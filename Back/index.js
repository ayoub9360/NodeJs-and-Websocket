// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Create server
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

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
app.use('/api/message', messageRoutes)
app.use('/api/auth', userRoutes)

// Websocket
const messages = [];
const Message = require('./models/Message')
Message.find()
  .then((message) => {
    messages.push(message)
  })
  io.on('connection', (socket) => {

  console.log('a user connected');

  socket.on('last-messages', function (fn) {
    fn(messages.slice(-50))
  })

  socket.on('send-message', function (message) {    
    // ? Create new message
    const userMessage = new Message({
      userId: message.userId,
      userName: message.userName,
      message: message.message,
    })

    // ? Save the new message
    userMessage
      .save()

    messages[0].push(userMessage)
    socket.broadcast.emit('new-message', userMessage)
  })
})

// Start server
server.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});