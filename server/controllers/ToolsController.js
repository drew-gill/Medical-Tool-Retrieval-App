const Tool = require('../models/ToolModel.js');
const Retrieval = require('../models/RetrievalModel.js');
const fs = require("fs");
exports.create = async (req, res) => {
    
    if(!req.file) {
        return res.status(200).send({
            error: "You can't create an empty Listing!"
        });
    }
    
    var img = fs.readFileSync(req.file.path);
    tool = new Tool({"image":img,"keywords":req.body.keywords})
    tool.save()
    .then(data=>{
        res.send(data);
    })
};
exports.read = (req, res) => {
    
    if(typeof req.query.id != "undefined"){
        Tool.findById(req.query.id).lean()
        .then(tool=>{
            res.send(JSON.stringify(tool));
        })}
    else{
        Tool.find(req.params.id).lean()
    .then(tool =>{
        res.send(JSON.stringify(tool));
    })}
    
    
  
};
exports.update = (req,res)=>{
    console.log(req);
    
    
    Tool.findById({"_id":req.query.id}).then(tool=>{
        if(typeof(req.file.path) != "undefined"){
        var img = fs.readFileSync(req.file.path);
        tool.image = img;
        }
        if(typeof(req.body.keywords) != "undefined"){
        tool.keywords = req.body.keywords;
        }
        tool.save().then(data => {
            res.send(data);
        })
    })};
    


exports.remove = (req,res)=>{
    
    Tool.findByIdAndRemove(req.query.id).exec(err=>{
        
        if(err){
            return res.status(404).send({message:"Couldn't find tool!"});
        }
    })
    return res.status(200).send({message:"successfull"});

}
