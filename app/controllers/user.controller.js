const { userService } = require('../services');


const update = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    try {
      const result = await userService.update(id, body);
      return res.status(200).json({
        status: 200,
        data: result,
        message: 'Successfully updated user',
      });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
};

module.exports = {
    update,
};