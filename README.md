# README.md

## Config File
For this MERN stack application, there will be two config files that will contain all the private information for the frontend and backend of the application.

On the backend side of the application, the path to the config file is CEN3031_FinalProject/server/config. In this config folder there will be the following javascript files:
* express.js
* config.js

express.js will not require any changes to get the application started.

config.js will contain the MongoDB database uri that is hosting the backend of the application.

On the frontend side fo the application, the path to the config file is CEN3031_FinalProject/client/config. In this config foler there will be the following javascript file:
* config.js

config.js will contain the devURL and prodURL that will redirect the url for API requests if the project environment is being run in production mode or developement mode.
## List of APIs with Keys
The three APIs and their respective information are listed below:
1. CRUD
   * Requires MongoDB uri in order to function properly
2. Login Authentication
   * Requires MongoDB uri in order to function properly
3. Chart.js
   * No key requried, just make sure to use `npm install` from the root folder
4. Speech-to-Text
   * Key information along with other important fields can be found within the service_key.json file

## Environmental Variables
The following environmental variables should be considered:
* process.env.Node_ENV
  * This could be in three possible states, developement, staging and production.
  * Developement is for testing locally on your machine
  * Production is for deploying on heroku
  * Staging is unused and should not be used
* process.env.DB_URI
  * This contains the uri for the database
* process.env.GCLOUD_PROJECT
  * This sets the project as cen3031-final-project
* process.env.GOOGLE_APPLICATION_CREDENTIALS
    * This provides the path to the google api keys
## Log-in credentials
In order to login with admin privledges, the following credentials must be entered into the username and password section on the login page.
* Username: admin
* Password: password

**This account is the master account which can manage all other created accounts**

## Project handoff guidelines + file/line replacement instructions for API keys