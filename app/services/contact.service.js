const { Contact } = require('../models');

const addContact = async (payload) => {
  try {
    const contact = new Contact(payload);

    await contact.save();

    return contact;
  } catch (error) {
    throw Error('Error while trying to add contact');
  }
};

module.exports = {
  addContact,
};
