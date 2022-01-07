// Import dependencies
const mongoose = require('mongoose')

// Create schema
const messageSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

// Export model
module.exports = mongoose.model('Message', messageSchema)
