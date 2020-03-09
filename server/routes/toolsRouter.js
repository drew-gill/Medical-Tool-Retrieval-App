const tools = require('../controllers/ToolsController.js'),
    express = require('express'), 
    toolsRouter = express.Router(),
    multer = require('multer'),
    fs = require('fs');


const storage = multer.memoryStorage();
const upload = multer({storage:storage});

toolsRouter.post('/',upload.single('image'), tools.create);
toolsRouter.get('/', tools.read);
toolsRouter.delete('/',tools.remove);
toolsRouter.put('/', upload.single('image'),tools.update);
toolsRouter.get('/:id',tools.read);


module.exports = toolsRouter;