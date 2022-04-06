const express = require('express');
const { corpController } = require('../controllers');

const router = express.Router();

router.post('/add', corpController.addCorp);
router.get('/getAll', corpController.getCorps);


module.exports = router;
