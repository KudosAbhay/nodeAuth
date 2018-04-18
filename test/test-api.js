"use strict";

// Import `chai` module
const chai = require("chai");

// Use `expect` module from chai for testing purposes
const expect = require("chai").expect;

// Use `chai-http` to test APIs
chai.use(require("chai-http"));

const app = require("../app.js"); // Our app

var token = "";

describe("check  if server has started on port 3000", function(){
	// Set timeout to wait for a response
	this.timeout(3000);

	it("hitting first request to main page", function(){
		return chai.request(app)
			.get("/")
			.then( function(res){
				expect(res.status).to.equal(202);
			});
	});
});


describe("Testing APIs...", function(){
	describe("API | auth | tokenGenerator", function(){
		// Set timeout to wait for a response
		this.timeout(3000);
    
		it("should not provide a valid token for empty password", function(){
			return chai.request(app)
				.post("/users/abhay")
				.send({
				})
				.then( function(res){
					expect(res).to.be.json;
					expect(res.status).to.equal(403);
					expect(res.body.response).to.equal("Invalid credentials");
				});
		});

		it("should not permit same username entry", function(){
			return chai.request(app)
				.post("/users/abhay")
				.send({
					"pwd":"anypassword"
				})
				.then( function(res){
					expect(res).to.be.json;
					expect(res.status).to.equal(403);
					expect(res.body.response).to.equal("Username already taken");
				});
		});

		it("should permit new username entry", function(){
			return chai.request(app)
				.post("/users/newuser")
				.send({
					"pwd":"newuser"
				})
				.then( function(res){
					expect(res).to.be.json;
					expect(res.status).to.equal(202);
					token = res.body.token;					
				});
		});

	}); // test cases for tokenGenerator end here

	describe("API | auth | tokenValidator", function(){
		// Set timeout to wait for a response
		this.timeout(3000);

		it("should invalidate request for empty token", function(){
			return chai.request(app)
				.post("/users/token/verify")
				.send({
					"token":" "
				})
				.then( function(res){
					expect(res).to.be.json;
					expect(res.status).to.equal(403);
					expect(res.body.response).to.equal("Invalid Token");
				});
		});

		it("should invalidate request for invalid token", function(){
			return chai.request(app)
				.post("/users/token/verify")
				.send({
					"token":"hellothere"
				})
				.then( function(res){
					expect(res).to.be.json;
					expect(res.body.response).to.equal("jwt malformed");
				});
		});

		it("should validate request for valid token", function(){
			return chai.request(app)
				.post("/users/token/verify")
				.send({
					"token":token
				})
				.then( function(res){
					expect(res).to.be.json;
					expect(res.status).to.equal(202);
					expect(res.body.response).to.equal("valid");
				});
		});

	}); // test cases for tokenValidator end here

}); // main describe() ends here


after(function () {
	// Exit the test cases after all tests are finished
	process.exit(0);
});