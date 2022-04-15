const { Contact } = require('../models');
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
  const {
    limit,
    page,
    queryParams,
    filterStatus = '',
    filterEdu = '',
    filterTown = '',
  } = req.query;
  let filter = {};
  filterStatus ? (filter.status = filterStatus) : null;
  filterTown ? (filter.town = filterTown) : null;
  filterEdu ? (filter = { ...filter, 'letterOfIntent.edu': filterEdu }) : null;

  try {
    const result = await contactService.getContactList(
      limit,
      page,
      queryParams,
      filter
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

const getContact = async (req, res) => {
  const { id } = req.query;

  try {
    const result = await contactService.getContact(id);
    return res.status(200).json({
      status: 200,
      data: result,
      message: 'Successfully got contact',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports = {
  addContact,
  getContactList,
  getContact,
};
