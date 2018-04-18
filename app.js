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

app.post("/users/:id",tokenGenerator.tokenGenerator);
app.post("/users/token/verify",tokenValidator.tokenValidator);

app.post("/api/dp/pic", function(res, req){
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


//Launch listening server on port 3000
app.listen(3000, function(){
	console.log("App is running on port 3000!");
});


/**
 * Export the Express app so that it can be used by Chai
 */
module.exports = app;