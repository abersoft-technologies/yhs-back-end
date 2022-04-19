const { Letter } = require('../models');

const getLetterList = async () => {
  try {
    const result = await Letter.find({});

    return result;
  } catch (error) {
    throw Error('Error while trying to fetch letters');
  }
};

const addLetter = async (payload) => {
  try {
    const letter = new Letter(payload);

    await letter.save();

    return letter;
  } catch (error) {
    throw Error('Error while trying to add letter');
  }
};
const getLetter = async (id) => {
  try {
    const letter = await Letter.findById(id);

    return letter;
  } catch (error) {
    throw Error('Error while trying to fetch letter');
  }
};

const updateLetter = async (id, data) => {
  try {
    const letter = await Letter.findByIdAndUpdate(id, data);

    return letter;
  } catch (error) {
    throw Error('Error while trying to update letter');
  }
};

module.exports = {
  getLetterList,
  getLetter,
  addLetter,
  updateLetter,
};
