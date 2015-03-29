// Where the game visuals will be initialized.

	var width = 960,
	    height = 500;

	var vertices;

	var voronoi;

	var svg;

	var path;

initializeGraphics = function(seed) {
	log("graphics initialized");

	vertices = d3.range(20).map(function(d) {
	  return [Math.random() * width, Math.random() * height];
	});

	voronoi = d3.geom.voronoi()
	    .clipExtent([[0, 0], [width, height]]);

	svg = d3.select("#voronoiContainer").append("svg")
	    .attr("width", width)
	    .attr("height", height);
	    // .on("mousemove", function() { vertices[0] = d3.mouse(this); redraw(); });

	path = svg.append("g").selectAll("path");

	redraw();
}

function redraw() {
  path = path.data(voronoi(vertices), polygon);

  path.exit().remove();

  path.enter().append("path")
      .attr("class", function(d, i) { return "q" + (i % 9) + "-9"; })
      .classed("unfaded", true)
      .attr("d", polygon)
      .attr("opacity", function () {
      	return 1;
      })
      .on("click", function(d) {
      	 // every zone is unfaded
      	if(d3.selectAll(".unfaded")[0].length > 1) {
      		d3.selectAll('.unfaded').classed("faded", true);
      	    d3.selectAll('.unfaded').classed("unfaded", false);
      		d3.select(this).classed("unfaded", true);
      		d3.select(this).classed("faded", false);
      	} else { // single zone is selected
      		// clicking already unfaded zone
      		if(d3.select(this).attr("class").indexOf("unfaded") != -1) { 
      			d3.selectAll('.faded').classed("unfaded", true);
      		    d3.selectAll('.faded').classed("faded", false);
      		} else { // clicking faded zone
      			d3.selectAll('.unfaded').classed("faded", true);
      			d3.selectAll('.unfaded').classed("unfaded", false);
	      	    d3.select(this).classed("unfaded", true);
	      		d3.select(this).classed("faded", false);
      		}
      	}

      });

  path.order();
}

function polygon(d) {
  return "M" + d.join("L") + "Z";
}

updateMap = function (isDisplayed, isBlurred) {

}

updateMiniMap = function (isDisplayed) {

}

updateZoneInfo = function (isDisplayed) {

} 

updateGameSummary = function (isDisplayed, isEnd) {
	if(!isEnd) {
		// normal between-round summary
	} else {
		// end of game summary.
	}
}



