/* jshint expr: true */
'use strict';

var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

var User = require('../../models/user-model');
var Wishlist = require('../../models/wishlist-model');
var Item = require('../../models/item-model');

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
      .send({name: 'test', items: ['a', 'b', 'c'], creator: 'user', _id: 1})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('_id');
        expect(res.body.name).to.eql('test');
        expect(res.body.items).to.have.length(3);
        expect(res.body.creator).to.eql('user');
        done();
      });
  });

  it('should GET an array of all resources', function(done) {
    chai.request(host)
      .get('/api/wishlists')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  describe('working on test object', function() {

    beforeEach(function(done) {
      var testObject = new Wishlist({
        name: 'Test Wishlist',
        items: ['one item', 'two items', 'three items'],
        creator: 'test user'
      });
      testObject.save(function(err, data) {
        if (err) throw err;
        this.testObject = data;
        done();
      }.bind(this));
    });

    it('should make an object in a beforeEach block', function() {
      expect(this.testObject.name).to.eql('Test Wishlist');
      expect(Array.isArray(this.testObject.items)).to.eql(true);
      expect(this.testObject.items).to.have.length(3);
      expect(this.testObject).to.have.property('_id');
    });

    it('should PUT an object and update it', function(done) {
      var id = this.testObject._id;
      chai.request(host)
        .put('/api/wishlists/' + id)
        .send({name: 'Test Wishlist Renamed'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.ok).to.eql(1);
          expect(res.body.nModified).to.eql(1);
          expect(res.body.n).to.eql(1);
          done();
      });
    });

    it('should DELETE an object', function(done) {
      var id = this.testObject._id;
      chai.request(host)
        .delete('/api/wishlists/' + id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('wishlist deleted');
          done();
      });
    });

  });

});
