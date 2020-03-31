const toolController = require('../controllers/ToolsController.js'),
    userController = require('../controllers/UsersController.js'),
    express = require('express'), 
    router = express.Router(),
    multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({storage:storage});

//creates a new object in the DB with the upload buffer object (the image with the filepath specified in a file parameter of the request) and the keywords in the request
router.post('/api/',upload.single('image'), toolController.create);

//gets a string output of all of the objects in the database (images represented by binary buffers)
router.get('/api/', toolController.read);

//removes the object specified by the ID in the parameters of the request from the DB
router.delete('/api/',toolController.remove);

//updates the object represented by the ID parameter with the file in a new given filepath and new keywords
router.put('/api/', upload.single('image'),toolController.update);

//possibly redundant... remove?
router.put('/api/:id', upload.single('image'),toolController.update);

//possibly redundant... remove?
router.delete('/api/:id',toolController.remove);

//queries for the specific object given by the ID
router.get('/api/:id',toolController.read);

//append a new retrieval to the tool's retrieval array.
router.post('/api/:id/retrievals', toolController.newRetrieval);

//update a retrieval in the tool specified by the ID
router.put('/api/:id/retrievals', toolController.updateRetrieval);

//remove a retrieval in the tool specified by the ID
router.delete('/api/:id/retrievals', toolController.removeRetrieval);

//note: the flip of the /api/ route was done to avoid conflicts with the tool api above
//creates a new user based on a username/password
router.post('/register/api', userController.create);

//authenticate a user using a username + password
router.post('/user/api', userController.authenticate);

//update the user's password
router.put('/user/api', userController.updatePassword);

//remove the user from the database
router.delete('/user/api', userController.remove);

module.exports = router;