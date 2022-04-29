const { organizationService } = require('../services');


const addOrg = async (req, res) => {
    const data = req.body;

    try {
      const result = await organizationService.addOrg(data);
      return res.status(200).json({
        status: 200,
        data: result,
        message: 'Succesfully added organization',
      });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
};

module.exports = {
    addOrg
};