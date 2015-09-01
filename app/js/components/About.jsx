var React = require('react');

//About Page
module.exports = React.createClass({
  render: function() {
    return (
      <main id="about">
        <h1 className="h1-about">About Universal Wishlist</h1>
        <p className="p-about">
          Welcome to Universal Wishlist! This app allows users to create a wishlist
          of products and services from any website. From the main page, Create List
          will allow users to create a new wishlist. This will take you to a page where
          you can add items to a wishlist by inputting a name and url.
        </p>
        <p className="p-about">
          Once a list is created, a user will receive an email with two links: a private
          link and a public link. The private link will allow users to view and edit existing
          wishlists. The public link is meant to be shared with anyone and will allow
          people to commit to buying a wishlist item.
        </p>
        <p className="p-about">
          Created by Jason Studstill, Emily Aviva Kapor-Mater, Farhad Ahmed
        </p>
        <section className="bio">
          <div id="jason">
            <a href="https://www.linkedin.com/in/jasonstudstill">
              <img src="../lib/jason.jpg" alt="jason studstill headshot"/>
            </a>
          </div>
          <div id="emily">
            <a href="https://www.linkedin.com/in/emilykapor">
              <img src="../lib/emily.jpg" alt="emily aviva kapor-mater headshot"/>
            </a>
          </div>
          <div id="farhad">
            <a href="https://www.linkedin.com/in/farhadahmed">
              <img src="../lib/farhad.jpg" alt="farhad ahmed headshot"/>
            </a>
          </div>
        </section>
      </main>
    );
  }
});
