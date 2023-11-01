const { format } = require('date-fns');
const User = require('../../models/user');
const { getBmr, controllerWrapper } = require('../../utils');

const updateUserParams = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  const userParams = { ...req.body };

  userParams.birthday = format(new Date(userParams.birthday), 'yyyy-MM-dd');

  await User.findByIdAndUpdate(_id, { userParams });

  res.status(200).json({
    user: {
      userParams,
    },
    bmr: getBmr(userParams),
  });
});

module.exports = updateUserParams;
