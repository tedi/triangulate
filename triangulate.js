(function ( $ ) {
  var minX = 0;
  var $window = $(window);
  var maxX = $window.width();
  var minY = 0;
  var maxY = $window.height() - 100;
  var filledAreas = new Array();

  $.fn.triangulate = function( options ) {

        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            colors: ["#CED2D5", "#F6D3D2"],
            class: ['rotateRight', 'rotateLeft'],
            frequency: 5
        }, options );

        generateTriangles(this, settings.colors, settings.class, generateShapeFrequency(settings.frequency));
        positionTriangles(generateShapeFrequency(settings.frequency));

    };

  function generateShapeFrequency(frequency) {
    return $window.width() / (600 / frequency);
  }

  // Generate triangles based on page width (via shapeFrequency var)
  function generateTriangles($parentElement, colors, directions, shapeFrequency) {
    for (var i = 0; i < shapeFrequency; i++) {
      var svgColor = "style='stroke: " + pickRandom(colors) + ";'";
      var svgClass = "class='" + pickRandom(directions) + "'";
      var shapeMarkup = '<div class="triangleContainer"><svg ' + svgColor + svgClass + ' class=><polygon points="0,0 30,0 15,30" /></svg></div>';
      $parentElement.prepend(shapeMarkup);
    }
  }

  // Set position of each triangle
  function positionTriangles() {
    $('.triangleContainer').each(function() {
        var rand_x=0;
        var rand_y=0;
        var area;
        do {
            rand_x = Math.round(minX + ((maxX - minX)*(Math.random() % 1)));
            rand_y = Math.round(minY + ((maxY - minY)*(Math.random() % 1)));
            area = {x: rand_x, y: rand_y, width: $(this).width(), height: $(this).height()};
        } while(checkOverlap(area));
        filledAreas.push(area);
        $(this).css({left:rand_x, top: rand_y});
    });
  }

  // Select random items from array (used for randomizing triangle colors and directions)
  function pickRandom(triangleProperty) {
    return triangleProperty[Math.floor(Math.random()*triangleProperty.length)];
  }

  // Check if there's already an item placed in current position
  function checkOverlap(area) {
      for (var i = 0; i < filledAreas.length; i++) {

          check_area = filledAreas[i];

          var bottom1 = area.y + area.height;
          var bottom2 = check_area.y + check_area.height;
          var top1 = area.y;
          var top2 = check_area.y;
          var left1 = area.x;
          var left2 = check_area.x;
          var right1 = area.x + area.width;
          var right2 = check_area.x + check_area.width;
          if (bottom1 < top2 || top1 > bottom2 || right1 < left2 || left1 > right2) {
              continue;
          }
          return true;
      }
      return false;
  }
}( jQuery ));
