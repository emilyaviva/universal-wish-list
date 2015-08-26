var React = require('react');
var request = require('superagent');
var Header = require('./components/Header.jsx');
var Footer = require('./components/Footer.jsx');
var Home = require('./components/Home.jsx');
var User = require('./components/User.jsx');
var Guest = require('./components/Guest.jsx');
// var $Video = require('./jQuery/video.js');
var $header = require('./jQuery/header.js');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Link = Router.Link;

// Execute imported jQuery here:

// $Video();
$header();

// Main App
var App = React.createClass({
  getInitialState: function() {
    return {
      wishlists: []
    }
  },
  componentDidMount: function() {
    request
      .get('/api/w')
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
        <Header />
        <RouteHandler />
        <Footer />
      </div>
    );
  }
});

var routes = (
  <Route name="home" path="/" handler={App}>
    <DefaultRoute handler={Home} />
    <Route name="user" path="/user" handler={User}>
      <Route path="/user/:id" handler={User}/>
      <NotFoundRoute handler={Home} />
    </Route>
    <Route name="guest" path="/guest" handler={Guest}>
      <Route path="/guest/:id" handler={Guest}/>
      <NotFoundRoute handler={Home} />
    </Route>
    <NotFoundRoute handler={Home} />
  </Route>
);



Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('content'));
});

