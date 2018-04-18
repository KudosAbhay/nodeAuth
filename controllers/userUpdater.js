"use strict";

// Load jwt module using `require`
// var jwt = require("jsonwebtoken");

// Import Database connection
var connection = require("./db");

// Import `md5` library for encrypting password
var md5 = require("md5");

/* Will Help Change Password of a `username` */
exports.userUpdater = function(req,res){
	if(req.params.id == " " || 
	req.body.pwd == " " ||
	req.body.pwd == undefined){
		res.status(403);
		res.send({"response":"Invalid credentials"});
	}else{
		connection.query("UPDATE users SET pwd = ? WHERE uname = ?",[ md5(req.body.pwd), req.params.id],
			function (error, results, fields){
				if (error) {
					res.status(500);
					res.send({"response":error.message });	
				}else{
					switch(results.affectedRows){
					case 1:
						res.status(202);
						res.send({"response": "updated successfully"});
						break;
					case 0:
						res.status(403);
						res.send({"response": "Username does not exist"});
						break;
					default:
						res.status(200);
						res.send({"response": "Try again with valid credentials"});
					}
				}
			});
	}
};
