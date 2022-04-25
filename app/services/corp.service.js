const { Corporate } = require('../models');
const { Contact } = require('../models');

const addCorp = async (payload) => {
  try {
    const corp = new Corporate(payload);
    await corp.save();
    return corp;
  } catch (error) {
    throw Error('Error while trying to add corporate');
  }
};

const getCorps = async (limit = 3, page = 1, queryParam, filter) => {
  try {
    let corpList, totalCount, filterOptions;

    const skip = limit * (page - 1);
    const findObject = {
      $or: [
        { name: { $regex: queryParam, $options: 'i' } },
        { tags: { $regex: queryParam, $options: 'i' } },
        { info: { $regex: queryParam, $options: 'i' } },
      ],
    };

    /* Check if filter is sent. If true use the and method to filter by filter settings */
    if (filter) {
      corpList = await Corporate.find(queryParam ? findObject : {})
        .skip(skip)
        .limit(limit)
        .and(filter);
      totalCount = await Corporate.find(queryParam ? findObject : {})
        .countDocuments()
        .and(filter);
    } else {
      corpList = await Corporate.find(queryParam ? findObject : {})
        .skip(skip)
        .limit(limit);
      totalCount = await Corporate.find(
        queryParam ? findObject : {}
      ).countDocuments();
    }
    const count = await Corporate.countDocuments();
    const listData = {
      listValues: {
        page: page,
        totalPages: Math.ceil(totalCount / limit),
        totalItemsFound: totalCount,
        totalItems: count,
        pageSize: limit,
      },
      corpList,
    };
    return listData;
  } catch (error) {
    throw Error('Error while trying to fetch corporates');
  }
};

const getOneCorp = async (id) => {
  try {
    const corp = await Corporate.findById(id);

    const data = {
      corp,
    };
    return data;
  } catch (error) {
    throw Error('Error while trying to fetch corporate');
  }
};

const getContactsInCorp = async (corporate) => {
  try {
    const findObject = { company: { $regex: `${corporate}`, $options: 'i' } };

    const contacts = await Contact.find(findObject);
    const data = {
      contacts,
    };
    return data;
  } catch (err) {
    throw Error('Error while trying to fetch contacts');
  }
};

const updateCorp = async (id, data) => {
  try {
    const corp = await Corporate.findOneAndUpdate(id, data);

    return corp;
  } catch (error) {
    throw Error('Error while trying to update corporation');
  }
};

module.exports = {
  addCorp,
  getCorps,
  getOneCorp,
  getContactsInCorp,
  updateCorp,
};
