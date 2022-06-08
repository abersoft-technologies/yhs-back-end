const { User } = require("../models");
const bcrypt = require('bcryptjs');

const update = async (id, data) => {
    try {
        const salt = await bcrypt.genSalt(10);

        const newUser = await User.findByIdAndUpdate(id, data);

        if(data.password) {
            newUser.password = await bcrypt.hash(data.password, salt);
            newUser.save()
        }
        return newUser;
    } catch (error) {
      throw Error('Error while trying to update user');
    }
  };

  module.exports = {
    update
  }