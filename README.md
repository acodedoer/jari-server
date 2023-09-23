# jari - A Sayings Database (API)

This is the express API repository of jari, a sayings and proverbs database. [Jari's frontend can be found in this repo](https://github.com/acodedoer/jari-backend), while the [mobile app can be found in this repo](https://github.com/acodedoer/jari-mobile-app). This API is meant to be used by the frontend which serves as an administrative interface for managing the collection of sayings and proverbs that are presented to users through the mobile app, and to be consumed by the mobile app to get and display proverbs from the database.

## Routes
* Account Creation
* User Authentication
* Add Proverbs
* Get Proverbs
* Update Proverbs
* Delete Proverbs
* Create Tags
* Sort Proverbs
* Get Provers by Tag


## Routes to Add
* Tag management routes.
* Admin and user management routes

## Tech Stack
* NodeJS
* Express
* MongoDB
* Mongoose

## Getting Started
1. Clone this repo to your local machine.\
`git clone https://github.com/acodedoer/jari-server.git`

2. Navigate to the project directory.\
`cd jari-server`

3. Install the dependencies.\
`npm install`

4. Create a .env file with `JWT_SIGN_KEY` and `MONGO_CONNECTION_STRING` variables for your JWT key and mongo connection string respectively.

5. Start the project.\
`npm run start`

6. Make sure you also clone and start the [jari-backend](https://github.com/acodedoer/jari-backend)


