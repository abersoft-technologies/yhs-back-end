const express = require('express');
const { eduController } = require('../controllers');

const router = express.Router();

router.post('/add', eduController.addEdu);
// router.get('/', contactController.getContactList);

module.exports = router;