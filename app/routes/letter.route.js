const express = require('express');
const { letterController } = require('../controllers');

const router = express.Router();

/* Get all letters */
router.get('/', letterController.getLetterList);
/* Get data for all educations letters */
router.get('/data', letterController.getData);
/* Post a letter */
router.post('/', letterController.addLetter);
/* Post a letter */
router.get('/:id', letterController.getLetter);
/* Update a letter */
router.put('/:id', letterController.updateLetter);

module.exports = router;
