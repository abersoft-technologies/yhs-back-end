const express = require('express');
const { orgController } = require('../controllers');

const router = express.Router();

router.post('/add', orgController.addOrg);

module.exports = router;
