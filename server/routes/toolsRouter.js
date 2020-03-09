const toolController = require('../controllers/ToolsController.js'),
    express = require('express'), 
    toolsRouter = express.Router(),
    multer = require('multer'),
    fs = require('fs');

/* 
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
 
  Note: the listings variable above and the file it is connected to help you trace
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+'-'+file.originalname);
    }
});
const upload = multer({storage});

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


module.exports = toolsRouter;