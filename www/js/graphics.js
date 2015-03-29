// Where the game visuals will be initialized.

  var width = 800,
      height = 800;
  // var width = $(document).width();
  // var height = $(document).height();
  var vertices;
  var voronoi;
  var svg;
  var path;
  var drag;
  var div;

initializeGraphics = function(seed) {
  log("graphics initialized");

  width = $(document).width();
  height = $(document).height();
  // drag = d3.behavior.drag()
 //    .origin(function(d) { return d; })
 //    .on("dragstart", dragstarted)
 //    .on("drag", dragged)
 //    .on("dragend", dragended);

  /*vertices = d3.range(20).map(function(d) {
    return [Math.random() * width, Math.random() * height];
  });*/
  vertices = d3BoardData;

  voronoi = d3.geom.voronoi()
      .clipExtent([[0, 0], [width, height]])
      .x(function(d){return d.x*width})
      .y(function(d){return d.y*height})

  svg = d3.select("#voronoiContainer").append("svg")
      .attr("width", width)
      .attr("height", height);

  path = svg.append("g").selectAll("path");

  div = d3.select("#voronoiContainer").append("div")   
    .attr("class", "tooltip")           
    .style("opacity", 0);
}

function polygon(d) {
  if ( typeof d === 'undefined'){
    d = [];
  }
  return "M" + d.join("L") + "Z";
}

update = function (isSummaryDisplayed, isZoneDisplayed) {
  noZone = false; // if there's a situation where the user is deselecting a zone
  divOpen = false; // there's a popup open already.
  path = path.data(voronoi(vertices), polygon);

  path.exit().remove();

  path.enter().append("path")
      .attr("class", function(d, i) { return "q" + (i % 9) + "-9"; })
      .classed("unfaded", true)
      .attr("d", polygon)
      .attr("opacity", function () {
        return 1;
      })
      .data(d3BoardData)
      // .call(drag)
      .on("mouseover",function(d){
        console.log(d);
      })
      .on("click", function(d) {
         // every zone is unfaded
        if(!divOpen) { // if there's a pop up open, you can't click a zone
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
                noZone = !noZone;
            } else { // clicking faded zone
              d3.selectAll('.unfaded').classed("faded", true);
              d3.selectAll('.unfaded').classed("unfaded", false);
                d3.select(this).classed("unfaded", true);
              d3.select(this).classed("faded", false);
            }
          }
      } else { // close popup instead of clicking new zone.
          div.transition().duration(200)
        .style("pointer-events", "none")      
        .style("opacity", 0);
      }

        if(!noZone && !divOpen) {
          if(isSummaryDisplayed) {
            // TODO : custom for summary display
          } else if (isZoneDisplayed) {
            // TODO: custom for zone display
          } else { // TODO: Will actually not show anything, but here for testing
            console.log(d);
            divOpen = true;
            div.transition().duration(200)
              .style("pointer-events", "all")       
                .style("opacity", .9);      
          div.text("test")
              .style("left", width*0.1 + "px")     
              .style("top", height*0.1 + "px")
              .style("width", width*0.75 + "px")
              .style("height", height*0.6 + "px")
              .append("button")
                .on("click", function (d) {
                  div.transition().duration(200)
                    .style("pointer-events", "none")      
                      .style("opacity", 0);  
                    divOpen = false;
                })
                .text("close");
          }
        } else {
          divOpen = false; 
          noZone = false;
        }
      });

  path.order();
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



