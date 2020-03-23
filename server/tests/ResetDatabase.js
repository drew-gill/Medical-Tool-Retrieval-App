'use strict';
/*
  Import modules/files you may need to correctly run the script.
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
const fs = require('fs');
const mongoose = require('mongoose');
const Tool = require('../models/ToolModel.js');
const config = require('../config/config.js');
const testFolder = './tests/UploadImages/';


function getAllFiles(){
    fs.readdir(testFolder, (err, files) => {
        if(err) throw err;

        if(files){
            files.forEach(imgPath => {
                let splitPath = imgPath.split('.');


                let tool = new Tool({
                    "image":fs.readFileSync(testFolder + imgPath),
                    "keywords": splitPath,
                    "retrievalHistory": {
                        "retrievalTime": Math.ceil(Math.random() * 200),
                        "retrievalDate": new Date(Date.now()),
                     }
                });
                
                tool.retrievalHistory.push({
                     retrievalTime: Math.ceil(Math.random() * 200),
                     retrievalDate: new Date(Date.now()),
                  })

                tool.save(function(err){
                    if(err) return err;
                });
            });
        } else{
            console.log("No files found in testFolder directory.")
        }
    });
}

/* Connect to your database */
const clearAndRefill = async () => {
    await mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});

    //Clears the connected database collection of tools
    Tool.deleteMany({}, (err) => {
        if (err) throw err;
        

    }).then(getAllFiles);

    
};

module.exports = clearAndRefill;
