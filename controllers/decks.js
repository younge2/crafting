var express = require("express");
var bodyParser = require('body-parser');
var db = require('../models');
var ejslayouts = require('express-ejs-layouts');

var router = express.Router();
router.use(ejslayouts);

router.use(bodyParser.urlencoded({extended: false}));

//custom middleware
router.use(function(req, res, next) {
  if (req.session.userId) {
    db.user.findById(req.session.userId).then(function(user) {
      req.currentUser = user;
      res.locals.currentUser = user;
      next();
    });
  } else {
    req.currentUser = false;
    res.locals.currentUser = false;
    next();
  }
});

router.get('/', function(req,res) {
	var person = req.session.userId;

	db.user.findById(person).then(function(user) {

		user.getDecks().then(function(decks){
			console.log(decks);
			res.render('deck/tier.ejs', {decks:decks});
		});
	});


});

router.get("/create/:id",function(req,res) {
	var theDeckId=req.params.id;
	var person = req.session.userId;
	db.usersDecks.find({
		where: {
			userId: person,
			deckId: theDeckId
		}
	}).then(function(decks){
		console.log("DECKS!!!!!!"+decks)
		if(decks){
			db.card.findAll({
				where: {
					id: {
						$notIn: [1, 2, 3, 4, 5, 6, 7, 8, 9, 576, 577, 578], 
					}
				}
			}).then(function(cardArr){
				db.deck.findById(theDeckId).then(function(deck){
					deck.getCards().then(function(cards){
						console.log(cards);
						res.render('deck/deckCreate', {cards: cards, cardArr: cardArr});
					});
				});
			});
		}
	});

	

});

router.post("/create/:id", function(req, res) {
	var theDeckId=req.params.id;
	var newCard = req.body.cardName;
	var person = req.session.userId;
	//adds a card to the join table.
	db.deck.findById(theDeckId).then(function(deck) {
		console.log(deck);
		db.card.findOne({
			where:{
				name: newCard
			}
		}).then(function(card){
			console.log("CARD!!!!!!!!!!!!!!!!!"+card.dataValues.id);
			deck.addCard(card).then(function(wat) {



				db.decksCards.find({
					where:{
						deckId: theDeckId,
						cardId: card.dataValues.id
					}
				}).then(function(joined){
					console.log("GAHHHHH"+joined);
					if (joined.counter){
						joined.increment('counter');
						console.log("COUNTER!!!!: "+joined.counter);
						res.redirect(''+req.params.id);
					} else {
						joined.counter= 1;
						joined.save().then(function(){
							res.redirect(''+req.params.id);
						});
						console.log("COUNTER!!!!: "+joined.counter);
					}
					
				});
			});

		});
		
	});
});

router.post('/', function(req, res) {
	var newDeck= req.body.deckName;
	var person = req.session.userId;
		db.user.findById(person).then(function(user) {
		db.deck.create({
			name: req.body.deckName
		}).then(function(deck){
			user.addDeck(deck).then(function(wat){
				res.redirect('/');
			})
		});
	});

});












module.exports = router;