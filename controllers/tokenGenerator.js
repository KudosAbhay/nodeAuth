"use strict";

// Load jwt module using `require`
var jwt = require("jsonwebtoken");

/* Will Generate a new token */
exports.tokenGenerator = function(req,res){
	if(req.params.id == "" || req.params.id == " " || req.params.id != "username"){
		res.status(200);
		res.send({"response":"Invalid ID"});
	}else{
		// This will create a new token and send it back to user
		var token = jwt.sign({data: "foobar"}, "secret", { expiresIn: "1h" });
		res.status(202);
		res.send({"token":token});
	}
};
