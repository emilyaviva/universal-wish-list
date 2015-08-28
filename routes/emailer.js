'use strict';

var express = require('express');
var router = express.Router;
var bodyParser = require('body-parser');
var mailer = require('express-mailer');

module.exports = function(router) {
  router.use(bodyParser.json());

  router.post('/emailCreator', function(req, res, next) {
    router.mailer.send('email-to-creator', {
      to: req.body.to,
      subject: 'Your Wishlist Unique Link',
      uniqueLink: req.body.uniqueLink,
      publicLink: req.body.publicLink
    }, function(err) {
      if (err) {
        res.json({success: false, msg: 'Error sending email'});
        return console.error(err);
      }
      res.json({success: true, msg: 'Successfully sent email to ' + req.body.to});
    });
  });

  router.post('/emailBuyer,', function(req, res, next) {
    router.mailer.send('email-to-buyer', {
      to: req.body.to,
      subject: 'You committed to buy something from a wishlist'
    }, function(err) {
      if (err) {
        res.json({success: false, msg: 'Error sending email'});
        return console.error(err);
      }
      res.json({success: true, msg: 'Successfully sent email to ' + req.body.to});
    });
  });

};
