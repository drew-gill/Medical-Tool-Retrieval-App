/* Import mongoose and define any variables needed to create the schema */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RetrievalSchema = require('./RetrievalSchema.js');


const toolSchema = new Schema({
   image: {type: Buffer, required: true},
   keywords: {type: [String], required: true, default:undefined},
   retrievalHistory: [RetrievalSchema]
});


let Tool = mongoose.model('tools', toolSchema);

/* Use your schema to instantiate a Mongoose model
Export the model to make it avaiable to other parts of your Node application */
//Check out - https://mongoosejs.com/docs/guide.html#models
module.exports = Tool;
