# README.md

## Config File
For this MERN stack application, there will be two config files that will contain all the private information for the frontend and backend of the application.

On the backend side of the application, the path to the config file is `/server/config/` from the root directory. In this config folder there will be the following javascript files:
* express.js
* config.js

express.js will not require any changes to get the application started.

config.js will contain the MongoDB database uri that is hosting the backend of the application.

On the frontend side fo the application, the path to the config file is `/client/src/config/` from the root directory. In this config folder there will be the following javascript file:
* config.js

config.js will contain the devURL and prodURL that will redirect the url for API requests if the project environment is being run in production mode or development mode.
## List of APIs with Keys
The three APIs and their respective information are listed below:
1. REST API (CRUD) with MongoDB Atlas
   * Requires MongoDB uri in order to function properly
2. User Authentication with BCrpyt and MongoDB Atlas
   * Requires MongoDB uri in order to function properly
3. Chart.js
   * No key required, follow the install process noted below

## Environmental Variables
The following environmental variables should be considered:
* process.env.Node_ENV
  * This could be in three possible states, development, staging and production.
    * Development is for testing locally on your machine
    * Production is for deploying on heroku
    * Staging is unused and should not be used
* process.env.DB_URI
  * This contains the uri for the database

## Log-in credentials
In order to login with admin privledges, the following credentials must be entered into the username and password section on the login page.
* Username: admin
* Password: password

**This account is the master account which can manage all other created accounts**

## File/Line replacement instructions for API keys ##
On the backend of the application, from the root directory go to `/server/config/config.js`. 
* On line 4, replace the uri in single quotation marks (' ') with your own MongoDB Atlas uri

For Chart.js, make sure you run `npm install` followed by `npm run-script install-all` in the root directory after cloning the project

On the frontend of the application, if any adjustments need to be made to the production and development urls that are being used for the API requests, from the root directory go to `/client/src/config/config.js`
* On line 4, replace the url in single quotation marks (' ') with your preffered localhost port in development status
* On line 8, replace the url in single quotation marks (' ') with your preffered hosting service address in deployment status

## Project handoff guidelines ##
For this project and the scale, it would be best to work with Heroku. However, some alternatives will be listed down below:
* Back4App - https://www.back4app.com/ 
* Firebase - https://firebase.google.com/
* Google App Engine (GAE) - https://cloud.google.com/appengine
* Kubernetes - https://kubernetes.io/
* Amazon Elastic Compute Cloud (EC2) - https://aws.amazon.com/ec2/