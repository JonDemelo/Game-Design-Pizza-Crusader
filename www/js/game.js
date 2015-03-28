var game = {};
	
game.page = {
	'LOAD': '#page-play-game',
	'PRE': '#page-game-pre-round',
	'ROUND': '#page-game-round',
	'POST': '#page-game-post',
	'END': '#page-game-end'
}

game.currentState = 'PRE'

game.newGame = function(){
	game.currentState = 'PRE';
	$.mobile.changePage(game.page['PRE']);
};

function pageLoadHandler(id,callback){
	log("loaded "+id)
	$(document).on("pageshow",id,callback);
}

pageLoadHandler(game.page['LOAD'],function(event){
	game.newGame();
})

pageLoadHandler(game.page['PRE'],function(event){
   	var timeRemaining = 15;
   	setInterval(function(){
   		$("#pre-round-timer").text(timeRemaining);
   		timeRemaining--;
   		if(timeRemaining == 0){
   			$.mobile.changePage(game.statesToPage['ROUND']);
   		}
   	},1000) 
})
