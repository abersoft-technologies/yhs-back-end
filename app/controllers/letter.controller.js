const { letterService } = require('../services');

const addLetter = async (req, res) => {
  const data = req.body;
  try {
    const result = await letterService.addLetter(data);
    return res.status(200).json({
      status: 200,
      data: result,
      message: 'Succesfully added letter',
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
const getLetterList = async (req, res) => {
  const { limit, page } = req.query;
  const orgId = req.headers['org-id'];
  try {
    const result = await letterService.getLetterList(limit, page, orgId);
    return res.status(200).json({
      status: 200,
      data: result,
      message: 'Succesfully fetched all letters',
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const getLetter = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await letterService.getLetter(id);
    return res.status(200).json({
      status: 200,
      data: result,
      message: 'Successfully got letter',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

const updateLetter = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const result = await letterService.updateLetter(id, body);
    return res.status(200).json({
      status: 200,
      data: result,
      message: 'Successfully updated letter',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

const getData = async (req, res) => {
  const orgId = req.headers['org-id'];

  try {
    const result = await letterService.getData(orgId);
    return res.status(200).json({
      status: 200,
      data: result,
      message: 'Successfully got educations letters data',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports = {
  getLetterList,
  getLetter,
  addLetter,
  updateLetter,
  getData,
};
