var game = {};
	
game.page = {
	'LOAD': '#page-play-game',
	'PRE': '#page-game-pre-round',
	'ROUND': '#page-game-round',
	'POST': '#page-game-post',
	'END': '#page-game-end'
}

game.currentState = 'PRE'

game.isInitialized = false;
game.newGame = function(){
	game.currentState = 'PRE';
	$.mobile.changePage(game.page['PRE']);
};

game.initialize = function(){
	if ( game.isInitialized ){
		return;
	}
	game.isInitialized = true;
	function pageLoadHandler(id,callback){
		log("loaded "+id)
		$(document).on("pageshow",id,callback);
	}

	function countDown(startTime,callback,endCallback){
		var timeRemaining = startTime;
		var interval = setInterval(function(){
			callback(timeRemaining);
			timeRemaining--;
			if ( timeRemaining < 0){
				clearInterval(interval);
				endCallback();
			}

		},1000)
	}

	/* new game function */
	pageLoadHandler(game.page['LOAD'],function(event){
		game.newGame();
	})

	/* round start function */
	pageLoadHandler(game.page['PRE'],function(event){
		countDown(5,
			function(time){
				$("#pre-round-timer").text(time);	
				console.log(time);	
			},
			function(){
				$.mobile.changePage(game.page['ROUND']);
			}
		)
	})

	/* ongoing round function */
	pageLoadHandler(game.page['ROUND'],function(event){
		console.log("round listener started");
		countDown(15,
			function(time){
				$("#round-timer").text(time);	
				log(time);	
			},
			function(){
				$.mobile.changePage(game.page['POST']);
			}
		)
	})


	/* end of round function */
	pageLoadHandler(game.page['POST'],function(event){
		countDown(15,
			function(time){
				$("#round-timer").text(time);		
			},
			function(){
				//TODO: check if any winners
				$.mobile.changePage(game.page['END']);
			}
		)
	})

};
