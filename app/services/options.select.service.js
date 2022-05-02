const { Education, Contact, Corporate } = require('../models');

const getEduOptions = async (orgId) => {
  try {
    const namesArray = await Education.find({}, 'name').and({orgId: orgId});

    const optionsArray = namesArray.map((item) => {
      return { value: item.name, label: item.name };
    });

    return optionsArray;
  } catch (error) {
    throw Error('Error while trying to fetch education names');
  }
};
const getTownOptions = async (orgId) => {
  try {
    const townsArray = await Contact.find({}, 'town').and({orgId: orgId});
    const optionsArray = townsArray
      .filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.town === value.town)
      )
      .map((item) => {
        if(!item.town) return;
        return { value: item.town, label: item.town };
      });
      const newArray = optionsArray.filter(x => x != null)
    return newArray;
  } catch (error) {
    throw Error('Error while trying to fetch education names');
  }
};

const getTagsOptions = async (orgId) => {
  try {
    const tagsArray = await Corporate.find({}, 'tags').and({orgId: orgId});
    let result = [];
    let unique;
    tagsArray.map((item) => {
      result = [...result, ...item.tags];
      unique = [...new Set(result)];
    });
    result = unique.map((item) => {
      return { value: item, label: item };
    });

    return result;
  } catch (error) {
    throw Error('Error while trying to fetch tags options');
  }
};

const getBranchEduOptions = async (orgId) => {
  try {

    const branchsArray = await Education.find({}, 'branch').and({orgId: orgId});
    const optionsArray = branchsArray.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.branch === value.branch)
    )
    .map((item) => {
      if(!item.branch) return;
      return { value: item.branch, label: item.branch };
    });
    const newArray = optionsArray.filter(x => x != null)
    return newArray;
  } catch (error) {

    console.error(error)
    throw Error('Error while trying to fetch branch options');
  }
};

const getBranchCorpOptions = async (orgId) => {
  try {
    const branchsArray = await Corporate.find({}, 'branch').and({orgId: orgId});

    const optionsArray = branchsArray.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.branch === value.branch)
    )
    .map((item) => {
      if(!item.branch) return;
      return { value: item.branch, label: item.branch };
    });
    const newArray = optionsArray.filter(x => x != null)
    return newArray;
  } catch (error) {
    console.error(error)
    throw Error('Error while trying to fetch branch options');
  }
};


module.exports = { getEduOptions, getTownOptions, getTagsOptions, getBranchEduOptions, getBranchCorpOptions };
