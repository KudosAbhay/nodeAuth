"use strict";

// Load jwt module using `require`
var jwt = require("jsonwebtoken");

const secretKey = "secret";

/* Will Generate a new token */
exports.tokenGenerator = function(req,res){
	if(req.params.id == "" || req.params.id == " "){
		res.status(403);
		res.send({"message":"Invalid ID"});
	}else{
		// This will create a new token and send it back to user
		var token = jwt.sign({uname: req.params.id}, secretKey, { expiresIn: "1h" });
		res.status(202);
		res.send({"token":token});
	}
};
