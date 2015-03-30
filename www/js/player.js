var Player = function(color,name){
	this.color = color;
	this.name = name;
	this.numResources = 1;
}

Player.prototype.assignDelivery = function(regionId){
	if ( this.numResources > 0){
		gameBoard.assignDeliveries(this.id,regionId,1);
	}else{
		alert("you don't have enough resources");
	}
}

Player.prototype.removeDelivery = function(regionId){
	this.numResources += gameBoard.removeDeliveries(this.id,regionId);
}


var botPlayer = new Player('blue','Bot');
var currentPlayer = new Player('red','You');

function initializePlayers(){
	botPlayer.id = gameBoard.players.length;
	gameBoard.players.push(botPlayer);
	currentPlayer.id = gameBoard.players.length;
	gameBoard.players.push(currentPlayer);

	gameBoard.regions[4].playerId = currentPlayer.id;
	gameBoard.regions[25].playerId = botPlayer.id;
}