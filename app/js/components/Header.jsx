var React = require('react');
var Router = require('react-router');
var request = require('superagent');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Link = Router.Link;

// Header
module.exports = React.createClass({
  mixins: [Router.Navigation],

  getInitialState: function() {
    return {
      creatingList: false,
      viewingList: false,
      email: '',
      listName: '',
      listCode: ''
    };
  },
  handleEmailChange: function(event) {
    this.setState({
      email: event.target.value
    });
    console.log('email is: ' + this.state.email);
  },
  handleListNameChange: function(event) {
    this.setState({
      listName: event.target.value
    });
    console.log('listName is: ' + this.state.listName);
  },
  handleListCodeChange: function(event) {
    console.log('listCode is: ' + this.state.listCode);
    this.setState({
      listCode: event.target.value
    });
  },
  create: function(e) {
    e.preventDefault();
    this.setState({
      creatingList: !this.state.creatingList
    });
  },
  view: function(e) {
    e.preventDefault();
    this.setState({
      viewingList: !this.state.viewingList
    });
  },
  handleUserSubmit: function(e) {
    e.preventDefault();
    var isValid = this._validateEmail(this.state.email);
    this.setState({
      email: '',
      listName: ''
    });
    if (this._validateEmail(this.state.email)) {
      request
       .post('/api/w')
       .send({ name: this.state.listName, creator: this.state.email})
       .set('Accept', 'application/json')
       .end(function(err, res){
         if (res.ok) {
            alert('yay got ' + JSON.stringify(res.body));
            this.setState({
              creatingList: !this.state.creatingList
            });
            // Redirect to user page is res is successfull
            this.transitionTo('user');
         } else {
            alert('Oh no! error ' + res.text);
         }
       }.bind(this));
    } else {
      alert('Enter a valid email address');
    }
  },
  handleGuestSubmit: function(e) {
    e.preventDefault();
    this.setState({
      listCode: ''
    });
    if (this.state.listCode.length > 0) {
      request
       .get('/api/w/' + this.state.listCode)
       .end(function(err, res){
         if (res.ok) {
            this.setState({
              viewingList: !this.state.viewingList
            });
            alert('yay got ' + JSON.stringify(res.body));
            // Redirect to user page is res is successfull
            this.transitionTo('guest');
         } else {
            alert('Oh no! That is not a valid code \n ' + res.text);
         }
       }.bind(this));
    } else {
      alert('Not a valid code');
    }
  },
  _validateEmail:  function(email) {
      var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      return re.test(email);
  },

  render: function() {
    var email = this.state.email;
    var listName = this.state.listName;
    var listCode = this.state.listCode;

    if (this.state.creatingList) {
      return (
        <header className="headerWrapper">
          <nav id="header">
            <form className="createList headerWrapper">
              <Link to="home" className="headerLinks" id="homeLink"> Home </Link>
              <input className="input-add-item" value={email} onChange={this.handleEmailChange} type="email" placeholder=" Your email address" required/>
              <input className="input-add-item" value={listName} onChange={this.handleListNameChange} type="text" placeholder=" Wishlist Name" required/>
              <button onClick={this.handleUserSubmit}>Create List</button>
              <button onClick={this.create}>Cancel</button>
            </form>
          </nav>
        </header>
      );
    } else if (this.state.viewingList) {
      return (
        <header className="headerWrapper">
          <nav id="header">
            <form className="viewList headerWrapper">
              <Link to="home" className="headerLinks" id="homeLink"> Home </Link>
              <input className="input-add-item" value={listCode} onChange={this.handleListCodeChange} type="text" placeholder=" Enter Code" required/>
              <button onClick={this.handleGuestSubmit}>View List</button>
              <button onClick={this.view}>Cancel</button>
            </form>
          </nav>
        </header>
      );
    } else {
      return (
        <header className="headerWrapper">
          <nav id="header">
            <Link to="home" className="headerLinks" id="homeLink"> Home </Link>
            <a href="" className="headerLinks" onClick={this.create}> Create List </a>
            <a href="" className="headerLinks" onClick={this.view}> View List</a>
          </nav>
        </header>
      );
    }
  }
});
