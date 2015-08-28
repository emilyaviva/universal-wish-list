var $ = require('jquery');

// jQuery
module.exports = function() {
  $(document).ready(function() {
    $('.noRedirect').on('click', function(e) {
      e.preventDefault();
    });
  });
};
