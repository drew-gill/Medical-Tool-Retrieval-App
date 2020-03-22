/* Import mongoose and define any variables needed to create the schema */
const mongoose = require('mongoose');

/* Create your schema for the data in the listings.json file that will define how data is saved in your database
     See https://mongoosejs.com/docs/guide.html for examples for creating schemas
     See also https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
  */
 const retrievalSchema = new mongoose.Schema({
   retrievalTime: {type: mongoose.Number, required: true},
   retrievalDate: {type: Date, required: true, default: Date.now},
   user: {type: String}
   });
  

  module.exports = retrievalSchema;
  