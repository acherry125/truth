# Truth - A Destiny Companion Web App

The Truth app is split into two parts: 

1. The API
2. The client application

## 1. The API

Found in api/server.js

At this point, a thing wrapper on the Bungie API.

### Endpoints:
/api/d1/user/{:platformId}/{:username}/
- Returns a user's summary information if this user exists. Returns 404 elsewise.

## 2. The Client Application

Found in truth/

A react application to display the data that the API collects and organizes from the Bungie API.

Consists of two views:

- Search View

- User Detail View
