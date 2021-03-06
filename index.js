var express = require('express');
var db = require('./models');
//var request = require('request');
var ejslayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
//var bootstrap = require('bootstrap');
var session = require('express-session');
var flash = require('connect-flash');
var app=express();

app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));
app.use(ejslayouts);

app.use(session({
  secret: 'dsalkfjasdflkjgdfblknbadiadsnkl',
  resave: false,
  saveUninitialized: true
}));

app.use(flash());


var collectionCtrl = require("./controllers/collection.js");
app.use("/collection", collectionCtrl);

var decksCtrl = require("./controllers/decks.js");
app.use("/decks", decksCtrl);

//custom middleware
app.use(function(req, res, next) {
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




app.get('/', function(req,res) {
	console.log(req.session.userId);
	res.render('index.ejs');
});

app.post('/', function(req, res) {
  var username = req.body.userName;
  var password = req.body.password;
  db.user.authenticate(username, password, function(err, user) {
    if (err) {
       req.flash('danger', err);
      res.render('index.ejs', {alerts: req.flash()});
    } else if (user) {
      req.session.userId = user.id;
      res.redirect('/');
    } else {
      req.flash('danger', 'User or Password is incorrect');
      res.render('index.ejs', {alerts: req.flash()});
    }
  });
});

app.get('/logout', function(req, res) {
  req.session.userId = false;
  res.redirect('/');
});

app.get('/signup', function(req,res) {
	res.render('signup.ejs');
});

app.post('/signup', function(req,res) {
	if (req.body.potPassword === req.body.potPassword2){
		db.user.findOrCreate({
		    where: {
		      username: req.body.potUsername
		    },
		    defaults: {
		      password: req.body.potPassword
		    }

    
	  }).spread(function(user, created) {
	  	req.session.whatever="hello!!!";
	    res.redirect('/');
	  }).catch(function(err) {
	    res.send(err);
	  });
	} else {
		console.log('danger');
		req.flash('danger', 'Passwords do not match');
      	res.render('signup.ejs', {alerts: req.flash()});
	}

});

app.get('/toCraft', function(req,res) {
	var person = req.session.userId;
	var cardArr=[];
	db.sequelize.query("SELECT \"decksCards\".\"cardId\" FROM \"usersDecks\" JOIN \"decksCards\" ON \"usersDecks\".\"deckId\"=\"decksCards\".\"deckId\" LEFT OUTER JOIN \"usersCards\" ON \"usersCards\".\"cardId\"=\"decksCards\".\"cardId\" WHERE \"usersDecks\".\"userId\"="+person+"AND \"usersCards\".id IS null").then(function(cards) {
  // Results will be an empty array and metadata will contain the number of affected rows.
  			cards[0].forEach(function(card,index){
  				db.card.find({
  					where:{
  						id: card.cardId
  					}
  				}).then(function(cardIns){
  					console.log(cardIns);
  					cardArr.push(cardIns);
  				});
  			});

}).done(function(){

console.log("CARD ARR"+cardArr[0]);
res.render('toCraft.ejs',{cardArr: cardArr});
});
	
// 	var person = req.session.userId;
// 	db.user.findById(person).then(function(user) {

// 		user.getDecks().then(function(decks){
// 			console.log(decks);
// 			var idDecks = [];
// 			decks.forEach(deck1,index){
// 				//idDecks.push(deck.dataValues.id);
// 				db.deck.find({
// 					where:{
// 						id: deck1.id
// 					}
// 				}).then(function(deck){
// 					deck.getCards().then(function(cards){
// 						cards.forEach(card1,index){
// 							idDecks.push(card1.id)
// 						}
// 					});
// 				});
// 			}
			
// 		});
// 	});
});






app.listen(process.env.PORT || 3000)