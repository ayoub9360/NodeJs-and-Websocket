// Import dependencies
const express = require('express')
const router = express.Router()

// Import controller
const userController = require('../controllers/user')

// Set routes
router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/user', userController.user)

// Export routes
module.exports = router
