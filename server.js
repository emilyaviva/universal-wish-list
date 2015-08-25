'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
process.env.secret = process.env.secret || 'This is not secure!';

var app = express();
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));

var mongoUri = process.env.MONGO_WISHLIST_APP_URI || 'mongodb://localhost/wishlistApp';

var wishlistRoutes = express.Router();
require('./routes/wishlist-routes')(wishlistRoutes);
app.use('/api', wishlistRoutes);

var authRoutes = express.Router();
require('./routes/auth-routes')(authRoutes);
app.use('/auth', authRoutes);

var userRoutes = express.Router();
require('./routes/user-routes')(userRoutes);
app.use('/u', userRoutes);

mongoose.connect(mongoUri, function(err) {
  if (err) console.error('MongoDB connection error:', err);
  else console.log('MongoDB successfully connected to', mongoUri);
});

app.listen(port, function() {
  console.log('Server now listening on port', port, '...');
});
