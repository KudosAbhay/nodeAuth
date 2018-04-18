"use strict";

// Load express module using `require`
var express = require("express");

// Load bodyParser module using `require`
var bodyParser = require("body-parser");

// Load thumbnail module using `require`
var thumb = require("node-thumbnail").thumb;

var app = express();

var tokenGenerator  = require("./controllers/tokenGenerator");
var tokenValidator  = require("./controllers/tokenValidator");
var userUpdater 	= require("./controllers/userUpdater");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// Welcome Note on main page (/)
app.get("/", function(req, res){
	res.status(202);
	res.send("Welcome to Node APIs");
});

// POST Request to generate a new token
app.post("/users/:id",tokenGenerator.tokenGenerator);

// PATCH Request to update existing user password
app.patch("/users/:id", userUpdater.userUpdater);

// POST Request to verify existing user using his token
app.post("/users/token/verify",tokenValidator.tokenValidator);

// POST Request to create thumbnail from received image
app.post("/users/:id/dp", function(res,req){
	// thumb({
	// 	source: req.body, // could be a filename: dest/path/image.jpg
	// 	destination: "./assets/img/raw",
	// 	concurrency: 4
	// }, function(files, err, stdout, stderr) {
	// 	if(err){
	// 		res.status(500);
	// 		res.send({"response": "Internal Server Error"});
	// 	}else if(stderr){
	// 		res.status(500);
	// 		res.send({"response": "Internal Server Error"});
	// 	}else{
	// 		res.status(202);
	// 		res.send({"response": files});
	// 	}

	// });	
});


// Launch listening server on port 3000
app.listen(3000, function(){
	console.log("App is running on port 3000!");
});


/**
 * Export the Express app so that it can be used by `Chai` module
 */
module.exports = app;