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

       <form className="frm-add-item">
         <input className="input-add-item" type="text" placeholder="Item name" />
         <input className="input-add-item" type="text" placeholder="Item url" />
         <button>Add new</button>
       </form>

       <article className="article-item">
         <section className="description">
           <h2>Under Armour Compression Shirt</h2>
           <a className="view-link" href="https://www.underarmour.com/en-us/under-armour-alter-ego-compression-  tshirt/pid1244399-006"><button>view</button></a>
         </section>
         <section className="committed-to">
           <img className="unchecked-box" src="http://www.clker.com/cliparts/3/h/N/y/5/p/empty-check-box-md.png" />
           <button>I will get this for you</button>
         </section>
       </article>

       <article className="article-item">
         <section className="description">
           <h2>Garmin Fenix 3 GPS Watch</h2>
           <a className="view-link" href="http://www.rei.com/product/884614/garmin-fenix-3-gps-watch"><button>view</button></a>
         </section>
         <section className="committed-to">
           <img className="unchecked-box" src="http://www.clipartbest.com/cliparts/ncX/jL6/ncXjL6rcB.png" />
           <button>I will get this for you</button>
         </section>
       </article>

       <footer></footer>
      </div>
    )
  }
})
