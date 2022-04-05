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
const getContactList = async (limit = 3, page = 1, queryParam) => {
  try {
    const skip = limit * (page - 1);
    const findObject = {
      firstName: { $regex: queryParam, $options: 'i' },
      lastName: { $regex: queryParam, $options: 'i' },
      email: { $regex: queryParam, $options: 'i' },
      phoneNumber: { $regex: queryParam, $options: 'i' },
      company: { $regex: queryParam, $options: 'i' },
      role: { $regex: queryParam, $options: 'i' },
      town: { $regex: queryParam, $options: 'i' },
      status: { $regex: queryParam, $options: 'i' },
    };

    const contactList = await Contact.find(queryParam ? findObject : {})
      .skip(skip)
      .limit(limit);
    const totalCount = await Contact.find(
      queryParam ? findObject : {}
    ).countDocuments();
    const count = await Contact.countDocuments();

    const listData = {
      listValues: {
        page: page,
        totalPages: Math.floor(totalCount / limit),
        totalItemsFound: totalCount,
        totalItems: count,
        pageSize: limit,
      },
      contactList,
    };
    return listData;
  } catch (error) {
    throw Error('Error while trying to fetch contacts');
  }
};

module.exports = {
  addContact,
  getContactList,
};
