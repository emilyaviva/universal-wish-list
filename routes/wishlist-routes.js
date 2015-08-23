'use strict';

var express = require('express');
var router = express.Router;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Wishlist = require('../models/wishlist-model');

module.exports = function(router) {
  router.use(bodyParser.json());

  // GET all wishlists
  router.get('/wishlists', function(req, res) {
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
  router.get('/wishlists/:id', function(req, res) {
    Wishlist.findOne({_id: req.params.id}, function(err, wishlist) {
      if (err) {
        res.status(500).json({msg: 'server error'});
        return console.error(err);
      }
      else if (!wishlist) return res.status(404).json({msg: 'wishlist not found'});
      else res.json(wishlist);
    });
  });

  // POST to create a new wishlist
  router.post('/wishlists', function(req, res) {
    new Wishlist({

    }).save(function(err, data) {
      if (err) {
        res.status(500).json({msg: 'server error'});
        return console.error(err);
      }
      else res.json(data);
    });
  });

  // PUT to update a wishlist
  router.put('/wishlists/:id', function(req, res) {
    Wishlist.update({_id: req.params.id}, req.body, function(err, message) {
      if (err || !message) {
        res.status(500).json({msg: 'server error'});
        return console.error(err);
      }
      else res.json(message);
    });
  });

  // DELETE to delete a wishlist
  router.delete('/wishlists/:id', function(req, res) {
    Wishlist.remove({_id: req.params.id}, function(err) {
      if (err) {
        res.status(500).json({msg: 'server error'});
        return console.error(err);
      }
      else res.json({msg: 'wishlist deleted'});
    });
  });
  
};
