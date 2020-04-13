const User = require('../models/UserModel.js');

exports.getUser = async (req, res) => {
  if (req.query.id !== undefined) {
    // Return a specific user
    console.log(req.query.id);
    const user = await User.findById(req.query.id);
    if (user) {
      res.status(200).send(user);
    }
  } else {
    // Return a list of all users
    const users = await User.find();
    if (users) {
      res.status(200).send(users);
    }
  }
};

exports.create = async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  const data = await user.save();
  if (data) {
    res.status(200).send(data);
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
    if (req.body.master) {
      // Remove master from other user
      const masterUser = await User.findById(masterId);
      if (masterUser) {
        masterUser.master = false;
        user.master = true;
        await masterUser.save();
      }
    }
    const data = await user.save();
    res.status(200).send(data);
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
      return res.status(404).send({ message: "Couldn't find user!" });
    }
  });
  return res.status(200).send({ message: 'successful' });
};
