const User = require('../models/UserModel.js');
const fs = require('fs');
exports.create = async (req, res) => {
  user = new User({ username: req.body.username, password: req.body.password });
  user.save().then(data => {
    res.send(data);
  });
};

exports.updatePassword = (req, res) => {
  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      user.password = req.body.password;
    }
    user.save().then(data => {
      res.send(data);
    });
  });
};

//if user != null, then they were successfully authenticated. return status 200
//if reason != null, they were unsuccessfully authenticated. return status 404
exports.authenticate = (req, res) => {
  User.getAuthenticated(req.body.username, req.body.password, function(
    err,
    user,
    reason
  ) {
    if (user) {
      res.status(200).send({ message: 'User authentication successful.' });
    }
    if (reason || err) {
      let payload = {
        message: 'An unexpected error occurred. Please try again.'
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
  User.findOneAndRemove({ username: req.body.username }).exec(err => {
    if (err) {
      return res.status(404).send({ message: "Couldn't find user!" });
    }
  });
  return res.status(200).send({ message: 'successful' });
};
