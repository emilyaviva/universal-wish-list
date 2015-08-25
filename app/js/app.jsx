var React = require('react');
var request = require('superagent');
var Video = require('./components/Video.jsx');
var Nav = require('./components/Nav.jsx');
var Footer = require('./components/Footer.jsx');
var Main = require('./components/Main.jsx');
var User = require('./components/User.jsx');
var Guest = require('./components/Guest.jsx');

// Main App
var App = React.createClass({
  getInitialState: function() {
    return {
      wishlists: []
    }
  },

  componentDidMount: function() {
    request
      .get('/api/wishlists')
      .end(function(err, res) {
        console.log(res);
        this.setState({
          wishlists: this.state.wishlists.concat(res.body)
        })
      }.bind(this));

  },


  render: function() {
    return (
      <div className="home">
        <Nav />
        <Guest />
        <Footer />
        <Video />
      </div>
    );
  }
});

React.render(
  <App />,
  document.getElementById('content')
);
