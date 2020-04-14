const User = require('../models/UserModel.js');

exports.getUser = async (req, res) => {
  if (req.query.id !== undefined) {
    // Return a specific user
    try {
      const user = await User.findById(req.query.id);
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({
          message: 'Failed to find the account associated with this user.',
        });
      }
    } catch (error) {
      res.status(500).send({ message: 'An unexpected error occurred.' });
    }
  } else {
    // Return a list of all users
    try {
      const users = await User.find();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send({ message: 'An unexpected error occurred.' });
    }
  }
};

exports.create = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    const data = await user.save();
    res.status(200).send(data);
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(403)
        .send({ message: 'A user with this username already exists.' });
    } else {
      res.status(500).send({ message: 'An unexpected error occurred.' });
    }
  }
};

exports.updateUser = async (req, res) => {
  const user = await User.findById(req.query.id);
  if (user) {
    if (req.body.username) {
      user.username = req.body.username;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }
    try {
      const data = await user.save();
      res.status(200).send(data);
    } catch (error) {
      if (error.code === 11000) {
        res
          .status(403)
          .send({ message: 'A user with this username already exists.' });
      } else {
        res.status(500).send({ message: 'An unexpected error occurred.' });
      }
    }
  } else {
    res.status(404).send({
      message: 'Failed to find the account associated with this user.',
    });
  }
};

//if user != null, then they were successfully authenticated. return status 200
//if reason != null, they were unsuccessfully authenticated. return status 404
exports.authenticate = (req, res) => {
  User.getAuthenticated(req.body.username, req.body.password, function (
    err,
    user,
    reason
  ) {
    if (user) {
      res.status(200).send(user);
    }
    if (reason || err) {
      let payload = {
        message: 'An unexpected error occurred. Please try again.',
      };
      let status = 400;
      if (reason === 2) {
        status = 412;
        payload.message =
          'Too many failed login attempts. Please wait and try again.';
      } else if (reason === 1 || reason === 3) {
        status = 404;
        payload.message =
          'There is no user associated with this username/password combination.';
      }
      res.status(status).send(payload);
    }
  });
};

exports.remove = (req, res) => {
  User.findByIdAndRemove(req.query.id).exec((err) => {
    if (err) {
      return res.status(404).send({
        message: 'Failed to find the account associated with this user.',
      });
    }
  });
  return res.status(200).send({ message: 'Success.' });
};
