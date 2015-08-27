'use strict';

var mongoose = require('mongoose');

var wishlistSchema = new mongoose.Schema({
  name: {type: String},
  creator: {type: String},
  uniqueId: {type: String},
  items: [{type: String, ref: 'Item'}]
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
