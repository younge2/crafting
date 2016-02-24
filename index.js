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
      res.send(err);
    } else if (user) {
      req.session.userId = user.id;
      res.redirect('/');
    } else {
      res.send('user and/or password invalid');
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






app.listen(3000);