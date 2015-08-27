'use strict';

var express = require('express');
var router = express.Router;
var bodyParser = require('body-parser');

module.exports = function(router) {
  router.use(bodyParser.json());

  mailer.extend(app, {
    from: 'universalwishlist@gmail.com',
    host: 'smtp.gmail.com',
    secureConnection: true,
    port: 465,
    transportMethod: 'SMTP',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  router.set('views', '../email-views');
  router.set('view engine', 'jade');

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
