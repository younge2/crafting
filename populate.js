var db = require("./models");
var unirest = require('unirest');


//populates card table with collectibles + heroes
unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards")
.header("X-Mashape-Key", process.env.MASHAPE_HS_KEY)
.end(function (result) {
  //console.log(result.status, result.headers, result.body);
 	for (setKey in result.body){
 		for (cardKey in result.body[setKey]){
 			var card = result.body[setKey][cardKey];
 			//console.log(result.body[key][set].name);
 			if (card.collectible){
 				db.card.findOrCreate({
		  			where: {
		  				name: card.name
		  				
		  			},
		  			defaults: {
		  				cardId: card.cardId,
		  				class: card.playerClass,
		  				rarity: card.rarity,
		  				set: card.cardSet,
		  				cost: card.cost
		  			}
		  		}).spread(function(card, created) {
		  			console.log("created: "+created);
		  			console.log("card: "+card.name);
		  		});
	 				
 			}
 		}
 	}

 
});
