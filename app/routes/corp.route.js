const express = require('express');
const { corpController } = require('../controllers');

const router = express.Router();

router.post('/add', corpController.addCorp);

module.exports = router;
