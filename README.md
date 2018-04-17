# nodeAuth

This app has the following major functionalities -
- Generation of JWT Tokens
- Validation of User using using that JWT Token


### Endpoint functionality (Public Endpoints)

##### Generation of New Token
- Generation of New Token to Log In based on user Identity (Request body should contain an arbitrary username)
- Returns a signed Json Web Token, which can be used to validate future requests.


##### Validation of Token
- The JWT obtained in the “Login” endpoint must be present in request. If the JWT is missing or invalid, user will not be able to sign in.
- Returns a Response message mentioning if the request is invalid or successfull for loggin in.


#### Test Suite 
- Test suite used is Mocha (https://mochajs.org/) and Instanbul (https://www.npmjs.com/package/istanbul).
- APIs are able to reject invalid request inputs.
- JSLinting is done using eslint (https://www.npmjs.com/package/eslint).

#### Setup
- Install [eslint](https://www.npmjs.com/package/eslint), [nodemon](https://www.npmjs.com/package/nodemon), and [forever](https://www.npmjs.com/package/forever) globally
- Satisfy all dependencies with ”npm install”

#### Usage
- Start the server with “npm start”,
- Run the test suite with “npm test”.

