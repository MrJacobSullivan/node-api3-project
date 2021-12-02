const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const Users = require('./users-model');
const Posts = require('../posts/posts-model');

const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await Users.get();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', validateUserId, async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (err) {
    next(err);
  }
});

router.post('/', validateUser, async (req, res, next) => {
  try {
    const user = await Users.insert({ name: req.body.name });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', [validateUserId, validateUser], async (req, res, next) => {
  try {
    const user = await Users.update(req.params.id, { name: req.body.name });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id

  try {
    const user = await Users.delete(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id

  try {
    const posts = await Posts.getById(req.params.id);
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.post('/:id/posts', [validateUserId, validatePost], async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  try {
    const post = await Posts.insert(req.params.id, req.body.text);
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// do not forget to export the router

module.exports = router;
