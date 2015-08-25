var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="homepage-hero-module">
        <div className="video-container">
          <div className="filter"></div>
            <video autoPlay loop className="fillWidth">
              <source src="..lib/For_Wes.mp4" type="video/mp4" />Your browser does not support the video tag. I suggest you upgrade your browser.
              <source src="../lib/For_Wes.webm" type="video/webm" />Your browser does not support the video tag. I suggest you upgrade your browser.
            </video>
          <div class="poster hidden">
              <img src="./lib/For_Wes.jpg" alt="Online Shopping" />
          </div>
        </div>
      </div>
    );
  }
});
