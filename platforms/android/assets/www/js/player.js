var Player = function(color){
	this.color = color;
}

Player.prototype.assignDelivery = function(regionId){
	if ( this.numResources > 0){
		gameBoard.assignDeliveries(this.id,regionId,1);
	}else{
		alert("you don't have enough resources");
	}
}


var botPlayer = new Player('red');
var currentPlayer = new Player('blue');

function initializePlayers(){
	botPlayer.id = gameBoard.players.length;
	gameBoard.players.push(botPlayer);
	currentPlayer.id = gameBoard.players.length;
	gameBoard.players.push(currentPlayer);

	botPlayer.numResources = 4;
	currentPlayer.numResources = 4;
}