var db = require("./models");
var unirest = require('unirest');

//adds a card to a deck
// db.deck.findById(1).then(function(deck) {

// 	console.log(deck);
// 	console.log ("DECKOOOOOO"+deck.dataValues.id);
// 	db.card.findAll({
// 		where:{
// 			name: "Doomsayer"
// 		}
// 	}).then(function(card){
// 		console.log(card);
// 		console.log(card[0].dataValues.id);
// 			deck.addCard(card, {counter: 0}).then(function(wat){	
// 					db.decksCards.find({
// 					where:{
// 						deckId:deck.dataValues.id,
// 						cardId: card[0].dataValues.id
// 					}
// 					}).then(function(joined){
// 						console.log(joined);
// 						joined.increment({counter: 2});
// 						console.log("COUNTER!!!!: "+joined.counter);
// 					});
// 			});
			
		
		

// 	});

// });

//creates a deck
// db.user.findOne({
// 	where: {
// 		username: "Solheim"
// 	}
// }).then(function(user) {
// 	db.deck.create({
// 		name: "Hypedafreeze"
// 	}).then(function(deck){
// 		user.addDeck(deck).then(function(wat){
// 			console.log(wat);
// 		})
// 	})
// });


// //adds basic card set to join table
// db.user.findOne({
// 	where: {
// 		username: "Solheim"
// 	}
// }).then(function(user) {
// 	console.log(user);
// 	db.card.findAll({
// 		where:{
// 			set: "Basic"
// 		}
// 	}).then(function(cards){
// 		//console.log(cards);
// 		cards.forEach(function(card,index){
// 			user.addCard(card, {counter: 0}).then(function(wat){	
// 					db.usersCards.find({
// 					where:{
// 						userId:user.id,
// 						cardId: card.id
// 					}
// 					}).then(function(joined){
// 						joined.increment({counter: 2});
// 						console.log("COUNTER!!!!: "+joined.counter);
// 					});
// 			});
			
// 		});
		

// 	});
	
//  });








// //adds a card to the join table.
// db.user.findOne({
// 	where: {
// 		username: "Solheim"
// 	}
// }).then(function(user) {
// 	console.log(user);
// 	db.card.findOne({
// 		where:{
// 			name: "Voidwalker"
// 		}
// 	}).then(function(card){
// 		console.log(card);
// 		user.addCard(card);
// 		db.usersCards.find({
// 			where:{
// 				userId:user.id,
// 				cardId: card.id
// 			}
// 		}).then(function(joined){
// 			joined.increment('counter');
// 			console.log("COUNTER!!!!: "+joined.counter);
// 		});

// 	});
	
// });



// for(var i=0; i<2; i++){
// db.usersCards.create({
// 	  		userId: 6,
// 	  		cardId: 5
// 	  	}).then(function(){
// 	  		//console.log(card.name);
// 	  	});
// }

// db.card.all().then(function(cards) {
//   // cards will be an array of all card instances
//   cards.forEach(function(card, index){
//   	for(var i=0; i<2; i++){
// 	  	db.usersCards.create({
// 	  		userId: 6,
// 	  		cardId: card.id
// 	  	}).then(function(){
// 	  		//console.log(card.name);
// 	  	});
//   	}
  	
//   });
// });



//test adding users
// db.user.findOrCreate({
// 	where:{
// 		username: "admin@geth.doom"
// 	},
// 	defaults: {
// 		password: "maltodextrin"
// 	}
// }).spread(function(user,created) {
// 	//console.log(user.get());
// 	console.log(created);
// });

// db.user.findOne({
// 	where: {
// 		username: "admin@geth.doom"
// 	}
// }).then(function(user) {
// 	console.log(user.get());
// })

// //populates card table with collectibles + heroes
// unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards")
// .header("X-Mashape-Key", process.env.MASHAPE_HS_KEY)
// .end(function (result) {
//   //console.log(result.status, result.headers, result.body);
//  	for (setKey in result.body){
//  		for (cardKey in result.body[setKey]){
//  			var card = result.body[setKey][cardKey];
//  			//console.log(result.body[key][set].name);
//  			if (card.collectible){
//  				db.card.findOrCreate({
// 		  			where: {
// 		  				name: card.name
		  				
// 		  			},
// 		  			defaults: {
// 		  				cardId: card.cardId,
// 		  				class: card.playerClass,
// 		  				rarity: card.rarity,
// 		  				set: card.cardSet,
// 		  				cost: card.cost
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
// .header("X-Mashape-Key", process.env.MASHAPE_HS_KEY)
// .end(function (result) {
//   //console.log(result.status, result.headers, result.body);
//   result.body.forEach(function(card){
//   	if (card.collectible){
//   		console.log(card);
//   	}
//   });
// });