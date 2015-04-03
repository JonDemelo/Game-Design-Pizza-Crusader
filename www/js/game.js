var game = {};
	
game.page = {
	'LOAD': '#page-play-game',
	'PRE': '#page-game-pre-round',
	'ROUND': '#page-game-round',
	'END': '#page-game-end'
}

game.isInitialized = false;
game.currentRound = 0;


timerDurations = {
	'LOAD': 1,
	'PRE': 10,
	'ROUND': 20,
}
var botNames = ['Chenbot', 'Marsha', 'Zingbot'];

game.newGame = function(){
	gameBoard = new GameBoard();
	initializePlayers();
	game.currentState = 'PRE';
	update("PRE", true);
	updateTimer("PRE", timerDurations['PRE']);
	$.mobile.changePage(game.page['PRE']);
};

/* debug variable */
game.paused = false;

game.initialize = function(){
	if ( game.isInitialized ){
		return;
	}
	game.isInitialized = true;
	function pageLoadHandler(id,callback){
		$(document).on("pageshow",id,callback);
	}

	function countDown(startTime,callback,endCallback){
		var timeRemaining = startTime;
		var interval = setInterval(function(){
			callback(timeRemaining);

			if( !game.paused ){
				timeRemaining--;
				if ( timeRemaining < 0){
					clearInterval(interval);
					endCallback();
				}
			}


		},1000)
	}

	$("#play-game").click(function(){
		game.newGame();
	})

	pageLoadHandler(game.page['LOAD'],function(event){
		game.currentState = 'LOAD';
		$("#play-game").prop("disabled",true)
		$("#matchmaking-loading").removeClass("hidden")
		$("#matchmaking-div").addClass("hidden");
		countDown(timerDurations['LOAD'],
			function(time){
			},
			function(){
				//get bot name
				var botName = botNames[Math.floor(Math.random()*botNames.length)];
				botPlayer.name = botName;
				$("#matchmaking-list").html("<li class='ui-li ui-li-static ui-btn-up-c ui-corner-top'>"+botName+"</li>");
				$("#matchmaking-loading").addClass("hidden")
				$("#matchmaking-div").removeClass("hidden");
				$("#play-game").prop("disabled",false)
			}
		)
	})


	
	/* round start function */
	pageLoadHandler(game.page['PRE'],function(event){
		game.currentState = 'PRE'
		countDown(timerDurations['PRE'],
			function(time){
				updateTimer("PRE", time);	
			},
			function(){
				cleanup("PRE");
				update("ROUND", false);
				updateTimer("ROUND", timerDurations['ROUND']);
				$.mobile.changePage(game.page['ROUND']);
			}
		)
	})

	$("#btn-deliver").click(function(){
		currentPlayer.assignDelivery($("#in-deliver-region").val())
	})

	function botActions(){
		
		var botRegions = gameBoard.getOwnedRegions(botPlayer.id);
		var numResources = botPlayer.numResources;
		for(i =0;i<numResources;i++){
			var regionId = botRegions[Math.floor(Math.random()*botRegions.length)];
			var neighbours = d3BoardData[regionId].neighbours;
			var deliveryRegion = neighbours[Math.floor(Math.random()*neighbours.length)];
			botPlayer.assignDelivery(deliveryRegion);
		}
	}

	/* ongoing round function */
	pageLoadHandler(game.page['ROUND'],function(event){
		game.currentState = 'ROUND'
		
		countDown(timerDurations['ROUND'],
			function(time){
				updateTimer("ROUND", time);	
			},
			function(){
				cleanup("ROUND");
				botActions();
				gameBoard.endRound();
				if ( gameBoard.isGameOver() ){
					update("END", true);
					game.currentState = 'END'
					$.mobile.changePage(game.page['END']);
				}else{
					update("PRE", true);
					updateTimer("PRE", timerDurations['PRE']);
					$.mobile.changePage(game.page['PRE']);
				}
			}
		)
	})

	/**
	 * Returns a random integer between min (inclusive) and max (inclusive)
	 * Using Math.round() will give you a non-uniform distribution!
	 */
	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}


};
