const express = require('express');
const { contactController } = require('../controllers');

const router = express.Router();

router.post('/', contactController.addContact);
router.get('/', contactController.getContactList);
router.get('/get', contactController.getContact);


module.exports = router;
