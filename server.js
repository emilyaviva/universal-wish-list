'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var mailer = require('express-mailer');

var port = process.env.PORT || 3000;
process.env.secret = process.env.secret || 'This is not secure!';

var app = express();
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var mongoUri = process.env.MONGO_URI || 'mongodb://localhost/wishlistApp';

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

app.set('views', __dirname + '/email-views');
app.set('view engine', 'jade');

app.post('/emailCreator', function(req, res, next) {
  app.mailer.send('email-to-creator', {
    to: req.body.to,
    subject: 'Your Wishlist Unique Link',
    uniqueLink: req.body.uniqueLink,
    publicLink: req.body.publicLink
  }, function(err) {
    if (err) {
      res.json({success: false, msg: 'Error sending email', info: req.body});
      return console.error(err);
    }
    res.json({success: true, msg: 'Successfully sent email to ' + req.body.to});
  });
});

app.post('/emailBuyer', function(req, res, next) {
  app.mailer.send('email-to-buyer', {
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

var wishlistRoutes = express.Router();
require('./routes/wishlist-routes')(wishlistRoutes);
app.use('/api', wishlistRoutes);

mongoose.connect(mongoUri, function(err) {
  if (err) console.error('MongoDB connection error:', err);
  else console.log('MongoDB successfully connected to', mongoUri);
});

app.listen(port, function() {
  console.log('Server now listening on port', port, '...');
});
