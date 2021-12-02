const Users = require('../users/users-model');
const Posts = require('../posts/posts-model');

const logger = (req, res, next) => {
  console.log('request method:', req.method);
  console.log('request url:', req.url);
  console.log('timestamp:', new Date.now());

  next();
};

const validateUserId = async (req, res, next) => {
  try {
    const user = await Users.getById(req.params.id);
    if (user) {
      req.user = user;
      next();
    } else {
      next({ status: 404, message: 'user not found' });
    }
  } catch (err) {
    next(err);
  }
};

const validateUser = (req, res, next) => {
  // DO YOUR MAGIC
};

const validatePost = (req, res, next) => {
  // DO YOUR MAGIC
};

// eslint-disable-next-line
const errorHandling = (err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: `Horror in the router: ${err.message}`, stack: err.stack });
};

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  errorHandling,
};
