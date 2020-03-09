'use strict';
/*
  Import modules/files you may need to correctly run the script.
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
const fs = require('fs');
const mongoose = require('mongoose');
const Tool = require('./models/ToolModel.js');
const config = require('./config/config.js');
const testFolder = './tests/TestImages/';


function getAllFiles(){
    fs.readdir(testFolder, (err, files) => {
        files.forEach(imgPath => {
            let splitPath = imgPath.split('.');
            console.log(testFolder + imgPath);
            let tool = new Tool({
                "image":fs.readFileSync(testFolder + imgPath),
                "keywords": [splitPath[0], splitPath[1]]
            });

            console.log((tool.image).toString('base64'));
            tool.save();
        });
    });
}

/* Connect to your database */
const clearAndRefill = async () => {
    await mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});

    let promise = new Promise((resolve, reject) =>{

    })

    //Clears the connected database collection of tools
    Tool.deleteMany({}, (err) => {
        if (err) throw err;
        console.log('test1');
        getAllFiles();

    });

    
};

module.exports = clearAndRefill;
