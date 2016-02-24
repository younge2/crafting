var express = require("express");
var bodyParser = require('body-parser');
var db = require('../models');

var router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));







module.exports = router;