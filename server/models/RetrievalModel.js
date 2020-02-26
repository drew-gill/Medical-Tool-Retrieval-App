/* Import mongoose and define any variables needed to create the schema */
const mongoose = require('mongoose');

/* Create your schema for the data in the listings.json file that will define how data is saved in your database
     See https://mongoosejs.com/docs/guide.html for examples for creating schemas
     See also https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
  */
 const retrievalSchema = new mongoose.Schema({
    toolID: {type: String, required: true},
    timeForRetrieval: {type: mongoose.Number, required: true},
    user: {type: String}
    //Check out - https://mongoosejs.com/docs/guide.html
  });
  
  /* Use your schema to instantiate a Mongoose model
  Export the model to make it avaiable to other parts of your Node application */
  //Check out - https://mongoosejs.com/docs/guide.html#models
  exports.retrievals = mongoose.model('retrievals', retrievalSchema);
  