/* jshint expr: true */
'use strict';

var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

var User = require('../models/user-model');
var Wishlist = require('../models/wishlist-model');
var Item = require('../models/item-model');

process.env.MONGO_WISHLIST_APP_URI = 'mongodb://localhost/wishlist_test';
process.env.PORT = process.env.TESTINGPORT || 3003;
var host = 'localhost:' + process.env.PORT;

chai.use(chaiHttp);

require('../../server');

describe('wishlist management REST API', function() {

  // after running tests, clean up database and close server
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should create a new wishlist on POST', function(done) {
    chai.request(host)
      .post('/api/wishlists')
      .send({name: 'test', items: ['a', 'b', 'c'], user: 'user', _id: 1})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('_id');
        expect(res.body.name).to.eql('test');
        expect(res.body.items).to.have.length(3);
        expect(res.body.user).to.eql('user');
        done();
      });
  });

};
