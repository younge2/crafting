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
			db.deck.findById(theDeckId).then(function(deck){
				deck.getCards().then(function(cards){
					console.log(cards[0]);
					res.render('deck/deckCreate', {cards: cards});
				});
			});
		}
	});

	

});












module.exports = router;