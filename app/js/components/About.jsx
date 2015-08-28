var React = require('react');

//About Page
module.exports = React.createClass({
  render: function() {
    return (
      <main id="about">
        <h1 className="h1-about">About Universal Wishlist</h1>
        <p className="p-about">
          Welcome to Universal Wishlist! This app will allow users to creat a wishlist
          of products and services from any website. From the main page, Create List
          will allow users to create a new wishlist. This will take you to a page where a
          user can add items to a wishlist by inputting a url and a name which they would
          like the item to appear as inside their list.
        </p>
        <p className="p-about">
          Once a list is created, a user will receive an email with two links: a private
          link and a public link. the private link will allow users to view existing
          wishlists. The public link is what they will share with anyone the user would
          like to send their wishlist too. The public link will allow people to commit to
          buying a wishlist item.
        </p>
        <img id="make-wish" src="lib/wish.jpg" />
      </main>
    )
  }
})
