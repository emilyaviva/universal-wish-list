var React = require('react');
var request = require('superagent');

// User View
module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      uniqueId: this.context.router.getCurrentParams().userId,
      _id: '',
      creator: '',
      name: '',
      listItems: [],
      itemName: '',
      itemUrl: '',
      itemNotes: ''
    };
  },
  componentDidMount: function() {
    request
     .get('/api/w/u/' + this.state.uniqueId)
     .end(function(err, res){
        if (res.ok) {
          console.log(res.body);
          var items = JSON.stringify(res.body.items);
          this.setState({
            listItems: this.state.listItems.concat(JSON.parse(items)),
            _id: res.body._id,
            creator: res.body.creator,
            name: res.body.name
          });
        } else {
          alert('Oh no! That is not a valid code \n ' + res.text);
        }
      }.bind(this));
  },
  handleItemNameChange: function(event) {
    this.setState({
      itemName: event.target.value
    });
  },
  handleItemUrlChange: function(event) {
    this.setState({
      itemUrl: event.target.value
    })
  },
  handleAddItem: function(e) {
    e.preventDefault();
    // Check if URL is prefixed with 'http://' - If not, add it
    var formattedURL = this.state.itemUrl.split('http://');
    console.log(formattedURL);
    if (formattedURL[0] !== 'http://') {
      formattedURL = (['http://']).concat(formattedURL).join('');
    }
    console.log(formattedURL);
    request
      .post('/api/w/' + this.state._id + '/items')
      .send({'description': this.state.itemName, 'url': formattedURL})
      .end(function(err, res) {
        if (res.ok) {
          alert(JSON.stringify(res.body));
          this.setState({
            listItems: this.state.listItems.concat([res.body.data]),
            itemName: '',
            itemUrl: ''
          })
        } else {
          alert('Server Error ' + err)
        }
      }.bind(this))
  },
  handleDelete: function(i, itemId) {
    console.log(itemId);
    var updatedListItems = this.state.listItems;
    updatedListItems.splice(i, 1);
    request
      .del('/api/w/' + this.state._id + '/items/' + itemId)
      .end(function(err, res) {
        if (res.ok) {
          alert(JSON.stringify(res.body));
          this.setState({
            listItems: updatedListItems
          })
        } else {
          alert('Server Error ' + err)
        }
      }.bind(this))
  },
  render: function() {
    var itemName = this.state.itemName;
    var itemUrl = this.state.itemUrl;
    var handleDelete = this.state.handleDelete;

    if (this.state.listItems.length) {
      var listItems = this.state.listItems.map(function(item, i) {
        return (
          <article className="article-item" >
            <section className="description">
              <button className="pure-button"><a className="view-link" href={item.url}>View</a></button>
              {
                item.promised ? <button key={item._id} className="pure-button pure-button-disabled btn-delete">Purchased</button> :
                <button key={item._id} onClick={this.handleDelete.bind(this, i, item._id)} className="pure-button btn-delete">Delete Item</button>
              }
              <h2>{item.description}</h2>
            </section>
          </article>
        );
      }.bind(this));
    }
    return (
      <main id="user-view">

        <header className="title-header">
          <h1>{this.state.name}</h1>
        </header>

        <form className="frm-add-item pure-form">
          <label>Enter item name:
            <input value={itemName} onChange={this.handleItemNameChange} name="item-name" className="input-add-item" type="text" placeholder="Item name" />
          </label>
          <label>Enter item url:
            <input value={itemUrl} onChange={this.handleItemUrlChange} name="item-url" className="input-add-item" type="text" placeholder="Item url" />
          </label>
          <button onClick={this.handleAddItem} className="pure-button" id="btn-add-item">Add new</button>
        </form>

        {listItems}

      </main>
    )
  }
})
        // <UserListItem list={this.state.wishList} />
