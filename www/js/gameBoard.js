
/**
 * represents a region. 
 * each region has a number of resources it generates
 */
var Region = function(generator){
	this.generator = typeof generator !== 'undefined'? generator : 0;
	this.incomingDeliveries = [];
}

var GameBoard = function(){
	this.players = [];
	this.regions = [];
	for(i = 0;i<10;i++){
		this.regions.push(new Region(1))
	}
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
