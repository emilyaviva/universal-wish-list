var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {windowWidth: window.innerWidth};
  },

  handleResize: function(e) {
    this.setState({windowWidth: window.innerWidth});
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  render: function() {
    console.log("Current window width: " + this.state.windowWidth);
    if (this.state.windowWidth < 1150) {
      return (
        <div>
          <section className="poster-wrapper">
          </section>
        </div>
      );
    } else {
      return (
        <div className="homepage-hero-module">
          <div className="video-container">
            <div className="filter"></div>
              <video autoPlay loop className="fillWidth">
                <source src="../lib/For_Wes.mp4" type="video/mp4" />Your browser does not support the video tag. I suggest you upgrade your browser.
                <source src="../lib/For_Wes.webm" type="video/webm" />Your browser does not support the video tag. I suggest you upgrade your browser.
              </video>
            <div className="poster hidden">
                <img src="./lib/For_Wes.jpg" alt="Online Shopping" />
            </div>
          </div>
        </div>
      );
    }
  }
});


