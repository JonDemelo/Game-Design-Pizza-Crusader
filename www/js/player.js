var Player = function(color,name){
	this.color = color;
	this.name = name;
	this.numResources = 1;
}

Player.prototype.assignDelivery = function(regionId){
	if ( this.numResources > 0){
		gameBoard.assignDeliveries(this.id,regionId,1);
		this.numResources--;
	}
}

Player.prototype.removeDelivery = function(regionId){
	this.numResources += gameBoard.removeDeliveries(this.id,regionId);
}


var botPlayer = new Player('blue','Bot 1');
var botPlayer2 = new Player('green','Bot 2');
var botPlayer3 = new Player('cyan','Bot 3');
var currentPlayer = new Player('red','You');

var bots = [botPlayer,botPlayer2,botPlayer3];

function initializePlayers(){
	bots.forEach(function(bot){
		bot.id = gameBoard.players.length;
		gameBoard.players.push(bot);
	
	})
	
	currentPlayer.id = gameBoard.players.length;
	gameBoard.players.push(currentPlayer);

	gameBoard.regions[4].playerId = currentPlayer.id;
	gameBoard.regions[25].playerId = botPlayer.id;
	gameBoard.regions[0].playerId = botPlayer2.id
	gameBoard.regions[29].playerId = botPlayer3.id
}