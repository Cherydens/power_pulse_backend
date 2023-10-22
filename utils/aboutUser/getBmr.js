const { userParamsList } = require('../../variables');
const getAge = require('./getAge');

const getBmr = userParams => {
  if (!userParams) {
    return null;
  }
  const { currentWeight, height, birthday, sex, levelActivity } = userParams;

  const age = getAge(birthday);

  return Math.round(
    (userParamsList.weightIndex * currentWeight +
      userParamsList.heightIndex * height -
      userParamsList.ageIndex * age +
      userParamsList.sexIndex[sex]) *
      userParamsList.activityIndex[levelActivity]
  );
};

module.exports = getBmr;
