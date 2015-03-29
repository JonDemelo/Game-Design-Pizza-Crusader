// Where the game visuals will be initialized.

var width,
    height,
    vertices,
    voronoi,
    svg,
    path,
    drag,
    popup,
    timer;

function polygon(d) {
  if ( typeof d === 'undefined'){
    d = [];
  }
  return "M" + d.join("L") + "Z";
}

update = function(state, isSummaryDisplayed) {
    log("graphics initialized");
    if(state === "PRE") {
      container = "#voronoiContainer-pre";
    } else if (state === "ROUND") {
      container = "#voronoiContainer-round";
    } else if (state === "POST") {
      container = "#voronoiContainer-post";
    } else if (state === "END") {
      container = "#voronoiContainer-end";
    }

    width = $(document).width();
    height = $(document).height();

    vertices = d3BoardData;

    voronoi = d3.geom.voronoi()
        .clipExtent([
            [0, 0],
            [width, height]
        ])
        .x(function(d){return d.x*width})
        .y(function(d){return d.y*height});

    svg = d3.select(container).append("svg")
        .attr("width", width)
        .attr("height", height);

    path = svg.append("g").selectAll("path");

    popup = d3.select(container).append("div")
        .classed("tooltip", true)
        .classed(state, true)
        .style("opacity", 0);

    timer = d3.select(container).append("div")
        .classed("timer", true)
        .classed(state, true)
        .style("opacity", 1);

    log("updateGraphics --- " + "isSummaryDisplayed: " + isSummaryDisplayed);
    noZone = false; // if there's a situation where the user is deselecting a zone
    divOpen = false; // there's a popup open already.
    summaryOpened = false;
    if (isSummaryDisplayed) {
    	summaryOpened = true;
    }

    path = path.data(voronoi(vertices), polygon);

    path.exit().remove();

    path.enter().append("path")
        .attr("class", function(d, i) {
            return "q" + (i % 9) + "-9";
        })
        .classed("unfaded", true)
        .attr("d", polygon)
        .attr("opacity", function() {
            return 1;
        })
        .data(d3BoardData)
        .on("click", function(d) {
            // every zone is unfaded
            if (!divOpen && !isSummaryDisplayed) { // if there's a pop up open, 
            	//you can't click a zone
                if (d3.selectAll(".unfaded")[0].length > 1) {
                    d3.selectAll('.unfaded').classed("faded", true);
                    d3.selectAll('.unfaded').classed("unfaded", false);
                    d3.select(this).classed("unfaded", true);
                    d3.select(this).classed("faded", false);
                } else { // single zone is selected
                    // clicking already unfaded zone
                    if (d3.select(this).attr("class").indexOf("unfaded") != -1) {
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
            	if(summaryOpened) {
            		summaryOpened = false;
            	}
                popup.transition().duration(200)
                    .style("pointer-events", "none")
                    .style("opacity", 0);
            }

            if (!noZone && !divOpen) {
                  divOpen = true;
                  popup.selectAll("*").remove();

			      popup.transition().duration(200)
			            .style("pointer-events", "all")
			            .style("opacity", .9);

			        popup.style("left", width * 0.1 + "px")
			            .style("top", height * 0.2 + "px")
			            .style("width", width * 0.75 + "px")
			            .style("height", height * 0.6 + "px");

			        popup.append("div")
			            .attr("class", "summary-header")
			            .text("ZONE");

			        popup.append("div")
			            .attr("class", "summary-contents")
			            .text(function (d) {
			            	return "ZONE CONTENTS FILL THIS"
			            	+ "WITH STUFF FROM ZONE STATE AND MAKE IT LOOK NICE"; 
			            });

			        var zoneButtons = popup.append("div")
			        	.attr("class", "zone-buttons");

			        zoneButtons.append("button")
			        	.attr("class", "zone-button-deliver")
			        	.attr("disabled", function(d) { // TODO: Issue
			        		// should be undisabled when 
			        		// isSummaryDisplayed = false
			        		// but it's not
			        		return isSummaryDisplayed;
			        	})
			            .on("click", function(d) {	
			            	log("test");
			            	// TODO add delivery
			            })
			            .text("+1");

			        zoneButtons.append("button")
			        	.attr("class", "zone-button-undeliver")
			        	.attr("disabled", function(d) {

			        		// TODO same here
			        		return isSummaryDisplayed;
			        	})
			            .on("click", function(d) {	
			            	// TODO remove delivery
			            })
			            .text("-1");

			        popup.append("button")
			        	.attr("class", "summary-button")
			            .on("click", function(d) {
			                popup.transition().duration(200)
			                    .style("pointer-events", "none")
			                    .style("opacity", 0);
			                divOpen = false;
			                summaryOpened = false;
			            })
			            .text("CLOSE");

            } else {
                divOpen = false;
                noZone = false;
            }
        });

    path.order();

    timer.style("left", width * 0.01 + "px")
        .style("top", height * 0.01 + "px")
        .style("width", 40 + "px")
        .style("height", 40 + "px");


    if (isSummaryDisplayed && summaryOpened) { // load right off in summary states
        divOpen = true;
        popup.transition().duration(200)
            .style("pointer-events", "all")
            .style("opacity", .9);

        popup.style("left", width * 0.1 + "px")
            .style("top", height * 0.2 + "px")
            .style("width", width * 0.75 + "px")
            .style("height", height * 0.6 + "px");

        popup.append("div")
            .attr("class", "summary-header")
            .text("SUMMARY");

        popup.append("div")
            .attr("class", "summary-contents")
            .text(function (d) {
            	return "SUMMARY CONTENTS FILL THIS"
            	+ "WITH STUFF FROM GAME STATE AND MAKE IT LOOK NICE"; 
            });

        popup.append("button")
        	.attr("class", "summary-button")
            .on("click", function(d) {
                popup.transition().duration(200)
                    .style("pointer-events", "none")
                    .style("opacity", 0);
                divOpen = false;
                summaryOpened = false;
            })
            .text("CLOSE");

    }
}

updateTimer = function(state, timerValue) {
    d3.selectAll(".timer").filter("." + state).text(timerValue);
}