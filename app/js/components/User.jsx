var React = require('react');

// User View
module.exports = React.createClass({
  render: function() {
    return (
      <div id="userView">
        <header className="title-header">
         <section id="icon-section">
           <img id="icon" src="lib/wishlist.png" />
         </section>
         <nav id="header-nav">
           <a href="">About</a>
         </nav>
       </header>

       <section id="category-section">
         <button className="btn-category"><img className="category" src="lib/home168.png" /></button>
         <button className="btn-category"><img className="category" src="lib/basketball32.png" /></button>
         <button className="btn-category"><img className="category" src="lib/cellphone106.png" /></button>
         <button className="btn-category"><img className="category" src="lib/books30.png" /></button>
         <button className="btn-category"><img className="category" src="lib/tshirt18.png" /></button>
         <button className="btn-category"><img className="category" src="lib/makeup2.png" /></button>
         <button className="btn-category"><img className="category" src="lib/sedan3.png" /></button>
       </section>

      </div>
    )
  }
})
