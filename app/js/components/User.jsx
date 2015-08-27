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
      listItems: []
    };
  },
  componentDidMount: function() {
    request
     .get('/api/w/u/' + this.state.uniqueId)
     .end(function(err, res){
        if (res.ok) {
          console.log(res.body);
          var items = JSON.stringify(res.body.items)
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
  render: function() {
    if (this.state.listItems.length) {
      console.log(this.state);
      var listItems = this.state.listItems.map(function(item) {
        return (
          <article className="article-item">
            <section className="description">
              <h2>{item.description}</h2>
              <a className="view-link" href={item.url}><button>View</button></a>
            </section>
            <section>
              <button className="btn-delete">Delete Item</button>
            </section>
          </article>
        );
      });
    }
    return (
      <main id="user-view">

        <header className="title-header">
          <section id="icon-section">
            <img id="icon" src="lib/wishlist.png" />
          </section>
          <nav id="header-nav">
            <a href="">About</a>
          </nav>
        </header>


        <form className="frm-add-item">
          <label>Enter item name:
            <input name="item-name" className="input-add-item" type="text" placeholder="Item name" />
          </label>
          <label>Enter item url:
            <input name="item-url" className="input-add-item" type="text" placeholder="Item url" />
          </label>
          <button id="btn-add-item">Add new</button>
        </form>

        {listItems}

      </main>
    )
  }
})
        // <UserListItem list={this.state.wishList} />
