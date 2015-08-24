'use strict';

var express = require('express');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;

var app = express();
app.use(express.static(__dirname + '/public'));

var mongoUri = process.env.MONGO_WISHLIST_APP_URI || 'mongodb://localhost/wishlistApp';

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
