const express = require('express');
const userController = require('../controllers/user_controller');
const router = express.Router();

router.post('/',userController.register);
router.post('/login',userController.login);
router.post('/refresh',userController.refreshtoken);
module.exports = router; 