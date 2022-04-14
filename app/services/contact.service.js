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
const getContactList = async (limit = 3, page = 1, queryParam = '', filter) => {
  try {
    const skip = limit * (page - 1);
    let contactList, totalCount, filterOptions;

    /* find contact by searchQuery string */
    const findObject = {
      $or: [
        { firstName: { $regex: queryParam, $options: 'i' } },
        { lastName: { $regex: queryParam, $options: 'i' } },
        { email: { $regex: queryParam, $options: 'i' } },
        { phoneNumber: { $regex: queryParam, $options: 'i' } },
        { company: { $regex: queryParam, $options: 'i' } },
        { role: { $regex: queryParam, $options: 'i' } },
        { town: { $regex: queryParam, $options: 'i' } },
        { status: { $regex: queryParam, $options: 'i' } },
      ],
    };

    /* Check if filter is sent. If true use the and method to filter by filter settings */
    if (filter) {
      contactList = await Contact.find(queryParam ? findObject : {})
        .skip(skip)
        .limit(limit)
        .and(filter);
      totalCount = await Contact.find(queryParam ? findObject : {})
        .countDocuments()
        .and(filter);
    } else {
      contactList = await Contact.find(queryParam ? findObject : {})
        .skip(skip)
        .limit(limit);
      totalCount = await Contact.find(
        queryParam ? findObject : {}
      ).countDocuments();
    }

    const count = await Contact.countDocuments();
    const listData = {
      listValues: {
        page: page,
        totalPages: Math.ceil(totalCount / limit),
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

const getContact = async (id) => {
  try {
    const contact = await Contact.findById(id);

    const data = {
      contact,
    };
    return data;
  } catch (error) {
    throw Error('Error while trying to fetch corporate');
  }
};



module.exports = {
  addContact,
  getContactList,
  getContact
};
