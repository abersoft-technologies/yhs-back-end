const { Education, Contact, Corporate } = require('../models');

const getEduOptions = async () => {
  try {
    const namesArray = await Education.find({}, 'name');

    const optionsArray = namesArray.map((item) => {
      return { value: item.name, label: item.name };
    });

    return optionsArray;
  } catch (error) {
    throw Error('Error while trying to fetch education names');
  }
};
const getTownOptions = async () => {
  try {
    const townsArray = await Contact.find({}, 'town');

    const optionsArray = townsArray
      .filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.town === value.town)
      )
      .map((item) => {
        return { value: item.town, label: item.town };
      });

    return optionsArray;
  } catch (error) {
    throw Error('Error while trying to fetch education names');
  }
};

const getTagsOptions = async () => {
  try {
    const tagsArray = await Corporate.find({}, 'tags');
    let newArr = [];
    let unique;
    tagsArray.map((item) => {
      newArr = [...newArr, ...item.tags];
      unique = [...new Set(newArr)];
    });

    return unique;
  } catch (error) {
    throw Error('Error while trying to fetch education names');
  }
};

module.exports = { getEduOptions, getTownOptions, getTagsOptions };
