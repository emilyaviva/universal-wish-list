'use strict';

var mongoose = require('mongoose');

var wishlistSchema = new mongoose.Schema({
  name: {type: String},
  creator: {type: String, ref: 'User'},
  items: [{type: String, ref: 'Item'}]
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
