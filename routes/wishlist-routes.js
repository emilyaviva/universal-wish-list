'use strict';

var express = require('express');
var router = express.Router;
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Wishlist = require('../models/wishlist-model');
var Item = require('../models/item-model');

module.exports = function(router) {
  router.use(bodyParser.json());

  /*************************************
  WISHLIST ROUTES
  *************************************/

  // GET all wishlists
  router.get('/w', function(req, res) {
    Wishlist.find(function(err, wishlists) {
      if (err) {
        res.status(500).json({msg: 'server error'});
        return console.error(err);
      }
      else if (!wishlists) return res.json({msg: 'no wishlists'});
      else res.json(wishlists);
    });
  });

  // GET a specific wishlist by ID
  router.get('/w/:id', function(req, res) {
    Wishlist.findOne({_id: req.params.id}, function(err, wishlist) {
      if (err) {
        res.status(500).json({msg: 'server error'});
        return console.error(err);
      }
      else if (!wishlist) return res.status(404).json({msg: 'wishlist not found'});
      else res.json(wishlist);
    }).populate('items')
      .exec(function(err, wishlist) {
        if (err) return handleError(err);
        console.log(wishlist);
    });
  });

  // GET a specific wishlist by uniqueID
  router.get('/w/u/:id', function(req, res) {
    Wishlist.findOne({uniqueId: req.params.id}, function(err, wishlist) {
      if (err) {
        res.status(500).json({msg: 'server error'});
        return console.error(err);
      }
      else if (!wishlist) return res.status(404).json({msg: 'wishlist not found'});
      else res.json(wishlist);
    }).populate('items')
      .exec(function(err, wishlist) {
        if (err) return handleError(err);
        console.log(wishlist);
    });
  });

  // POST to create a new wishlist
  router.post('/w', function(req, res) {
    function replaceAll(string, s, r) {
      return string.split(s).join(r);
    }
    var newUniqueId = bcrypt.hashSync(req.body.creator, bcrypt.genSaltSync(10), null);
    newUniqueId = 'u' + replaceAll(newUniqueId, '/', 'u');
    new Wishlist({
      name: req.body.name,
      creator: req.body.creator,
      uniqueId: newUniqueId,
      items: req.body.items
    }).save(function(err, data) {
      if (err) {
        res.status(500).json({msg: 'server error'});
        return console.error(err);
      }
      else res.json(data);
    });
  });

  // PUT to update a wishlist
  router.put('/w/:id', function(req, res) {
    Wishlist.update({_id: req.params.id}, req.body, function(err, message) {
      if (err || !message) {
        res.status(500).json({msg: 'server error'});
        return console.error(err);
      }
      else res.json(message);
    });
  });

  // DELETE to delete a wishlist
  router.delete('/w/:id', function(req, res) {
    Wishlist.remove({_id: req.params.id}, function(err) {
      if (err) {
        res.status(500).json({msg: 'server error'});
        return console.error(err);
      }
      else res.json({msg: 'wishlist deleted'});
    });
  });

  /*************************************
  ITEM ROUTES
  *************************************/

  // GET all items in a wishlist
  router.get('/w/:id/items', function(req, res) {
    Wishlist.findOne({_id: req.params.id}, function(err, doc) {
      if (err || !doc) {
        res.status(500).json({msg: 'server error'});
        console.error(err);
      }
      else {
        Item.find({wishlist: doc._id}, function(err, items) {
          if (err) res.status(500).json({msg: 'server error'});
          else res.json(items);
        });
      }
    });
  });

  // POST to create a new item within a wishlist
  router.post('/w/:id/items', function(req, res) {
    Wishlist.findById(req.params.id, function(err, doc) {
      if (err || !doc) {
        res.status(500).json({msg: 'server error'});
        return console.error(err);
      } else {
        var newItem = new Item(req.body);
        newItem.wishlist = doc._id;
        newItem.save(function(err, data) {
          if (err) {
            res.status(500).json({msg: 'server error'});
            console.error(err);
          } else {
            console.log(data);
            // Push the id of the new item to the wishlist's items array
            doc.items.push(data._id);
            doc.save();
            res.json({msg: 'new item posted', data: data});
          }
        });
      }
    });
  });

  // PUT to update an item in a wishlist
  router.put('/w/:id/items/:item_id', function(req, res) {
    Wishlist.findById(req.params.id, function(err, doc) {
      if (err || !doc) {
        res.status(500).json({msg: 'server error'});
        return console.error(err);
      }
      Item.update({_id: req.params.item_id}, req.body, function(err, message) {
        if (err) {
          res.status(500).json({msg: 'server error'});
          return console.error(err);
        }
        else res.json(message);
      });
    });
  });

  // DELETE to destroy an item in a wishlist
  router.delete('/w/:id/items/:item_id', function(req, res) {
    Wishlist.findById(req.params.id, function(err, doc) {
      if (err || !doc) {
        res.status(500).json({msg: 'server error'});
        return console.error(err);
      }
      Item.remove({_id: req.params.item_id}, function(err) {
        if (err) {
          res.status(500).json({msg: 'server error'});
          return console.error(err);
        }
        else res.json({msg: 'item deleted'});
      });
    });
  });
};
