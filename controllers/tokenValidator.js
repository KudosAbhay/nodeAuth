"use strict";

// Load jwt module using `require`
var jwt = require("jsonwebtoken");

// Import Database connection
var connection = require("./db");

/* Will Validate incoming request if authenticated */
exports.tokenValidator = function(req,res){
	if(req.body.token == null || req.body.token == " " || req.body.token == ""){
		res.status(403);
		res.send({"response": "Invalid Token"});
	}else{
		// This will verify a token and direct user to something else
		jwt.verify(req.body.token, "secret", function(err, decoded) {
			if(err){
				switch(err.name){
				case "JsonWebTokenError":   
					res.status(403);
					res.send({"response" :err.message});
					break;
				case "TokenExpiredError":   
					res.status(403);
					res.send({"response": err.message});
					break;
				default:
					res.send({"response": "Unexpected Error Occured"});
				}
			}else{
				var jsonDump = {
					"uname": decoded.uname,
				};
				connection.query("SELECT uname FROM users WHERE ?",[jsonDump],
					function (error, results, fields){
						if (error){
							console.log(error);
							res.status(500);
							res.send({"response":"Internal Server Error" });	
						}else{
							res.status(202);
							res.send({"response": "valid"});
						}
					});
			}
		});
	}
}; //end of code
