/*
This is referred from the following stackoverflow answer: 
`https://stackoverflow.com/questions/17015590/node-js-mysql-needing-persistent-connection`

1. Objective - To Connect to Database using Pool concept 
            for attaining persistent connection to MySQL Database

2. Flow -
    a)  Import necessary modules for the operation
    b)  Connect to Database using a Pool Connection
    c)  Return back response to invoker functions after querying Database
*/

// Import `mysql` module for node.js
var mysql = require("mysql");

// Create a Pool of Connections to Database
var pool = mysql.createPool({
	host     : "localhost",
	user     : "root",
	password : "Password#123",
	database : "hackerBay",
	port     : 3306
});

// Exporting module for `query` handling
module.exports = {
	query: function () {
		var queryArgs = Array.prototype.slice.call(arguments),
			events = [],
			eventNameIndex = {};

		pool.getConnection(function (err, conn) {
			if (err) {
				// Error connecting to Database due to some reason
				if (eventNameIndex.error) {
					eventNameIndex.error();
				}else{
					console.log(err.code);
					console.log(err.sqlMessage);
				}
			}
			if (conn) {
				// Successfully connected to Database. Fire Query now
				var q = conn.query.apply(conn, queryArgs);
				q.on("end", function () {
					// Job is complete. Will release the connection back to the pool
					conn.release();
				});

				events.forEach(function (args) {
					q.on.apply(q, args);
				});
			}
		});

		return {
			// Return results back to invoker function
			on: function (eventName, callback) {
				events.push(Array.prototype.slice.call(arguments));
				eventNameIndex[eventName] = callback;
				return this;
			}
		};
	}
};