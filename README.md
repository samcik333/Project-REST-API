# RESTAPI for intership

First of all this REST API app is about to allow users to create and maintain custom collections of Hacker News stories.
## Start app  
First we open two terminals.  
### First terminal
Write a command `docker-compose up` which connects us to the Postgres database.
### Second terminal
Write a command `npm run start` which connects us to the http://localhost:3000 server.
## Application functionality 
All Requests are tested on Postman 
### `POST /register`
This request creates a new user depending on the request email and password and stores him into a database and as a result, returns the API, which contains the endpoint of the id, email, and JWT token of the user.
### `POST /login`
This request finds an existing user and checks if the email and password are correct, and give us the same API endpoint as in the registration.
### `GET /users`
This request finds all users who are in the database.
### `GET /users/:userid`
This request finds an existing user in the database and gets us an endpoint with his information.
### `PUT /users/:userid`
This request updates the user if a user is authorized, and the request body is with all parameters which are email and password.
### `PATCH /users/:userid`
This request updates the user as same as PUT but we can update just one property email or password.
### `DELETE /users/:userid`
This request deletes the user if a user is authorized and after that, it deletes all collections that deleted user had.

### `POST /users/:userid/collections`
This request creates a new collection depending on the request name for an authorized user.
### `GET /users/:userid/collections`
This request finds all collections which are in the database.
### `GET /users/:userId/collections/:collid`
This request finds an existing collection in the database and gets us an endpoint with his information.
### `PUT /users/:userId/collections/:collid`
This request updates the collection if a user is authorized, and the request body is with all parameters, the name.

### `Patch /users/:userId/collections/:collid`
This request updates the collection as same as PUT.
### `DELETE /users/:userId/collections/:collid`
This request deletes the collection if a user is authorized and after that, it deletes all stories that deleted collection had.

### `POST /users/:userId/collections/:collid/stories/:storyid`
This request fetches the story into the collection and database and fetch also comments on this story.
### `GET /users/:userId/collections/:collid/stories`
This request finds all stories which are in the database.
### `GET /users/:userId/collections/:collid/stories/:storyid`
This request finds an existing story in the database and gets us an endpoint with its information.

### `GET /users/:userId/stories/:storyid/comments`
This request returns endpoint of comments on stories.
### `GET /users/:userId/stories/:storyid/comments/:commentid`
This request finds an existing comment in the database and gets us an endpoint with its information.
# Tests
We can find tests in folder ./spec and we started test by command `npm test`.