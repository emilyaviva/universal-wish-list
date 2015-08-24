var React = require('react');
var request = require('superagent');

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
      <div>
        {this.state.wishlists}
      </div>
    );
  }
});

React.render(
  <App />,
  document.getElementById('content')
);
