var Player = function(){
	this.numResources = 0;
	this.controlledRegions = [];
	this.color = 'green';
}

Player.prototype.assignDelivery = function(regionId){
	gameBoard.assignDeliveries(this.id,regionId,1);
}


var botPlayer = new Player();
var currentPlayer = new Player();


gameBoard.players.push(botPlayer);
currentPlayer.id = gameBoard.players.length;
gameBoard.players.push(currentPlayer);