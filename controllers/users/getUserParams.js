const { controllerWrapper, getBmr } = require('../../utils');

const getUserParams = controllerWrapper(async (req, res) => {
  const { userParams } = req.user;

  res.status(200).json({
    user: {
      userParams,
    },
    bmr: getBmr(userParams),
  });
});

module.exports = getUserParams;
