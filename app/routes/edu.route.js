const express = require('express');
const { eduController } = require('../controllers');

const router = express.Router();

router.post('/add', eduController.addEdu);
router.get('/getAll', eduController.getEdus);
router.get('/get', eduController.getOneEdu);
router.put('/:id', eduController.updateEdu);

module.exports = router;
