'use strict';

var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  creator: {type: String},
  name: {type: String},
  url: {type: String},
  description: {type: String},
  promised: {type: Boolean, default: false}
});

module.exports = mongoose.model('Item', itemSchema);
