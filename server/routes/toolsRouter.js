const toolController = require('../controllers/ToolsController.js'),
    express = require('express'), 
    toolsRouter = express.Router(),
    multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({storage:storage});
const record = require('../audioRecord.js');
//creates a new object in the DB with the upload buffer object (the image with the filepath specified in a file parameter of the request) and the keywords in the request
toolsRouter.post('/api/',upload.single('image'), toolController.create);

//gets a string output of all of the objects in the database (images represented by binary buffers)
toolsRouter.get('/api/', toolController.read);

//removes the object specified by the ID in the parameters of the request from the DB
toolsRouter.delete('/api/',toolController.remove);

//updates the object represented by the ID parameter with the file in a new given filepath and new keywords
toolsRouter.put('/api/', upload.single('image'),toolController.update);

//possibly redundant... remove?
toolsRouter.put('/api/:id', upload.single('image'),toolController.update);

//possibly redundant... remove?
toolsRouter.delete('/api/:id',toolController.remove);

//queries for the specific object given by the ID
toolsRouter.get('/api/:id',toolController.read);

toolsRouter.post('/record/',record.recordAudio);
module.exports = toolsRouter;