const User = require('../../models/user');
const { getBmr } = require('../../utils');

const updateUserParams = async (req, res) => {
  const { email } = req.user;
  const userParams = req.body;

  const { name, avatarUrls, createdAt } = await User.findOneAndUpdate(
    { email },
    { userParams },
    { new: true }
  );

  res.status(200).json({
    user: {
      name,
      email,
      avatarUrls,
      userParams,
      createdAt,
    },
    bmr: getBmr(userParams),
  });
};

module.exports = updateUserParams;
