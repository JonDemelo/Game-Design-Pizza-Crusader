
/**
 * represents a region. 
 * each region has a player and a number of resources it generates
 */
var Region = function(player,generator){
	this.generator = typeof generator !== 'undefined'? generator : 0;
	this.player = player;
	this.incomingDeliveries = [];
}

var GameBoard = function(){
	this.players = [];
	this.regions = [];
}

GameBoard.prototype.assignDeliveries = function(playerId,regionId, numDeliveries){
	this.regions[regionId].incomingDeliveries[playerId] = numDeliveries;
}



GameBoard.prototype.endRound = function(){
	//see which region belongs to which player

	//update game board with new data
}


GameBoard.prototype.isGameOver = function(playerId){
	var player = this.regions[0].player;
	var isOver = true;
	this.regions.each(function(region){
		if ( region.player != player){
			isOver = false;
			return false;
		}
	});

	return isOver;
}


gameBoard = new GameBoard();
