var React = require('react');
var request = require('superagent');

// Guest View
module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      _id: this.context.router.getCurrentParams().guestId,
      uniqueId: '',
      creator: '',
      name: '',
      listItems: [],
      itemName: '',
      itemUrl: '',
      itemNotes: '',
      buyerEmail: ''
    };
  },
  componentDidMount: function() {
    request
     .get('/api/w/' + this.state._id)
     .end(function(err, res){
        if (res.ok) {
          var items = JSON.stringify(res.body.items);
          this.setState({
            listItems: this.state.listItems.concat(JSON.parse(items)),
            uniqueId: res.body.uniqueId,
            creator: res.body.creator,
            name: res.body.name
          });
        } else {
          alert('Oh no! That is not a valid code \n ' + res.text);
        }
      }.bind(this));
  },
  handleCommitToBuy: function(i, itemId) {
    request
      .put('/api/w/' + this.state._id + '/items/' + itemId)
      .send({promised: true})
      .end(function(err, res) {
        if (res.ok) {
          var email = prompt('Enter your email address\n A confirmation link will be sent to you');
            request
              .post('/emailBuyer')
              .send({
                to: email
                 })
              .end(function(err, res) {
                if (err) {
                  console.error('Error: ' + err);
                }
              });
          this.setState({
            buyerEmail: email
          });
          window.location.reload();
        } else {
          console.error('Server Error: ' + err);
        }
      }.bind(this));
  },
  render: function() {
    var itemName = this.state.itemName;
    var itemUrl = this.state.itemUrl;
    var handleCommitToBuy = this.state.handleCommitToBuy;

    if (this.state.listItems.length) {
      var listItems = this.state.listItems.map(function(item, i) {
        return (
          <article className="article-item">
            <section className="description">
              {
                item.promised ? <button key={item._id} className="pure-button pure-button-disabled">Purchased</button> :
                <button key={item._id} onClick={this.handleCommitToBuy.bind(this, i, item._id)} className="pure-button">Commit To Buy</button>
              }
              <h2>{item.description}</h2>
            </section>
          </article>
        );
      }.bind(this));
    }
    return (
      <main id="guest-view">
        <header className="title-header">
          <h1>{this.state.name}</h1>
        </header>
        {listItems};
      </main>
    );
  }
});
