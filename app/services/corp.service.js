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

module.exports = {
    addCorp,
};

