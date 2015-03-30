var Player = function(color,name){
	this.color = color;
	this.name = name;
}

Player.prototype.assignDelivery = function(regionId){
	if ( this.numResources > 0){
		gameBoard.assignDeliveries(this.id,regionId,1);
	}else{
		alert("you don't have enough resources");
	}
}


var botPlayer = new Player('red','Bot');
var currentPlayer = new Player('blue','You');

function initializePlayers(){
	botPlayer.id = gameBoard.players.length;
	gameBoard.players.push(botPlayer);
	currentPlayer.id = gameBoard.players.length;
	gameBoard.players.push(currentPlayer);

	botPlayer.numResources = 4;
	currentPlayer.numResources = 4;

	gameBoard.regions[4].playerId = currentPlayer.id;
	gameBoard.regions[25].playerId = botPlayer.id;
}