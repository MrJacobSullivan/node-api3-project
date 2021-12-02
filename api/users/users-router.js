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
  try {
    await Users.remove(req.params.id);
    res.json(req.user);
  } catch (err) {
    next(err);
  }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  try {
    const posts = await Users.getUserPosts(req.params.id);
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.post('/:id/posts', [validateUserId, validatePost], async (req, res, next) => {
  try {
    const post = await Posts.insert({ user_id: req.params.id, text: req.body.text });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

// do not forget to export the router

module.exports = router;
