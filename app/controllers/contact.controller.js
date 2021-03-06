const { contactService } = require('../services');

const addContact = async (req, res) => {
  const data = req.body;
  console.log(data);

  try {
    const result = await contactService.addContact(data);
    return res.status(200).json({
      status: 200,
      data: result,
      message: 'Succesfully added contact',
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
const getContactList = async (req, res) => {
  const { limit, page, queryParams } = req.query;
  try {
    const result = await contactService.getContactList(
      limit,
      page,
      queryParams
    );
    return res.status(200).json({
      status: 200,
      data: result,
      message: 'Succesfully fetched all contacts',
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

module.exports = {
  addContact,
  getContactList,
};
