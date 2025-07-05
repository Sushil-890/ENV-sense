const router = require('express').Router();
const{
  createVlog,
  getAllVlogs,
  toggleLike
} = require('../controllers/vlogcontrol.js');
const { authenticate } = require('../Middleware/AuthMiddleware.js'); 


router.post('/', authenticate, createVlog);
router.get('/', getAllVlogs);
router.put('/like/:vlogId', authenticate, toggleLike);

module.exports= router
