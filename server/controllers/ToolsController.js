const Tool = require('../models/ToolModel.js');
const fs = require('fs');
exports.create = async (req, res) => {
  if (!req.file) {
    return res.status(200).send({
      error: "You can't create an empty Listing!"
    });
  }

  var img = req.file.buffer;
  tool = new Tool({ image: img, keywords: JSON.parse(req.body.keywords) });
  tool.save().then(data => {
    res.send(data);
  });
};
exports.read = (req, res) => {
  if (typeof req.query.id != 'undefined') {
    Tool.findById(req.query.id)
      .lean()
      .then(tool => {
        res.send(JSON.stringify(tool));
      });
  } else {
    Tool.find(req.params.id)
      .lean()
      .then(tool => {
        res.send(JSON.stringify(tool));
      });
  }
};
exports.update = (req, res) => {
  Tool.findById({ _id: req.query.id }).then(tool => {
    if (typeof req.file != 'undefined') {
      let img = req.file.buffer;
      tool.image = img;
    }
    if (typeof req.body.keywords != 'undefined') {
      tool.keywords = JSON.parse(req.body.keywords);
    }
    tool.save().then(data => {
      res.send(data);
    });
  });
};

exports.remove = (req, res) => {
  Tool.findByIdAndRemove(req.query.id).exec(err => {
    if (err) {
      return res.status(404).send({ message: "Couldn't find tool!" });
    }
  });
  return res.status(200).send({ message: 'successful' });
};


exports.newRetrieval = (req, res) => {
  //console.log(req);
  Tool.findById({_id: req.params.id}).then(tool => {

    //push the new retrieval with time and date data.
    if(typeof req.body.retrievalTime != 'undefined' && typeof req.body.retrievalDate != 'undefined'){
      let retrievalHistory = {
        retrievalTime: req.body.retrievalTime,
        retrievalDate: req.body.retrievalDate
      };
      tool.retrievalHistory.push(retrievalHistory);
    }

     //simply push the new retrieval with the time data. The date will automatically be filled with the current date.
    else if(typeof req.body.retrievalTime != 'undefined' && typeof req.body.retrievalDate == 'undefined'){
      let retrievalHistory = {
        retrievalTime: req.body.retrievalTime
      };

      tool.retrievalHistory.push(retrievalHistory);
    }

    tool.save().then(data => {
      res.send(data);
    });

  })
};

//update a retrieval by the parent id, retrieval id, and with the updated date/time.
exports.updateRetrieval = (req, res) => {
  Tool.findById({_id: req.params.id}).then(tool =>{

    if(typeof req.body.retrievalId != 'undefined'){
      let retrieval = tool.retrievalHistory.id(req.body.retrievalId);

      if(typeof req.body.retrievalTime != 'undefined'){
        retrieval.retrievalTime = req.body.retrievalTime;
      }

      if(typeof req.body.retrievalDate != 'undefined'){

        retrieval.retrievalDate = req.body.retrievalDate;
      }
    }
    tool.save().then(data => {
      res.send(data);
    });

  });
};

//remove a retrieval specified by its parent doc id AND its subdoc id
exports.removeRetrieval = (req, res) => {
  Tool.findById({_id: req.params.id}).then(tool => {

    if(typeof req.body.retrievalId != 'undefined'){
      tool.retrievalHistory.pull({_id: req.body.retrievalId}); //deletes the retrieval identified by the retrievalId
    }

    tool.save().then(data => {
      res.send(data);
    });

  });
};