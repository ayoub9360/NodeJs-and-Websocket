// Import dependencies
const express = require('express')
const router = express.Router()

// Import controller
const messageController = require('../controllers/message')

// Set routes
// router.delete('/:id', postController.deletePost)
router.post('/', messageController.createMessage)
// router.put('/:id', postController.modifyPost)
// router.get('/:id', postController.getOnePost)
router.get('/', messageController.getAllMessages)

// Export routes
module.exports = router
