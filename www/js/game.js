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
	'PRE': 10,
	'ROUND': 20,
}

game.newGame = function(){
	game.currentState = 'PRE';
	update("PRE", true);
	updateTimer("PRE", timerDurations['PRE']);
	$.mobile.changePage(game.page['PRE']);
	gameBoard = new GameBoard();
	initializePlayers();
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


	
	/* round start function */
	pageLoadHandler(game.page['PRE'],function(event){
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
		for(i =0;i<botPlayer.numResources;i++){
			var regionId = botRegions[Math.floor(Math.random()*botRegions.length)];
			var neighbours = d3BoardData[regionId].neighbours;
			var deliveryRegion = neighbours[Math.floor(Math.random()*neighbours.length)];
			botPlayer.assignDelivery(deliveryRegion);
		}
	}

	/* ongoing round function */
	pageLoadHandler(game.page['ROUND'],function(event){
		
		//bot actions

		countDown(timerDurations['ROUND'],
			function(time){
				updateTimer("ROUND", time);	
			},
			function(){
				cleanup("ROUND");
				if ( gameBoard.isGameOver() ){
					update("END", true);
					$.mobile.changePage(game.page['END']);
				}else{
					botActions();
					gameBoard.endRound();
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
