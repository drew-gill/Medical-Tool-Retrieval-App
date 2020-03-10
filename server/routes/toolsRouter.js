const tools = require('../controllers/ToolsController.js'),
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

toolsRouter.post('/',upload.single('image'), tools.create);
toolsRouter.get('/', tools.read);
toolsRouter.delete('/',tools.remove);
toolsRouter.put('/', upload.single('image'),tools.update);
toolsRouter.put('/:id', upload.single('image'),tools.update);
toolsRouter.delete('/:id',tools.remove);
toolsRouter.get('/:id',tools.read);


module.exports = toolsRouter;