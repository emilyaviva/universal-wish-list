'use strict';

var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  category: {type: String},
  description: {type: String},
  url: {type: String},
  promised: {type: Boolean, default: false}
});

module.exports = mongoose.model('Item', itemSchema);
