const { corpService } = require('../services');

const addCorp = async (req, res) => {
  const data = req.body;

  try {
    const result = await corpService.addCorp(data);
    return res.status(200).json({
      status: 200,
      data: result,
      message: 'Successfully added corp to database',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

const getCorps = async (req, res) => {
  const { limit, page, queryParams } = req.query;
  try {
    const result = await corpService.getCorps(limit, page, queryParams);
    return res.status(200).json({
      status: 200,
      data: result,
      message: 'Successfully got all corps',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

const getCorp = async (req, res) => {
  const { id } = req.query;
  try {
    const result = await corpService.getOneCorp(id);
    return res.status(200).json({
      status: 200,
      data: result,
      message: 'Successfully got corporate',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

const getContactsInCorp = async (req, res) => {
  const { corporate } = req.query;
  try {
    const result = await corpService.getContactsInCorp(corporate);
    return res.status(200).json({
      status: 200,
      data: result,
      message: 'Successfully got contacts',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

const updateCorp = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const result = await corpService.updateCorp(id, body);
    return res.status(200).json({
      status: 200,
      data: result,
      message: 'Successfully updated corporation',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports = {
  addCorp,
  getCorps,
  getCorp,
  getContactsInCorp,
  updateCorp,
};
