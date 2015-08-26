var $ = require('jquery');

// jQuery
module.exports = function() {
  $(document).ready(function() {
    $('#header>a').on('click', function(e) {
      e.preventDefault();
    });
  });
};
