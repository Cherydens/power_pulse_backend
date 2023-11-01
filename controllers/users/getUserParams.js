const { format } = require('date-fns');
const { controllerWrapper, getBmr } = require('../../utils');

const getUserParams = controllerWrapper(async (req, res) => {
  const { userParams } = req.user;
  let updatedUserParams = null;

  if (userParams) {
    const {
      height,
      currentWeight,
      desiredWeight,
      birthday,
      blood,
      sex,
      levelActivity,
    } = userParams;

    updatedUserParams = {
      height,
      currentWeight,
      desiredWeight,
      birthday: format(new Date(birthday), 'yyyy-MM-dd'),
      blood,
      sex,
      levelActivity,
    };
  }

  res.status(200).json({
    user: {
      userParams: updatedUserParams,
    },
    bmr: getBmr(userParams),
  });
});

module.exports = getUserParams;
