var React = require('react');

// Guest View
module.exports = React.createClass({
  render: function() {
    return (
      <div id='guestView'>
        <header className="title-header">
          <section id="icon-section">
            <img id="icon" src="images/wishlist.png" />
          </section>
          <nav id="header-nav">
            <a href="">About</a>
          </nav>
        </header>

        <section id="category-section">
          <button className="btn-category"><img className="category" src="images/home168.png" /></button>
          <button className="btn-category"><img className="category" src="images/basketball32.png" /></button>
          <button className="btn-category"><img className="category" src="images/cellphone106.png" /></button>
          <button className="btn-category"><img className="category" src="images/books30.png" /></button>
          <button className="btn-category"><img className="category" src="images/tshirt18.png" /></button>
          <button className="btn-category"><img className="category" src="images/makeup2.png" /></button>
          <button className="btn-category"><img className="category" src="images/sedan3.png" /></button>
        </section>

        <div>Icons made by <a href="http://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a>             is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a></div>
      </div>
    );
  }
})
