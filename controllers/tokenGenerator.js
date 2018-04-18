"use strict";

// Load jwt module using `require`
var jwt = require("jsonwebtoken");

// Import Database connection
var connection = require("./db");

// Import `md5` library for encrypting password
var md5 = require("md5");

const secretKey = "secret";

/* Will Generate a new token */
exports.tokenGenerator = function(req,res){
	if(req.params.id == " " || 
	req.body.pwd == " " ||
	req.body.pwd == undefined){
		res.status(403);
		res.send({"response":"Invalid credentials"});
	}else{
		// This will create a new token and send it back to user
		var token = jwt.sign({uname: req.params.id}, secretKey, { expiresIn: "1h" });
		var jsonDump = {
			"uname": req.params.id,
			"pwd": md5(req.body.pwd)
		};
		connection.query("INSERT INTO users SET ?",[jsonDump],
			function (error, results, fields){
				if (error) {
					switch(error.code){
					case "ER_DUP_ENTRY":
						res.status(403);
						res.send({"response":"Username already taken" });
						break;
					default:
						res.status(500);
						res.send({"response":"Internal Server Error" });	
					}
				}else{
					res.status(202);
					res.send({"token":token});
				}
			});
	}
};
