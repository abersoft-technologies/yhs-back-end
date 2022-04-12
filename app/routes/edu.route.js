const express = require('express');
const { eduController } = require('../controllers');

const router = express.Router();

router.post('/add', eduController.addEdu);
router.get('/getAll', eduController.getEdus);

module.exports = router;