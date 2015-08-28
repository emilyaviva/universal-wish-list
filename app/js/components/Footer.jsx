var React = require('react');

// Footer
module.exports = React.createClass({
  render: function() {
    return (
      <footer id="footer">
        <a className="footerLinks" href="https://github.com/emilyaviva/universal-wish-list">
          <img src="../lib/gh-light.png" alt="gitHub logo" />
        </a>
        <a href="#/about" className="footerLinks"> About </a>
      </footer>
    );
  }
});
