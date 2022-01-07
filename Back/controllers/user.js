const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
exports.signup = (req, res, next) => {
  //* Crypt the password
  const { email, password } = req.body
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      //* Then create the new user
      const user = new User({
        email,
        password: hash,
      })
      //* Save the user in the database
      user
        .save()
        .then(() => res.status(201).json({ message: 'User created !' }))
        .catch((error) => res.status(400).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
  //* Get the user from the database
  const { email, password } = req.body
  User.findOne({ email })
    .then((user) => {
      //* Check if the user exists
      if (!user) return res.status(401).json({ error: 'User not found' })
      //* if the user exists check if the password is correct
      bcrypt
        .compare(password, user.password)
        .then((valid) => {
          //* If the password is correct return the user with the token else return invalid password
          if (!valid) return res.status(401).json({ error: 'Invalid password' })
          res.status(200).json({
            token: jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, { expiresIn: '24h' }),
          })
        })
        .catch((error) => res.status(500).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}

exports.user = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
    const userId = decodedToken.userId
    User.findOne({ _id: userId }).then((user) => {
      if (!user) return res.status(401).json({ error: 'User not found' })
      res.status(200).json({
        user: {
          _id: user._id,
          email: user.email,
        },
      })
    })
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}
