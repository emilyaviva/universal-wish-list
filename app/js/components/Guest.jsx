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
      listItems: []
    };
  },
  componentDidMount: function() {
    request
     .get('/api/w/' + this.state._id)
     .end(function(err, res){
        if (res.ok) {
          console.log(res.body)
          var items = JSON.stringify(res.body.items)
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
  render: function() {
    if (this.state.listItems.length) {
      console.log(this.state._id);
      console.log(this.state);
      var listItems = this.state.listItems.map(function(item) {
        return (
          <article className="article-item">
            <section className="description">
              <h2>{item.description}</h2>
              <a className="view-link" href={item.url}><button>View</button></a>
            </section>
            <section className="committed-to">
              <img className="unchecked-box" src="http://www.clker.com/cliparts/3/h/N/y/5/p/empty-check-box-md.png" />
              <button>I will get this for you</button>
            </section>
          </article>
        )
      });
    }
    return (
      <main id="guest-view">

        <header className="title-header">
          <section id="icon-section">
            <img id="icon" src="lib/wishlist.png" />
          </section>
          <nav id="header-nav">
            <a href="">About</a>
          </nav>
        </header>

        {listItems}

      </main>
    );
  }
})
