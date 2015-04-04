// Where the game visuals will be initialized.

var width,
    height,
    vertices,
    voronoi,
    svg,
    path,
    drag,
    popup,
    resources,
    timer,
    exit;

function polygon(d) {
    if (typeof d === 'undefined') {
        d = [];
    }
    return "M" + d.join("L") + "Z";
}

update = function(state, isSummaryDisplayed) {
    log("updateGraphics --- " + "isSummaryDisplayed: " + isSummaryDisplayed);

    noZone = false; // if there's a situation where the user is deselecting a zone
    divOpen = false; // there's a popup open already.
    summaryOpened = false;
    if (isSummaryDisplayed) {
        summaryOpened = true;
    }

    if (state === "PRE") {
        container = "#voronoiContainer-pre";
    } else if (state === "ROUND") {
        container = "#voronoiContainer-round";
    } else if (state === "END") {
        container = "#voronoiContainer-end";
    }
    log("container:" + container);

    width = $(document).width();
    height = $(document).height();


    vertices = d3BoardData;

    voronoi = d3.geom.voronoi()
        .clipExtent([
            [0, 0],
            [width, height]
        ])
        .x(function(d) {
            return d.x * width
        })
        .y(function(d) {
            return d.y * height
        });

    var cornerPoints = voronoi(vertices);
    //generate neighbours graph
    generateNeighbourGraph(cornerPoints);
    

    svg = d3.select(container).append("svg")
        .attr("width", width)
        .attr("height", height);

    path = svg.append("g").selectAll("path");

    popup = d3.select(container).append("div")
        .classed("tooltip", true)
        .classed(state, true)
        .style("opacity", 0);

    resources = d3.select(container).append("div")
        .classed("resources", true)
        .classed(state, true)
        .style("opacity", 0.8);

    if(state !== "END") {
        timer = d3.select(container).append("div")
            .classed("timer", true)
            .classed(state, true)
            .style("opacity", 0.8);
    }

    exit = d3.select(container).append("button")
            .classed("exit", true)
            .classed(state, true)
            .style("opacity", 0.8);

    path = path.data(voronoi(vertices), polygon);

    path.exit().remove();

    path.enter().append("path")
        .attr("id", function(d) {
          return "path" + d.point.id;
        })
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
                if (summaryOpened) {
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
                    .text("FRANCHISE REGION " + d.id + 1);

                popup.append("div")
                    .attr("class", "summary-contents")
                    .html(function(g) {
                        var owner = gameBoard.getOwner(d.id);
                        
                        if ( owner == null){
                            owner = "Independant Franchise";
                        }else{
                          owner = "<font color='"+owner.color+"'>"+owner.name+"</font>";
                        }

                        var ownerText = "<p><b>Franchise Owner:</b> "+owner + "</p>";
                        var numDeliveriesText = "<p><b>Pizzas Delivered This Turn:</b> <span id='deliveries'>"+gameBoard.getNumberOfDeliveries(d.id)+"</span></p>";
                        var productionText = "<p><b>Franchise Pizza Production:</b> "+gameBoard.regions[d.id].generator + "</p>";

                        return [ownerText,numDeliveriesText,productionText].join("<br />");
                    });

                if ( state == "ROUND" && gameBoard.canDeliver(currentPlayer.id,d.id)){
                    var zoneButtons = popup.append("div")
                        .attr("class", "zone-buttons");

                    zoneButtons.append("button")
                        .attr("class", "zone-button-deliver")
                        .on("click", function(e) {
                            currentPlayer.assignDelivery(d.id);

                            tempNum = gameBoard.getNumberOfDeliveries(d.id);
                            if (tempNum > 0) {
                              d3.select("#path" + d.id).attr("fill", function() {
                                return "yellow"; 
                              });
                            } else {
                              playerId = gameBoard.regions[d.id].playerId;
                              
                              if (playerId === null){
                                d3.select("#path" + d.id).attr("fill", function() {
                                  return "grey"; 
                                });
                              }else{
                                d3.select("#path" + d.id).attr("fill", function() {
                                  return gameBoard.players[playerId].color;
                                });
                              }
                            }

                            $("#deliveries").text(gameBoard.getNumberOfDeliveries(d.id));
                            $("#resource-bar-text").text(currentPlayer.numResources);
                            $(".zone-button-undeliver").prop("disabled",false);
                            if(currentPlayer.numResources <= 0){
                              $(this).prop("disabled",true);
                            }
                        })
                        .text("+1");

                    zoneButtons.append("button")
                        .attr("class", "zone-button-undeliver")
                        .on("click", function(e) {
                            currentPlayer.removeDelivery(d.id);

                            tempNum = gameBoard.getNumberOfDeliveries(d.id);
                            if (tempNum > 0) {
                              d3.select("#path" + d.id).attr("fill", function() {
                                return "yellow"; 
                              });
                              log(d3.select("#path" + d.id));
                            } else {
                              playerId = gameBoard.regions[d.id].playerId;
                              
                              if (playerId === null){
                                d3.select("#path" + d.id).attr("fill", function() {
                                  return "grey"; 
                                });
                              }else{
                                d3.select("#path" + d.id).attr("fill", function() {
                                  return gameBoard.players[playerId].color;
                                });
                              }
                            }

                            var numDeliveries = gameBoard.getNumberOfDeliveries(d.id);
                            $("#deliveries").text(numDeliveries);
                            $("#resource-bar-text").text(currentPlayer.numResources);
                            $(".zone-button-deliver").prop("disabled",false);
                            if(numDeliveries <= 0){
                              $(this).prop("disabled",true);
                            }
                        })
                        .text("-1");

                    //disable +1 if not enough resources
                    if(currentPlayer.numResources <= 0 ){
                      $(".zone-button-deliver").prop("disabled",true);
                    }

                    if( gameBoard.getNumberOfDeliveries(d.id) <= 0){
                      $(".zone-button-undeliver").prop("disabled",true);
                    }


                }

                popup.append("button")
                    .attr("class", "ui-btn ui-shadow ui-corner-all summary-button")
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
        })
        .attr("fill", function(d,i){
            playerId = gameBoard.regions[i].playerId;

            if (playerId === null){
              return "grey";
            }else{
              return gameBoard.players[playerId].color;
            }
        })
        .classed("unfaded", true);

    path.order();

    if(state !== "END") {
      timer.style("left", width * 0.01 + "px")
          .style("top", height * 0.01 + "px")
          .style("width", 40 + "px")
          .style("height", 40 + "px");
    }

    exit.style("right", width * 0.01 + "px")
          .style("top", height * 0.01 + "px")
          .style("width", 40 + "px")
          .style("height", 40 + "px")
          .on("click", function(d) {
              game.endTimer();
              $.mobile.changePage("#page-main-menu");
          })
          .text("X");

    resources.style("left", width * 0.25 + "px")
        .style("top", height * 0.85 + "px")
        .style("width", width * 0.5 + "px")
        .style("height", 40 + "px");

    resources.append("text")
          .text(function(d) {
              if(state === "PRE") {
                return "PRE-ROUND "; 
              }
              return state + " ";
          })
          .attr("class","resource-text")
          .attr("margin", 20+"px")
          .attr("height", 30 + "px")
          .attr("width", 30 + "px");

    resources.append("img")
          .attr("src", "img/splash-pizza-2.PNG")
          .attr("height", 30 + "px")
          .attr("width", 30 + "px");

    resources.append("text")
          .text(function(d) {
              return currentPlayer.numResources;
          })
          .attr("id","resource-bar-text")
          .attr("margin", 20+"px")
          .attr("height", 30 + "px")
          .attr("width", 30 + "px");

    resources.append("img")
          .attr("src", "img/store-red.png")
          .attr("height", 30 + "px")
          .attr("width", 30 + "px");

    resources.append("text")
          .text(function(d) {
              return gameBoard.getOwnedRegions(currentPlayer.id).length
          })
          .attr("height", 30 + "px")
          .attr("width", 30 + "px");

    if (isSummaryDisplayed && summaryOpened) { // load right off in summary states
        divOpen = true;
        popup.transition().duration(200)
            .style("pointer-events", "all")
            .style("opacity", .9);

        popup.style("left", width * 0.1 + "px")
            .style("top", height * 0.15 + "px")
            .style("width", width * 0.75 + "px")
            .style("height", height * 0.65 + "px");

        popup.append("div")
            .attr("class", "summary-header")
            .text(function(d) {
              if(state === "PRE") {
                return "PRE-ROUND SUMMARY";
              } 
              return state + " SUMMARY";
            });

        if(state === "PRE") {
            popup.append("div")
              .attr("class", "summary-contents")
              .html(function(d) {
                  return "<p><b>Current Expansion Round:</b> " + gameBoard.currentRound +"</p>" 
                  + "<p><b>Number of Expansion Rounds Left:</b> "+ (gameBoard.numberOfRounds - gameBoard.currentRound) +"</p>"
                  + "<p><b>Number of Franchises:</b> "+ gameBoard.numFranchies() +"</p>";
              });
        } else if (state === "END") {
            popup.append("div")
              .attr("class", "summary-contents")
              .html(function(d) {
                log(gameBoard.getWinner());
                  return "<p>Conquering Franchise: " + gameBoard.getWinner().name +"</p>"
                  + "<p>Number of Franchise Regions: " + gameBoard.getWinner().numResources +"</p>";
              });
        }

        if(state === "END") {
          popup.append("button")
              .attr("class", "ui-btn ui-shadow ui-corner-all summary-button")
              .on("click", function(d) {
                  popup.transition().duration(200)
                      .style("pointer-events", "none")
                      .style("opacity", 0);
                  divOpen = false;
                  summaryOpened = false;
                  cleanup(state);
                  $.mobile.changePage("#page-main-menu");
              })
              .text("RETURN TO MAIN MENU");
        } else {
          popup.append("button")
              .attr("class", "ui-btn ui-shadow ui-corner-all summary-button")
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
}

updateTimer = function(state, timerValue) {
    d3.selectAll(".timer").filter("." + state).text(timerValue);
}

cleanup = function(state) {
    if (state === "PRE") {
        container = "#voronoiContainer-pre";
    } else if (state === "ROUND") {
        container = "#voronoiContainer-round";
    } else if (state === "END") {
        container = "#voronoiContainer-end";
    }

    d3.select(container).selectAll("*").remove();
}