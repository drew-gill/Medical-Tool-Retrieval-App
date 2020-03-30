const User = require('../models/UserModel.js');
const fs = require('fs');
exports.create = async (req, res) => {
  user = new User({ username: req.body.username, password: req.body.password });
  user.save().then(data => {
    res.send(data);
  });
};

exports.updatePassword = (req, res) => {
  User.findOne({ username: req.body.username}).then(user => {
    if(user){
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
  User.getAuthenticated(req.body.username, req.body.password, function(err, user, reason){
    if(user){
      res.status(200).send({ message: 'User authentication successful' });
    }
    if(reason || err){
      res.status(404).send({ message: 'User authentication failed.' });
    }
  });
};

exports.remove = (req, res) => {
  User.findOneAndRemove({ username: req.body.username}).exec(err => {
    if (err) {
      return res.status(404).send({ message: "Couldn't find user!" });
    }
  });
  return res.status(200).send({ message: 'successful' });
};
