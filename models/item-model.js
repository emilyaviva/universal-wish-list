'use strict';

var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  wishlist: {type: String},
  description: {type: String},
  url: {type: String},
  promised: {type: Boolean, default: false},
  image: {type: String}
});

module.exports = mongoose.model('Item', itemSchema);
