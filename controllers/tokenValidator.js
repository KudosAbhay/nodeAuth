"use strict";

// Load jwt module using `require`
var jwt = require("jsonwebtoken");

/* Will Validate incoming request if authenticated */
exports.tokenValidator = function(req,res){
	if(req.body.token == null || req.body.token == " " || req.body.token == ""){
		res.status(200);
		res.send({"response": "Invalid Token"});
	}else{
		// This will verify a token and direct user to something else
		jwt.verify(req.body.token, "secret", function(err, decoded) {
			if(err){
				switch(err.name){
				case "JsonWebTokenError":   res.send({"response" :err.message});
					break;
				case "TokenExpiredError":   res.send({"response": err.message});
					break;
				default:    res.send({"response": "Unexpected Error Occured"});
				}
			}else{
				res.send({"response": "validated"});
			}
		});
	}
}; //end of code
