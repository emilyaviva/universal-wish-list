var React = require('react');

// Footer
module.exports = React.createClass({
  render: function() {
    return (
      <footer id="footer">
        <a className="footerLinks" href="https://github.com/emilyaviva/universal-wish-list">Universal Wish List</a>
        <span>Created by Emily Aviva Kapor-Mater, Farhad Ahmed, and Jason Studstill </span>
        <a href="#/about" className="footerLinks"> About </a>
      </footer>
    );
  }
});
