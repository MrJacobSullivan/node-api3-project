const Users = require('../users/users-model');

const logger = (req, res, next) => {
  console.log('request method:', req.method);
  console.log('request url:', req.url);
  console.log('timestamp:', Date.now());

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
  if (!req.body.name || !req.body.name.trim()) {
    next({ status: 400, message: 'missing required name field' });
  } else {
    next();
  }
};

const validatePost = (req, res, next) => {
  if (!req.body.text || !req.body.text.trim()) {
    next({ status: 400, message: 'missing required text field' });
  } else {
    next();
  }
};

// eslint-disable-next-line
const errorHandling = (err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
};

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
  errorHandling,
};
