const { Education } = require('../models');


const addEdu = async (payload) => {
    try {
        const edu = new Education(payload)
        await edu.save()
        return edu;
      } catch (error) {
          throw Error('Error while trying to add education');
      }
}

module.exports = {
    addEdu
}