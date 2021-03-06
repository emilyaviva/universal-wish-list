var React = require('react');
var Router = require('react-router');
var request = require('superagent');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Link = Router.Link;
var APP_URL =  'http://www.theuniversalwishlist.com';

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
  },
  handleListNameChange: function(event) {
    this.setState({
      listName: event.target.value
    });
  },
  handleListCodeChange: function(event) {
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
       .end(function(err, res) {
         if (res.ok) {
            // Define variables in scope to be passed down in the next call
            var uniqueId = res.body.uniqueId;
            var _id = res.body._id;
            this.setState({
              creatingList: !this.state.creatingList
            });
            request
              .post('/emailCreator')
              .send({
                to: res.body.creator,
                uniqueLink: APP_URL + '/#/user/' + uniqueId,
                publicLink: APP_URL + '/#/guest/' + _id
                 })
              .end(function(err, res) {
                if (err) {
                  console.error('Error: ' + err);
                }
              });
            // Redirect to user page is res is successfull
            this.transitionTo('/user/' + res.body.uniqueId);
            window.location.reload();
         } else {
            console.error('Error ' + res.text);
         }
       }.bind(this));
    } else {
      alert('Enter a valid email address');
    }
  },
  handleSearchSubmit: function(e) {
    var currCode = this.state.listCode;
    e.preventDefault();
    this.setState({
      listCode: ''
    });
    if (this.state.listCode.length > 0) {
      if (currCode.charAt(0) === 'u') {
        request
         .get('/api/w/u/' + currCode)
         .end(function(err, res) {
          if (res.ok) {
            this.setState({
              viewingList: !this.state.viewingList
            });
            // Store current list in local storage
            window.localStorage.setItem('wishListUniqueId', res.body.uniqueId);
            // Redirect to user page is res is successfull
            this.transitionTo('/user/' + res.body.uniqueId);
            window.location.reload();
          } else {
            alert('Oh no! That is not a valid code \n ' + res.text);
          }
        }.bind(this));
      } else {
        request
         .get('/api/w/' + currCode)
         .end(function(err, res){
          if (res.ok) {
            this.setState({
              viewingList: !this.state.viewingList
            });
            // Store current list in local storage
            window.localStorage.setItem('WishList', res.body._id);
            // Redirect to user page is res is successfull
            // this.transitionTo('guest', {list: res.body});
            this.transitionTo('/guest/' + res.body._id);
            window.location.reload();
          } else {
            alert('Oh no! That is not a valid code \n ' + res.text);
          }
        }.bind(this));
      }
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
            <form className="createList headerWrapper pure-form">
              <a href="#/home" className="headerLinks" id="homeLink"> Home </a>
              <input className="input-add-item" value={email} onChange={this.handleEmailChange} type="email" placeholder=" Your email address" required/>
              <input className="input-add-item" value={listName} onChange={this.handleListNameChange} type="text" placeholder=" Wishlist Name" required/>
              <button className="button-small pure-button" onClick={this.handleUserSubmit}>Create List</button>
              <button className="button-small pure-button" onClick={this.create}>Cancel</button>
              <span className="emptySpan"></span>
            </form>
          </nav>
        </header>
      );
    } else if (this.state.viewingList) {
      return (
        <header className="headerWrapper">
          <nav id="header">
            <form className="viewList headerWrapper pure-form">
              <a href="#/home" className="headerLinks" id="homeLink"> Home </a>
              <input className="input-add-item" value={listCode} onChange={this.handleListCodeChange} type="text" placeholder=" Enter Code" required/>
              <button className="button-small pure-button" onClick={this.view}>Cancel</button>
              <span className="emptySpan"></span>
            </form>
          </nav>
        </header>
      );
    } else {
      return (
        <header className="headerWrapper">
          <nav id="header">
            <a href="#/home" className="headerLinks" id="homeLink"> Home </a>
            <a href="" className="headerLinks noRedirect" onClick={this.create}> Create List </a>
            <span className="emptySpan"></span>
          </nav>
        </header>
      );
    }
  }
});

  // <a href="" className="headerLinks noRedirect" onClick={this.view}> View List</a>
  // <button className="button-small pure-button" onClick={this.handleSearchSubmit}>View List</button>
