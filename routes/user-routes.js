'use strict';

var express = require('express');
var router = express.Router;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('../models/user-model');
var Wishlist = require('../models/wishlist-model');
var Item = require('../models/item-model');
var bcrypt = require('bcrypt');

module.exports = function(router) {
  router.use(bodyParser.json());
  router.use(require('../middlewares/verify'));

  // POST to create a new user
  router.post('/users', function(req, res) {
    var user = new User(req.body);
    user.password = user.generateHash(user.password);
    user.save(function(err, data) {
      if (err) res.status(500).json({msg: 'server error'});
      else res.json(data);
    });
  });

  // DELETE to destroy a user
  router.delete('/users', function(req, res) {
    User.findOneAndRemove({name: req.body.name}, function(err, user) {
      if (err) res.status(500).json({msg: 'server error'});
      else res.json({success: true, msg: 'user deleted'});
    });
  });

});
