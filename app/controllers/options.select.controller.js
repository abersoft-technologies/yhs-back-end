const { optionsSelectService } = require('../services');

const getEduOptions = async (req, res) => {
  const orgId = req.headers['org-id'];
  try {
    const result = await optionsSelectService.getEduOptions(orgId);
    return res.status(200).json({
      status: 200,
      data: result,
      message: 'Successfully got all names of educations',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
const getTownOptions = async (req, res) => {
  const orgId = req.headers['org-id'];

  try {
    const result = await optionsSelectService.getTownOptions(orgId);
    return res.status(200).json({
      status: 200,
      data: result,
      message: 'Successfully got all towns of contacts',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
const getTagsOptions = async (req, res) => {
  const orgId = req.headers['org-id'];

  try {
    const result = await optionsSelectService.getTagsOptions(orgId);
    return res.status(200).json({
      status: 200,
      data: result,
      message: 'Successfully got all tags',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

const getBranchEduOptions = async (req, res) => {
  const orgId = req.headers['org-id'];

  try {
    const result = await optionsSelectService.getBranchEduOptions(orgId);
    return res.status(200).json({
      status: 200,
      data: result,
      message: 'Successfully got all branches',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

const getBranchCorpOptions = async (req, res) => {
  const orgId = req.headers['org-id'];

  try {
    const result = await optionsSelectService.getBranchCorpOptions(orgId);
    return res.status(200).json({
      status: 200,
      data: result,
      message: 'Successfully got all branches',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports = {
  getEduOptions,
  getTownOptions,
  getTagsOptions,
  getBranchEduOptions,
  getBranchCorpOptions
};
