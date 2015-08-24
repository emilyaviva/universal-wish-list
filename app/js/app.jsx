var React = require('react');

// Main App
var App = React.createClass({
  render: function() {
    return (
      <div>
        Test Content
      </div>
    );
  }
});

React.render(
  <App />,
  document.getElementById('content')
);
