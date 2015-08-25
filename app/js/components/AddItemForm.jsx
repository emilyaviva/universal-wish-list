var React = require('react');

//This is the form the user fills out in order to add a new item to their wishlist.
module.exports = React.createClass({
  render: function() {
    return(

      <form className="frm-add-item">
        <input className="input-add-item" type="text" placeholder="Item name" />
        <input className="input-add-item" type="text" placeholder="Item url" />
        <button>Add new</button>
      </form>

    )
  }
})
