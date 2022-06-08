## About 
The Medical Tool Retrieval Web Application is being developed based on the visions of Dr. Robert A. Marino and under the guidance of Dr. Sanethia Thomas and associates.

The Medical Tool Retrieval Web Application shall allow for quick retrieval of medical tools through keyword search and image identification. Additionally, the system shall allow for analysis of retrieval times for identification of tools taking unusually long to retrieve.

## More Info
[View the video demo here!](https://youtu.be/4bi0xA5cju0)

More documentation can be found in about.pdf

## Technical Details

### Config File
For this MERN stack application, there will be two config files that will contain all the private information for the frontend and backend of the application.

On the backend side of the application, the path to the config file is `/server/config/` from the root directory. In this config folder there will be the following javascript files:
* express.js
* config.js

express.js will not require any changes to get the application started.

config.js will contain the MongoDB database uri that is hosting the backend of the application.

On the frontend side fo the application, the path to the config file is `/client/src/config/` from the root directory. In this config folder there will be the following javascript file:
* config.js

config.js will contain the devURL and prodURL that will redirect the url for API requests if the project environment is being run in production mode or development mode.
### List of APIs with Keys
The three APIs and their respective information are listed below:
1. REST API (CRUD) with MongoDB Atlas
   * Requires MongoDB uri in order to function properly
2. User Authentication with BCrpyt and MongoDB Atlas
   * Requires MongoDB uri in order to function properly
3. Chart.js
   * No key required, follow the install process noted below

### Environmental Variables
The following environmental variables should be considered:
* process.env.Node_ENV
  * This could be in three possible states, development, staging and production
    * Development is for testing locally on your machine
    * Production is for deploying on Heroku
    * Staging is unused and should not be used
* process.env.DB_URI
  * This contains the uri for the database

### Login Credentials
In order to login with admin privileges, the following credentials must be entered into the username and password section on the login page.
* Username: admin
* Password: password

**This account is the master account which can manage all other created accounts**

### File/Line Replacement Instructions for API Keys ##
On the backend of the application, from the root directory go to `/server/config/config.js`. 
* On line 4, replace the uri in single quotation marks (' ') with your own MongoDB Atlas uri

For Chart.js, make sure you run `npm install` followed by `npm run-script install-all` in the root directory after cloning the project

On the frontend of the application, if any adjustments need to be made to the production and development urls that are being used for the API requests, from the root directory go to `/client/src/config/config.js`
* On line 4, replace the url in single quotation marks (' ') with your preffered localhost port in development status
* On line 8, replace the url in single quotation marks (' ') with your preffered hosting service address in deployment status

### Project Handoff Guidelines ##
For this project and the scale, it would be best to work with Heroku. However, some alternatives will be listed down below:

Back4App - https://www.back4app.com/
* No vendor lock-in
* Flexible pricing plans
* Automated backup system that keeps your data secure and accessible

General steps to get setup:
1. Create an account on back4app and create an application
2. Use back4app's web hosting service in "My Apps' option of your app
3. Create your domain and upload/make adjustments to incorporate back4app into your project
4. Successfully hosted, for more in-depth information consult: https://www.back4app.com/docs/platform/node-js-web-server

Firebase - https://firebase.google.com/
* Cross-platform API, cross-device support
* Fast and real-time updates
* Free tier up to 100 simultaneous connections

General steps to get setup:
1. Create an account on Firebase and create an App
2. Install the Firebase CLI
3. Setup a project directory
4. Deploy your site
5. Link to a Firebase Web App (optional)
6. Successfully hosted, for more in-depth information consult: https://firebase.google.com/docs/hosting/?authuser=0#implementation_path

For a larger scale of deployment (some considerations, although unnecessary for the scale of this project):
* Google App Engine (GAE) - https://cloud.google.com/appengine
  * Flexible pricing plans
  * Much easier to run asynchronous tasks
  * Easy to create, maintain and scale if needed
* Kubernetes - https://kubernetes.io/
  * Easy to deploy and manage applications
  * No vendor lock-in
  * Good for advanced developers to use the provided resources
* Amazon Elastic Compute Cloud (EC2) - https://aws.amazon.com/ec2/
  * Instant provisioning of new servers
  * Multiple geographic areas to run servers with a standard interface
  * Entire AWS ecosystem of services and support and community
