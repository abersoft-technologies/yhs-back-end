const { Education } = require('../models');

const addEdu = async (payload) => {
  try {
    const edu = new Education(payload);
    await edu.save();
    return edu;
  } catch (error) {
    throw Error('Error while trying to add education');
  }
};

const getEdus = async (limit = 3, page = 1, queryParam, filter, orgId) => {
  try {
    let eduList, totalCount, filterOptions;

    const skip = limit * (page - 1);
    const findObject = {
      $or: [
        { name: { $regex: queryParam, $options: 'i' } },
        { place: { $regex: queryParam, $options: 'i' } },
        { branch: { $regex: queryParam, $options: 'i' } },
      ],
    };


     if(filter === {}) {
      eduList = await Education.find(queryParam ? findObject : {})
        .skip(skip)
        .limit(limit)
        .and({orgId: orgId});
      totalCount = await Education.find(
        queryParam ? findObject : {}
      ).countDocuments()
      .and({orgId: orgId});
    } else {
      eduList = await Education.find(queryParam ? findObject : {})
      .skip(skip)
      .limit(limit)
      .and({...filter, orgId: orgId});
    totalCount = await Education.find(queryParam ? findObject : {})
      .countDocuments()
      .and({...filter, orgId: orgId});
    }
    const count = await Education.countDocuments();

    const listData = {
      listValues: {
        page: page,
        totalPages: Math.ceil(totalCount / limit),
        totalItemsFound: totalCount,
        totalItems: count,
        pageSize: limit,
      },
      eduList,
    };
    return listData;
  } catch (error) {
    throw Error('Error while trying to fetch educations');
  }
};

const getOneEdu = async (id) => {
  try {
    const edu = await Education.findById(id);

    const data = {
      edu,
    };
    return data;
  } catch (error) {
    throw Error('Error while trying to fetch corporate');
  }
};

const updateEdu = async (id, data) => {
  try {
    const education = await Education.findByIdAndUpdate(id, data);

    return education;
  } catch (error) {
    throw Error('Error while trying to update education');
  }
};

module.exports = {
  addEdu,
  getEdus,
  getOneEdu,
  updateEdu,
};
