var Player = function(id){
	this.id = id;
	this.numResources = 0;
	this.controlledRegions = [];
	this.color = 'green';
}

Player.prototype.assignDelivery(regionId){
	gameBoard.assignDeliveries(this.id,regionId,numResources);
}


var currentPlayer = Player(0);

gameBoard.player[currentPlayer.id] = currentPlayer;