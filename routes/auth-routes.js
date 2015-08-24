'use strict';

var User = require('../models/user-model');
var jwt = require('jsonwebtoken');

module.exports = function(router) {
  router.post('/auth', function(req, res) {
    User.findOne({name: req.body.name}, function(err, user) {
      if (err) {
        res.status(500).json({msg: 'server error', error: err});
      } else {
        if (!user) {
          res.json({success: false, msg: 'Authentication failed. User not found.'});
        } else if (!user.checkPassword(req.body.password)) {
          res.json({success:false, msg: 'Authenticattion failed. Password does not match.'});
        } else {
          var token = jwt.sign(user, process.env.SECRET, {expiresInMinutes: 5});
          res.json({success: true, msg: 'Authentication successful.', token: jwt.sign(user, process.env.secret, {expiresInMinutes: 10080})});
        }
      }
    });
  });
};
