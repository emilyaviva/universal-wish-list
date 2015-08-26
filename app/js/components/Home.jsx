var React = require('react');
var Video = require('./Video.jsx');

// Main
module.exports = React.createClass({
  render: function() {
    return (
      <main>
        <section className="headline-wrapper">
          <div className="hero-headline">
            <h1>Universal Wish List</h1>
            <h2>The Anywhere Registry</h2>
          </div>
        </section>
        <Video />
      </main>
    );
  }
});
