var Player = function(){
	this.numResources = 4;
	this.controlledRegions = [];
	this.color = 'green';
}

Player.prototype.assignDelivery = function(regionId){
	if ( this.numResources > 0){
		gameBoard.assignDeliveries(this.id,regionId,1);
	}else{
		alert("you don't have enough resources");
	}
}


var botPlayer = new Player();
var currentPlayer = new Player();


gameBoard.players.push(botPlayer);
currentPlayer.id = gameBoard.players.length;
gameBoard.players.push(currentPlayer);