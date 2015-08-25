'use strict';

var express = require('express');
var router = express.Router;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('../models/user-model');
var Wishlist = require('../models/wishlist-model');
var Item = require('../models/item-model');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var verify = require('../middlewares/verify');

module.exports = function(router) {
  router.use(bodyParser.json());

  // POST to create a new user
  router.post('/users', function(req, res) {
    var user = new User(req.body);
    console.log(req.body);
    user.password = user.generateHash(user.password);
    console.log(user.password);
    user.save(function(err, data) {
      if (err) {
        res.status(500).json({msg: 'server error'});
      } else {
        var token = jwt.sign(user, 'test', {expiresInMinutes: 10});
        res.json({success: true, msg: 'Authentication successful', token: token, data: data});
      }
    });
  });

  // DELETE to destroy a user
  router.delete('/users', verify, function(req, res) {
    User.findOneAndRemove({name: req.body.name}, function(err, user) {
      if (err) res.status(500).json({msg: 'server error'});
      else res.json({success: true, msg: 'user deleted'});
    });
  });

};

