/* Import mongoose and define any variables needed to create the schema */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RetrievalSchema = require('./RetrievalSchema.js');

const ToolSchema = new Schema({
  image: { type: Buffer, required: true },
  keywords: { type: [String], required: true, default: undefined },
  retrievalHistory: [RetrievalSchema],
  avgRetrievalTime: { type: Number, default: 0, required: true },
});

ToolSchema.pre('save', function (next) {
  let tool = this;
  // Skip updating average retrieval time if retrieval history hasn't changed
  if (!tool.isModified('retrievalHistory')) {
    next();
  }
  // Calculate the average retrieval time for the most recent 30 entries
  let total = 0.0;
  const numberOfEntries = Math.min(tool.retrievalHistory.length, 30);
  for (let i = 0; i < numberOfEntries; i++) {
    total += tool.retrievalHistory[i].retrievalTime;
  }
  // Save the average retrieval time
  tool.avgRetrievalTime = total / tool.retrievalHistory.length;
  next();
});
let Tool = mongoose.model('tools', ToolSchema);

/* Use your schema to instantiate a Mongoose model
Export the model to make it avaiable to other parts of your Node application */
//Check out - https://mongoosejs.com/docs/guide.html#models
module.exports = Tool;
