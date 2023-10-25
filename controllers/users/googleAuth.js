const jwt = require('jsonwebtoken');

const { controllerWrapper } = require('../../utils');
const User = require('../../models/user');

const { FRONTEND_URL, SECRET_KEY } = process.env;

const googleAuth = controllerWrapper(async (req, res) => {
  const { user } = req;
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user._id, { token });

  res.redirect(`${FRONTEND_URL}/welcome?token=${token}`);
});

module.exports = googleAuth;
