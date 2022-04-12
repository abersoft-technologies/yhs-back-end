const { eduService } = require('../services');

const addEdu = async (req, res) => {
    const data = req.body;

    try {
        const result = await eduService.addEdu(data);
        return res.status(200).json({
            status: 200,
            data: result,
            message: "Successfully added education to database"
        })
    }catch(error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
}

const getEdus = async (req, res) => {
    const { limit, page, queryParams } = req.query;
    try {
        const result = await eduService.getEdus(
            limit,
            page,
            queryParams
        );
        return res.status(200).json({
            status: 200,
            data: result,
            message: "Successfully got all educations"
        })
    } catch(error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
}

module.exports = {
    addEdu,
    getEdus
};