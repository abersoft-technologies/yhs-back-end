const { Letter, Education } = require('../models');

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

const getData = async (edus) => {
  try {
    let educations;
    if (edus) {
      educations = await Education.find({ edus });
    } else {
      educations = await Education.find({});
    }
    const letterList = await Letter.find({});

    let letters = [];
    let result = [];
    let obj = {
      education: {
        managementList: [],
        name: '',
        place: '',
        shortName: '',
        type: '',
      },
      letters: [],
    };
    educations.forEach((item) => {
      letters = letterList.filter((letter) => letter.edu[0] === item.name);
      let totalIntern = letters.reduce((acc, current) => {
        return acc + parseInt(current.internship);
      }, 0);

      let totalEmployLow = letters.reduce((acc, current) => {
        return acc + parseInt(current.employment);
      }, 0);

      let totalEmployHigh = letters.reduce((acc, current) => {
        if (current.employment === '1-2') {
          return acc + 2;
        } else if (current.employment === '3-5') {
          return acc + 5;
        } else if (current.employment === '11-20') {
          return acc + 20;
        } else {
          return acc + parseInt(current.employment);
        }
      }, 0);
      let lecture = letters.reduce((acc, current) => {
        let num = current.lecture ? 1 : 0;
        return acc + num;
      }, 0);
      let readEdu = letters.reduce((acc, current) => {
        let num = current.readEdu ? 1 : 0;
        return acc + num;
      }, 0);
      let contributeEdu = letters.reduce((acc, current) => {
        let num = current.contributeEdu ? 1 : 0;
        return acc + num;
      }, 0);
      let studyVisit = letters.reduce((acc, current) => {
        let num = current.studyVisit ? 1 : 0;
        return acc + num;
      }, 0);
      let eduBoard = letters.reduce((acc, current) => {
        let num = current.eduBoard ? 1 : 0;
        return acc + num;
      }, 0);

      const list = [];
      list.push({
        number: letters.length,
        isSmall: false,
        lastItem: false,
      });
      obj = {
        education: item,
        totalDataEdu: {
          totalLetters: letters.length,
          employment: {
            low: totalEmployLow,
            high: totalEmployHigh,
          },
          internship: totalIntern,
          readEdu,
          contributeEdu,
          lecture,
          studyVisit,
          eduBoard,
        },
        letters: letters,
      };
      result.push(obj);
    });

    return result;
  } catch (error) {
    throw Error('Error while trying to fetch edu letters data');
  }
};

module.exports = {
  getLetterList,
  getLetter,
  addLetter,
  updateLetter,
  getData,
};
