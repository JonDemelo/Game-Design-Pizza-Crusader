
/**
 * represents a region. 
 * each region has a number of resources it generates
 */
var Region = function(generator){
	this.generator = typeof generator !== 'undefined'? generator : 0;
	this.incomingDeliveries = [];
	this.playerId = null;
}

var GameBoard = function(){
	this.players = [];
	this.regions = [];
	for(i = 0;i<10;i++){
		this.regions.push(new Region(1))
	}
	this.currentRound = 1;
	this.numberOfRounds = 3;
}

GameBoard.prototype.assignDeliveries = function(playerId,regionId, numDeliveries){
	this.regions[regionId].incomingDeliveries[playerId] = numDeliveries;
}



GameBoard.prototype.endRound = function(){
	//update which region belongs to which player
	var self = this;
	this.currentRound++;
	this.regions.forEach(function(region){
		var owner = null;
		var ownerDeliveries = 0;
		region.incomingDeliveries.forEach(function(delivery,idx){
			if ( delivery > ownerDeliveries){
				owner = idx;
			}
		})

		if ( owner == null){
			return;
		}
		region.incomingDeliveries = [];

		if ( region.playerId != null ){
			self.players[region.playerId].numResources -= region.generator;
		}
		region.playerId = owner;

		self.players[region.playerId].numResources += region.generator;
	})


	//update game board with new data
}


GameBoard.prototype.isGameOver = function(){
	if ( this.currentRound >= this.numberOfRounds){
		return true;
	}

	var player = this.regions[0].playerId;
	return this.regions.every(function(region){
		return region.playerId == player;
	});

}

GameBoard.prototype.getWinner = function(){
	
	var numRegionsByPlayer = [];
	this.regions.forEach(function(region){
		if ( region.playerId != null){
			var val = numRegionsByPlayer[region.playerId];
			if ( val == null){
				val = 1;
			}else{
				val++;
			}
			numRegionsByPlayer[region.playerId] = val;
		}
	});

	var winner = 0;
	var numberOfRegions = 0;

	numRegionsByPlayer.forEach(function(num,i){
		if(num>numberOfRegions){
			winner = i;
		}
		numberOfRegions = num;
	})

	return winner;

}

gameBoard = new GameBoard();