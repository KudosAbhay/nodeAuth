"use strict";

// Load express module using `require`
var express = require("express");

// Load bodyParser module using `require`
var bodyParser = require("body-parser");

var app = express();

var tokenGenerator  = require("./controllers/tokenGenerator");
var tokenValidator  = require("./controllers/tokenValidator");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

//Define request in root URL (/)
app.get("/", function(req, res){
	res.status(202);
	res.send("Welcome to Node APIs");
});

app.get("/api/auth/:id",tokenGenerator.tokenGenerator);
app.post("/api/auth/verify",tokenValidator.tokenValidator);

//Launch listening server on port 3000
app.listen(3000, function(){
	console.log("App is running on port 3000!");
});


/**
 * Export the Express app so that it can be used by Chai
 */
module.exports = app;