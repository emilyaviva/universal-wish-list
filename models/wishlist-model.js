'use strict';

var mongoose = require('mongoose');

var wishlistSchema = new mongoose.Schema({
  name: {type: String},
  items: {[type: String, ref: 'Item']},
  user: {type: String, ref: 'User'}
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
