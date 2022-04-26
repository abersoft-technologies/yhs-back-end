const { eduService } = require('../services');

const addEdu = async (req, res) => {
  const data = req.body;

  try {
    const result = await eduService.addEdu(data);
    return res.status(200).json({
      status: 200,
      data: result,
      message: 'Successfully added education to database',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

const getEdus = async (req, res) => {
  const { limit, page, queryParams, filterBranchEdu = '', filterType = '' } = req.query;

  let filter = {};
  filterBranchEdu ? (filter.branch = filterBranchEdu) : null;
  filterType ? (filter.type = filterType) : null;
  try {
    const result = await eduService.getEdus(limit, page, queryParams, filter);
    return res.status(200).json({
      status: 200,
      data: result,
      message: 'Successfully got all educations',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

const getOneEdu = async (req, res) => {
  const { id } = req.query;
  try {
    const result = await eduService.getOneEdu(id);
    return res.status(200).json({
      status: 200,
      data: result,
      message: 'Successfully got education',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

const updateEdu = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const result = await eduService.updateEdu(id, body);
    return res.status(200).json({
      status: 200,
      data: result,
      message: 'Successfully updated education',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports = {
  addEdu,
  getEdus,
  getOneEdu,
  updateEdu,
};
