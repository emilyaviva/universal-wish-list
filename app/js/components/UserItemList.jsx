var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <section>

        <article className="article-item">
          <section className="description">
            <h2>Under Armour Compression Shirt</h2>
            <a className="view-link" href="https://www.underarmour.com/en-us/under-armour-alter-ego-compression-  tshirt/pid1244399-006"><button>View</button></a>
          </section>
          <section>
            <button className="btn-delete">Delete Item</button>
          </section>
        </article>

        <article className="article-item">
          <section className="description">
            <h2>Garmin Fenix 3 GPS Watch</h2>
            <a className="view-link" href="http://www.rei.com/product/884614/garmin-fenix-3-gps-watch"><button>View</button></a>
          </section>
          <section>
            <button className="btn-delete">Delete Item</button>
          </section>
        </article>

      </section>
    )
  }
})
