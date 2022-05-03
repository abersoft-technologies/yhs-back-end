const { Organization } = require("../models")

const addOrg = async (payload, name) => {
    try {
        const org = new Organization(payload);
        await org.save();
        return org;
    } catch (error) {
        console.error(error)
      throw Error('Error while trying to add organization');
    }
  };

  module.exports = {
    addOrg
  }