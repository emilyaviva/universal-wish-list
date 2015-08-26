var React = require('react');
var request = require('superagent');
var Footer = require('./components/Footer.jsx');
var Home = require('./components/Home.jsx');
var User = require('./components/User.jsx');
var Guest = require('./components/Guest.jsx');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Link = Router.Link;

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

var Nav = React.createClass({
  render: function() {
    return (
      <section className="navWrapper">
        <nav id="nav">
          <Link to="user" className="navLinks"> Create List </Link>
          <Link to="guest" className="navLinks"> View List</Link>
          <Link to="home" className="navLinks" id="homeLink"> Home </Link>
        </nav>
      </section>
    );
  }
});

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('content'));
});

