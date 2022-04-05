const { corpService } = require('../services');


const addCorp = async (req, res) => {
    const data = req.body;

    try {
        const result = await corpService.addCorp(data);
        return res.status(200).json({
            status: 200,
            data: result,
            message: "Successfully added corp to database"
        })
    }catch(error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
}

module.exports = {
    addCorp,
  };