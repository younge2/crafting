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
	console.log("entering get");
	var person = req.session.userId;
	db.card.findAll({
		where: {
			id: {
				$notIn: [1, 2, 3, 4, 5, 6, 7, 8, 9, 576, 577, 578], 
			}
		}
	}).then(function(cardArr){
	
		db.user.findById(person).then(function(user){
			user.getCards().then(function(cards){
				console.log(cards[0].usersCards.dataValues.counter);
				res.render('collection/collection.ejs',{cards: cards, cardArr: cardArr});
					
			});
				
		});

	});

});

router.post("/", function(req, res) {
	var newCard = req.body.cardName;
	var person = req.session.userId;
	//adds a card to the join table.
	db.user.findById(person).then(function(user) {
		console.log(user);
		db.card.findOne({
			where:{
				name: newCard
			}
		}).then(function(card){
			console.log(card);
			user.addCard(card);

			db.usersCards.find({
				where:{
					userId: user.id,
					cardId: card.id
				}
			}).then(function(joined){
				//console.log("GAHHHHH"+joined.counter);
				if (joined.counter){
					joined.increment('counter');
					console.log("COUNTER!!!!: "+joined.counter);
					res.redirect('collection');
				} else {
					joined.counter= 1;
					joined.save().then(function(){
						res.redirect('collection');
					});
					console.log("COUNTER!!!!: "+joined.counter);
				}
				
			});

		});
		
	});
})







module.exports = router;


// id: {
// 				$notIn: [1, 2, 3, 4, 5, 6, 7, 8, 9, 576, 577, 578], 
// 			}