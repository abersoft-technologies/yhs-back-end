const { Corporate } = require('../models');

const addCorp = async (payload) => {
    try {
      const corp = new Corporate(payload)
      await corp.save()
      return corp;
    } catch (error) {
        throw Error('Error while trying to add corporate');
    }
}

const getCorps = async (limit = 3, page = 1, queryParam) => {
    try {
      const skip = limit * (page - 1);
    const findObject = {$or:[
        {name: { $regex: queryParam, $options: 'i' }},
        {tags: { $regex: queryParam, $options: 'i' }},
        {info:{ $regex: queryParam, $options: 'i' }}
    ]}

      const corpList = await Corporate.find(queryParam ? findObject : {}).skip(skip).limit(limit);
      const totalCount = await Corporate.find(queryParam ? findObject : {}).countDocuments();
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

module.exports = {
    addCorp,
    getCorps
};

