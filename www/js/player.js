var Player = function(){
	this.numResources = 0;
	this.controlledRegions = [];
	this.color = 'green';
}

Player.prototype.assignDelivery = function(regionId){
	gameBoard.assignDeliveries(this.id,regionId,1);
}


var currentPlayer = new Player(0);

currentPlayer.id = gameBoard.players.length;
gameBoard.players.push(currentPlayer);