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

const getContactList = async (limit = 3, page = 1, queryParam = '', filter, orgId) => {
  try {
    const skip = limit * (page - 1);
    let contactList, totalCount, filterOptions;

    /* find contact by searchQuery string */
    const findObject = {
      // $and: [{orgId: orgId}],
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

    console.log("orgId", orgId)

    /* Check if filter is sent. If true use the and method to filter by filter settings */

    if(filter === {}) {
      console.log("inget filter")
      contactList = await Contact.find(queryParam ? findObject : {})
        .skip(skip)
        .limit(limit)
        .and({orgId: orgId});
      totalCount = await Contact.find(
        queryParam ? findObject : {}
      ).countDocuments().and({orgId: orgId});
    } else {
      contactList = await Contact.find(queryParam ? findObject : {})
      .skip(skip)
      .limit(limit)
      .and({...filter, orgId: orgId});
    totalCount = await Contact.find(queryParam ? findObject : {})
      .countDocuments()
      .and({...filter, orgId: orgId});
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
    console.log(error)
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
    throw Error('Error while trying to fetch contact');
  }
};
const updateContact = async (id, data) => {
  try {
    const contact = await Contact.findByIdAndUpdate(id, data);

    return contact;
  } catch (error) {
    throw Error('Error while trying to update contact');
  }
};
const getNewContacts = async (orgId) => {
  try {
    const contacts = await Contact.find({status: "Ny kontakt"}).and({orgId: orgId});
    console.log(contacts)
    const count = await Contact.find({status: "Ny kontakt"}).countDocuments().and({orgId: orgId});

    const data = {
      data: contacts,
      count: count,
    }

    return data;
  } catch (error) {
    throw Error('Error while trying to update contact');
  }
};

module.exports = {
  addContact,
  getContactList,
  getContact,
  updateContact,
  getNewContacts
};
