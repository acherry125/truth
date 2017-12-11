# Truth - A Destiny Companion Web App

The Truth app is split into two parts: 

1. The API
2. The client application

## 1. The API

Found in api/server.js

At this point, a thin wrapper on the Bungie API.

### Endpoints:
/api/d1/user/{:platformId}/{:username}/
- Returns a user's summary information if this user exists. Returns 404 elsewise.

## 2. The Client Application

Found in truth/

A react application to display the data that the API collects and organizes from the Bungie API.

Consists of two views:

- Search View

- User Detail View

# Running the App
To get the application running locally, you must install the dependencies for both servers, then start them each.

These projects require Node 6+ installed.

Assuming Node and NPM are in the path, you can do the following:

1. cd into the /api folder, and use the command: `npm install`.
2. if the dependencies are succesfully loaded: `npm start`. This will start the backend server at port 8081.
3. cd back up the root folder, then down into the /truth folder, and type `npm install` once more.
4. if the dependencies are succesfully loaded: `npm start`. This will start the React Dev server with the client code at port 8080.
5. Visit 'http://localhost' to see the application. 

Note: ports 8080 (standard localhost port), and 8081 must be free.