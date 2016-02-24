var db = require("./models");
var unirest = require('unirest');

db.user.findOrCreate({
	where:{
		username: "admin@geth.doom"
	},
	defaults: {
		password: "maltodextrin"
	}
}).spread(function(user,created) {
	//console.log(user.get());
	console.log(created);
});

db.user.findOne({
	where: {
		username: "admin@geth.doom"
	}
}).then(function(user) {
	console.log(user.get());
})

//populates card table with collectibles + heroes
// unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards")
// .header("X-Mashape-Key", "BYlN83YoMomshn1SwxA3vyZgQFJWp1PjsTTjsnNHH65lRXohE4")
// .end(function (result) {
//   //console.log(result.status, result.headers, result.body);
//  	for (setKey in result.body){
//  		for (cardKey in result.body[setKey]){
//  			var card = result.body[setKey][cardKey];
//  			//console.log(result.body[key][set].name);
//  			if (card.collectible){
//  				db.card.findOrCreate({
// 		  			where: {name: card.name},
// 		  			defaults: {
// 		  				cardId: card.cardId,
// 		  				class: card.playerClass,
// 		  				rarity: card.rarity
// 		  			}
// 		  		}).spread(function(card, created) {
// 		  			console.log("created: "+created);
// 		  			console.log("card: "+card.name);
// 		  		});
	 				
//  			}
//  		}
//  	}

 
// });



//searches for a specific card
// unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/archmage")
// .header("X-Mashape-Key", "BYlN83YoMomshn1SwxA3vyZgQFJWp1PjsTTjsnNHH65lRXohE4")
// .end(function (result) {
//   //console.log(result.status, result.headers, result.body);
//   result.body.forEach(function(card){
//   	if (card.collectible){
//   		console.log(card);
//   	}
//   });
// });