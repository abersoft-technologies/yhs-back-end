const express = require('express');
const { optionsSelectController } = require('../controllers');

const router = express.Router();

router.get('/educations', optionsSelectController.getEduOptions);
router.get('/towns', optionsSelectController.getTownOptions);
router.get('/tags', optionsSelectController.getTagsOptions);
router.get('/branchEdu', optionsSelectController.getBranchEduOptions);
router.get('/branchCorp', optionsSelectController.getBranchCorpOptions);



module.exports = router;
