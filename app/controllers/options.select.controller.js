const { optionsSelectService } = require('../services');

const getEduOptions = async (req, res) => {
  try {
    const result = await optionsSelectService.getEduOptions();
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
  try {
    const result = await optionsSelectService.getTownOptions();
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
  try {
    const result = await optionsSelectService.getTagsOptions();
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
  try {
    const result = await optionsSelectService.getBranchEduOptions();
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
  try {
    const result = await optionsSelectService.getBranchCorpOptions();
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
