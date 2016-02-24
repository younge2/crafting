var express = require("express");
var bodyParser = require('body-parser');
var db = require('../models');
var ejslayouts = require('express-ejs-layouts');

var router = express.Router();
router.use(ejslayouts);


router.use(bodyParser.urlencoded({extended: false}));

router.get('/', function(req,res) {
	console.log("entering get");
	db.card.findAll({
		where: {
			id: {
				$notIn: [1, 2, 3, 4, 5, 6, 7, 8, 9, 576, 577, 578], 
			}
		}
	}).then(function(cardArr){
		res.render('collection/collection.ejs',{cards: cardArr});
	});
	

});







module.exports = router;