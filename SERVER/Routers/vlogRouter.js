const router = require('express').Router();
const{createVlog, getAllVlogs, toggleLike} = require('../Controllers/VlogController.js');
const { authenticate } = require('../Middleware/AuthMiddleware.js'); 


router.post('/', authenticate, createVlog);
router.get('/', getAllVlogs);
router.put('/like/:vlogId', authenticate, toggleLike);

module.exports= router
