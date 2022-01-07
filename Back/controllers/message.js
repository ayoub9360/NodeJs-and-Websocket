// Require models
const Message = require('../models/Message')

// Create methods

//* Delete one post
// exports.deletePost = (req, res, next) => {
//   Post.findOne({ _id: req.params.id }).then((post) => {
//     if (!post) {
//       return res.status(404).json({
//         error: 'Post not found!',
//       })
//     }
//     if (post.userId !== req.auth.userId) {
//       return res.status(401).json({
//         error: new Error('Not authorized!'),
//       })
//     }
//     Post.deleteOne({ _id: req.params.id })
//       .then(() => {
//         res.status(200).json({
//           message: 'Deleted!',
//         })
//       })
//       .catch((error) => {
//         res.status(400).json({
//           error,
//         })
//       })
//   })
// }

//* Add one post
exports.createMessage = (req, res, next) => {
  // ? Check if all field are filled
  if (!req.body.userId || !req.body.userName || !req.body.message) {
    res.status(400).json({
      error: 'Veuillez remplir tout les champs !',
    })
  }

  // ? Create new post
  const message = new Message({
    userId: req.body.userId,
    userName: req.body.userName,
    message: req.body.message,
  })

  // ? Save the new post
  message
    .save()
    .then(() => {
      res.status(201).json({
        message: 'Post saved successfully!',
      })
    })
    .catch((error) => {
      res.status(400).json({
        error,
      })
    })
}

//* Modify one post
// exports.modifyPost = (req, res, next) => {
//   const post = new Post({
//     _id: req.params.id,
//     title: req.body.title,
//     description: req.body.description,
//     imageUrl: req.body.imageUrl,
//     price: req.body.price,
//     userId: req.body.userId,
//   })
//   Post.updateOne({ _id: req.params.id }, post)
//     .then(() => {
//       res.status(201).json({
//         message: 'Post updated successfully!',
//       })
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error,
//       })
//     })
// }

//* Get one post
// exports.getOnePost = (req, res, next) => {
//   Post.findOne({ _id: req.params.id })
//     .then((post) => {
//       if (post === null) {
//         res.status(404).json({ error: 'Post not found!' })
//       }
//       res.status(200).json(post)
//     })
//     .catch((error) => {
//       res.status(404).json({ error })
//     })
// }

//* Get all post
exports.getAllMessages = (req, res, next) => {
  Message.find()
    .then((message) => {
      res.status(200).json(message)
    })
    .catch((error) => {
      res.status(400).json({
        error,
      })
    })
}
