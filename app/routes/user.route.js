const express = require('express');
const { userController } = require('../controllers');

const router = express.Router();


router.put('/:id', userController.update);

module.exports = router;