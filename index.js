var express = require('express');
var db = require('./models');
//var request = require('request');
var ejslayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var app=express();

app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));
app.use(ejslayouts);

var collectionCtrl = require("./controllers/collection.js");
app.use("/collection", collectionCtrl);

var decksCtrl = require("./controllers/decks.js");
app.use("/decks", decksCtrl);

app.get('/', function(req,res) {
	res.render('index.ejs');
});

app.get('/signup', function(req,res) {
	res.render('signup.ejs');
});

app.post('/signup', function(req,res) {
	db.user.findOrCreate({
	    where: {
	      username: req.body.potUsername
	    },
	    defaults: {
	      password: req.body.potPassword
	    }
    
  }).spread(function(user, created) {
    res.redirect('/');
  }).catch(function(err) {
    res.send(err);
  });

});






app.listen(3000);